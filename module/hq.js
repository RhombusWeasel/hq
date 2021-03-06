import item_sheet from "./sheets/item.js";
import actor_sheet from "./sheets/actor.js"
import mob_sheet from "./sheets/monster.js"
import evil_sheet from "./sheets/evil_wizard.js"

async function preload_handlebars_templates() {
    const template_paths = [];
    return loadTemplates(template_paths);
}

Hooks.once("init", function () {
    console.log("DC | Initializing Hero Quest.");

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("hq", item_sheet, {makeDefault: true});

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("hq", actor_sheet, {makeDefault: true});
    Actors.registerSheet("hq", mob_sheet, {makeDefault: false});
    Actors.registerSheet("hq", evil_sheet, {makeDefault: false});

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

    Handlebars.registerHelper('has_potions', function (options) {
        let act = hq.get_actor(options.data.root.actor.name);
        for (const key in act.data.data.potions) {
            if (Object.hasOwnProperty.call(act.data.data.potions, key)) {
                const potion = act.data.data.potions[key];
                if(potion.amount > 0) {
                    return options.fn(this);
                }
            }
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
    if (game.user.isGM) {
        // Initialize action deck
        game.hq = {
            current_initiative: 12,
        };
        let journal = game.journal.getName('treasure_deck');
        if (journal) {
            game.hq.treasure_deck = hq.journal.load('treasure_deck');
        }else{
            game.hq.treasure_deck = hq.journal.load('treasure_deck', hq.deck.shuffle(hq.deck.new('treasure')));
        }
    };
});

function get_token_count(t) {
    let count = 0;
    let tokens = canvas.tokens.placeables;
    if (tokens) {
        tokens.forEach(tkn => {
            console.log(tkn.name, t.name);
            if (tkn.name.search(t.name) != -1) {
                console.log('Match!', tkn.name.search(t.name));
                count += 1;
            }
        });
    }
    return count;
}

Hooks.on('preCreateToken', function (document, createData, options, userId) {
    let act = hq.get_actor(document.name);
    if (!(act.hasPlayerOwner)) {
        let same = canvas.tokens.placeables.find(i => i.data.actorId == arguments[1].actorId);
        let amt = get_token_count(act);
        document.data.update({name: createData.name += ` ${amt + 1}`});
    }
});

Hooks.on("updateToken", (token, updata, opts, id) => {
    game.user.character.sheet.render(false);
});