import item_sheet from "./sheets/item.js";
import actor_sheet from "./module/sheets/actor.js"

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

    preload_handlebars_templates();
});