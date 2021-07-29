export class hqActorSheet extends ActorSheet {

    /** @override */
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
        classes: ["hq"],
        template: `systems/hq/templates/actor/actor-${this.actor.data.type}-sheet.html`,
        width: 600,
        height: 600,
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
    data.stats = this.actor.data.data
    return data;
    }
}  