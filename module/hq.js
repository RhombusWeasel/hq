import item_sheet from "./sheets/item.js";
import actor_sheet from "./sheets/actor.js"
import evil_sheet from "./sheets/evil_wizard.js"

async function preload_handlebars_templates() {
    const template_paths = []
    return loadTemplates(template_paths)
}

Hooks.once("init", function () {
    console.log("DC | Initializing Hero Quest.");

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("hq", item_sheet, {makeDefault: true});

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("hq", actor_sheet, {makeDefault: true});
    Actors.registerSheet("hq", evil_sheet, {makeDefault: true});

    Handlebars.registerHelper('isGM', function (options) {
        if (game.user.isGM) {
            return options.fn(this);
        }
        return options.inverse(this);
    });

    Handlebars.registerHelper("sum", function(lvalue, operator, rvalue, options) {
        if (typeof(lvalue) == 'string') {
            lvalue = parseInt(lvalue.slice(1, lvalue.length));
        }else {
            lvalue = parseInt(lvalue);
        }
        rvalue = parseInt(rvalue);
        return {
            "+": `${(lvalue + rvalue)}`,
            "-": `${(lvalue - rvalue)}`,
            "*": `${(lvalue * rvalue)}`,
            "/": `${(lvalue / rvalue)}`,
            "%": `${(lvalue % rvalue)}`,
        }[operator];
    });

    Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
        console.log(v1, operator, v2, options);
        switch (operator) {
            case '==':
                return (v1 == v2) ? options.fn(this) : options.inverse(this);
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
            case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
            case '!=':
                return (v1 != v2) ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
        }
    });

    Handlebars.registerHelper('has_spells', function (element, options) {
        let act = hq.get_actor(options.data.root.actor.name);
        if (act.data.data[element]) {
            return options.fn(this);
        }
        return options.inverse(this);
    });

    Handlebars.registerHelper('in_room', function (options) {
        if (hq.hero.in_room(options.data.root.actor.name)) {
            return options.fn(this);
        }
        return options.inverse(this);
    });

    preload_handlebars_templates();
});

Hooks.on("ready", () => {
    console.log("HQ | Initializing socket listeners...")
    game.socket.on(`system.hq`, (data) => {
        console.log('RECEIVE:', data.operation, data.data);
        if (data.operation in hq.socket.commands) {
            hq.socket.commands[data.operation](data.data);
            hq.gm.update_sheet();
            return false;
        }
    });
});