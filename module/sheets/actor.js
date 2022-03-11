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
  data.heros = hq.classes;
  return data;
  }

  activateListeners(html) {
    html.find(".set-class").click(this._on_set_class.bind(this));
    html.find(".spell-toggle").click(this._on_spell_toggle.bind(this));
    html.find(".cast-spell").click(this._on_spell_cast.bind(this));
    html.find(".use-potion").click(this._on_potion_use.bind(this));
    html.find(".reset-spells").click(this._on_reset_spells.bind(this));
    
    html.find(".turn-roll").click(this._on_roll_turn.bind(this));
    html.find(".move-roll").click(this._on_roll_move.bind(this));
    html.find(".attack-roll").click(this._on_roll_attack.bind(this));
    html.find(".search-traps").click(this._on_search_traps.bind(this));
    html.find(".search-treasure").click(this._on_search_treasure.bind(this));

    html.find(".class-select").change(this._on_class_select.bind(this));
  }

  _on_roll_turn(ev) {
    let r = new Roll('2d6');
    this.actor.update({
      'data.initiative': r.result
    });
  }

  _on_roll_move(ev) {
    let move_dice = this.actor.data.data.move + this.actor.data.data.tmp_move;
    hq.chat.send(`Move Roll`, `${this.actor.name} rolls [[${move_dice}d6]]`);
    this.actor.update({
      'data.tmp_move': 0,
      'data.move_rolled': true,
    });
  }

  _on_roll_attack(ev) {
    let attack_dice = this.actor.data.data.atk + this.actor.data.data.tmp_atk + this.actor.data.data.spell_bonus_atk
    let result = game.specialDiceRoller.heroQuest.rollFormula(`${attack_dice}h`, `${this.actor.name} attacks!`);
    let hits = result.match(/skull/g) || [];
    result = `${result.split('<hr>')[0]}`;
    if(hits.length > 0) {
      result += `
        <p>${this.actor.name} lands ${hq.pluralize(hits.length, 'hit', 'hits')}</p>
      `;
    }else{
      result += `
        <p>${this.actor.name} missed.</p>
      `;
    }
    this.actor.update({
      'data.tmp_atk': 0,
      'data.atk_count': this.actor.data.data.atk_count - 1,
      'data.attack_taken': true,
    });
    ChatMessage.create({content: result});
  }

  _on_search_traps(ev) {}

  _on_search_treasure(ev) {}

  _on_potion_use(ev) {
    ev.preventDefault();
    let el = ev.currentTarget;
    let po = el.dataset.key;
    if (this.actor.data.data.potions[po].amount > 0) {
      hq.chat.send('Potion', `${this.actor.name} uses a ${this.actor.data.data.potions[po].name}!`)
      this.actor.update({data: {potions: {[po]: {amount: this.actor.data.data.potions[po].amount - 1}}}});
      hq.potions[po](this.actor);
    }else{
      hq.dialog.prompt(`I can't let you do that Dave.`, `You have no ${this.actor.data.data.potions[po].name}`);
    }
  }

  _on_reset_spells(ev) {
    this.actor.update({
      'data.spells.genie.cast': false,
      'data.spells.swift_wind.cast': false,
      'data.spells.tempest.cast': false,
      'data.spells.heal_body.cast': false,
      'data.spells.pass_through_rock.cast': false,
      'data.spells.rock_skin.cast': false,
      'data.spells.ball_of_flame.cast': false,
      'data.spells.courage.cast': false,
      'data.spells.fire_of_wrath.cast': false,
      'data.spells.sleep.cast': false,
      'data.spells.veil_of_mist.cast': false,
      'data.spells.water_of_healing.cast': false,
    });
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
    this.actor.update({
      data: {
        spells: {[sp]: {cast: true}},
        atk_count: this.actor.data.data.atk_count - 1,
      }
    });
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