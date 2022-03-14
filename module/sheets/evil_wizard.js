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
    data.monsters = hq.monsters;
    data.treasures = game.hq.treasure_deck.length - 9;
    data.treasure_max = game.hq.treasure_deck.length;
    return data;
  }

  activateListeners(html) {
    //Game
    html.find(".new-game").click(this._on_new_game.bind(this));
    html.find(".reset-treasure").click(this._on_reset_treasure.bind(this));
    html.find(".next-turn").click(this._on_next_turn.bind(this));
    html.find(".next-round").click(this._on_next_round.bind(this));
    //Heros
    html.find(".target-player").click(this._on_target_player.bind(this));
    html.find(".effect-toggle").click(this._on_effect_toggle.bind(this));
    //Monsters
    html.find(".attack-roll").click(this._on_roll_attack.bind(this));
    
    //html.find(".class-select").change(this._on_class_select.bind(this));
    return super.activateListeners(html);
  }

  _on_new_game(ev) {
    console.log('EVIL_WIZARD: _on_new_game: Launching new dungeon.');
    game.hq.treasure_deck = hq.deck.shuffle(hq.deck.new('treasure'));
    hq.journal.save('treasure_deck', game.hq.treasure_deck);
    hq.socket.emit('new_game', {});
    this.render(true);
  }

  _on_reset_treasure(ev) {
    game.hq.treasure_deck = hq.deck.shuffle(hq.deck.new('treasure'));
    hq.journal.save('treasure_deck', game.hq.treasure_deck);
  }

  _on_next_turn(ev) {
    let heros = hq.gm.get_online_actors().sort((a, b) => {return hq.sort.compare(a, b, 'initiative')});
    for (let i = 0; i < heros.length; i++) {
      const hero = heros[i];
      console.log(hero);
      if (hero.data.data.attack_taken == false && hero.data.data.move_rolled == false) {
        hq.socket.emit('next_turn', {name: hero.name});
        return;
      }
    }
    hq.dialog.prompt('Monster Turn', 'It is time for the monsters to act.');
  }

  _on_next_round(ev) {
    hq.socket.emit('next_round');
  }

  _on_target_player(ev) {
    ev.preventDefault();
    let el = ev.currentTarget;
    let tk = hq.get_token(el.dataset.name);
    tk.setTarget({releaseOthers: true});
  }

  _on_effect_toggle(ev) {
    ev.preventDefault();
    let el = ev.currentTarget;
    console.log(el.dataset.name, el.dataset.effect);
    let act = hq.get_actor(el.dataset.name);
    if (el.dataset.effect == 'stone') {
      act.update({
        'data.spell_bonus_def': act.data.data.spell_bonus_def == 0 ? 2 : 0
      });
    }else{
      act.update({
        'data.spell_bonus_atk': act.data.data.spell_bonus_atk == 0 ? 2 : 0
      });
    }
    this.update();
  }

  _on_roll_attack(ev) {
    ev.preventDefault();
    let el = ev.currentTarget;
    let tgt = hq.hero.get_target()
    if (tgt == false) {
      hq.chat.send('No Target', 'You must select a target to attack');
      return;
    }
    let mob = hq.monsters[el.dataset.index]
    let attack_dice = mob.atk;
    let result = game.specialDiceRoller.heroQuest.rollFormula(`${attack_dice}h`, `${mob.name} attacks!`);
    let hits = result.match(/heroskull\.png/g) || [];
    result = `${result.split('<hr>')[0]}`;
    if(hits.length > 0) {
      result += `
        <p>${mob.name} lands ${hq.pluralize(hits.length, 'hit', 'hits')}</p>
      `;
      hq.socket.emit('attack_roll', {
        attacker: mob.name,
        hits:     hits.length,
        target:   tgt.name,
      });
    }else{
      result += `
        <p>${this.actor.name} missed.</p>
      `;
    }
    ChatMessage.create({content: result});
  }

}