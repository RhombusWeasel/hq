import item_sheet from "./sheets/item.js";
import actor_sheet from "./sheets/actor.js"

async function preload_handlebars_templates() {
    const template_paths = []
    return loadTemplates(template_paths)
}

Hooks.once("init", function () {
    console.log("DC | Initializing Hero Quest.");

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("hq", item_sheet, { makeDefault: true});

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("hq", actor_sheet, { makeDefault: true});

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