export default class hqGMSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
    template: `systems/hq/templates/actor/actor-evil-wizard-sheet.html`,
    width: 400,
    height: 800,
    classes: ["hq"],
    tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "features" }]
    });
  }

  /** @override */
  get template() {
    return `systems/hq/templates/actor/actor-evil-wizard-sheet.html`;
  }

  /** @override */
  getData() {
    const data = super.getData();
    data.heros = hq.gm.get_online_actors().sort((a, b) => {return hq.sort.compare(a, b, 'initiative')});
    return data;
  }

  activateListeners(html) {
    html.find(".new-game").click(this._on_new_game.bind(this));
    
    //html.find(".class-select").change(this._on_class_select.bind(this));
    return super.activateListeners(html);
  }

  _on_new_game(ev) {
    console.log('EVIL_WIZARD: _on_new_game: Launching new dungeon.');
    game.hq.treasure_deck = hq.deck.shuffle(hq.deck.new('treasure'));
    hq.journal.save('treasure_deck', game.hq.treasure_deck);
    hq.socket.emit('new_game', {});
  }

}