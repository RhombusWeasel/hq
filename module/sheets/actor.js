export default class hqActorSheet extends ActorSheet {

    /** @override */
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
        classes: ["hq"],
        tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "features" }]
      });
    }
  
    /** @override */
    get template() {
      return `systems/hq/templates/actor/actor-${this.actor.data.type}-sheet.html`;
    }
  
    /** @override */
    getData() {
    const data = super.getData();
    data.heros = hq.classes;
    return data;
    }

    activateListeners(html) {
      html.find(".set-class").click(this._on_set_class.bind(this));
      html.find(".spell-toggle").click(this._on_spell_toggle.bind(this));
      html.find(".cast-spell").click(this._on_spell_cast.bind(this));

      html.find(".class-select").change(this._on_class_select.bind(this));
    }

    _on_spell_toggle(ev) {
      ev.preventDefault();
      let el = ev.currentTarget;
      let focus = el.closest(".spell-data").dataset.element;
      this.actor.update({data: {[focus]: !this.actor.data.data[focus]}});
    }

    _on_spell_cast(ev) {
      ev.preventDefault();
      let el = ev.currentTarget;
      let sp = el.dataset.spell;
      let spell_data = this.actor.data.data.spells[sp]
      hq.chat.send(`${spell_data.element} Spell`, `${this.actor.name} casts ${spell_data.name}!`, spell_data.description);
      this.actor.update({data: {spells: {[sp]: {cast: true}}}});
    }

    _on_class_select(ev) {
      ev.preventDefault();
      let el = ev.currentTarget;
      let v = parseInt(el.value);
      hq.set_class(this.actor, 'classes', v);
    }

    _on_set_class(ev) {
      ev.preventDefault();
      if (this.actor.data.data.class) {
        this.actor.update({
          "data.choose_class": false
        });
      }
    }
}  