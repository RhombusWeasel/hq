export default class hqActorSheet extends ActorSheet {

    /** @override */
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
        classes: ["hq"],
        width: 400,
        height: 800,
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
    data.heros = hq.monsters;
    return data;
    }
  
    activateListeners(html) {
        //Buttons (On Click)
        html.find(".set-class").click(this._on_set_class.bind(this));
        
        //Selectors (On Change)
        html.find(".class-select").change(this._on_class_select.bind(this));
        return super.activateListeners(html);
    }

    _on_class_select(ev) {
        ev.preventDefault();
        let el = ev.currentTarget;
        let v = parseInt(el.value);
        hq.set_class(this.actor, 'monsters', v);
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