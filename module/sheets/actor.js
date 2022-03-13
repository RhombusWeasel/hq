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
    
    html.find(".turn-roll").click(this._on_roll_turn.bind(this));
    html.find(".move-roll").click(this._on_roll_move.bind(this));
    html.find(".attack-roll").click(this._on_roll_attack.bind(this));
    html.find(".search-traps").click(this._on_search_traps.bind(this));
    html.find(".search-treasure").click(this._on_search_treasure.bind(this));

    html.find(".class-select").change(this._on_class_select.bind(this));
    return super.activateListeners(html);
  }

  _on_roll_turn(ev) {
    let r = new Roll('2d6').evaluate({async: false});
    this.actor.update({
      'data.initiative': r._total
    });
    r.toMessage({
      flavor: `Initiative`
    });
    hq.socket.emit('refresh', {});
  }

  _on_roll_move(ev) {
    let move_dice = this.actor.data.data.move + this.actor.data.data.tmp_move;
    let r = new Roll(`${move_dice}d6`).evaluate({async: false});
    this.actor.update({
      'data.tmp_move': 0,
      'data.move_rolled': true,
      'data.cur_move': r._total,
      'data.stats.squares_moved': this.actor.data.data.stats.squares_moved + r._total,
    });
    r.toMessage({
      flavor: `Movement`
    });
    hq.socket.emit('refresh', {});
  }

  _on_roll_attack(ev) {
    let attack_dice = this.actor.data.data.atk + this.actor.data.data.tmp_atk + this.actor.data.data.spell_bonus_atk
    hq.hero.roll_atk(this.actor, attack_dice);
  }

  _on_search_traps(ev) {
    hq.chat.send(
      `Something's off here`,
      `${this.actor.name} searches for traps.`,
      `The Evil Wizard player should feel compelled to reveal any traps in the hero's current room OR their current stretch of corridor.`
    );
    this.actor.update({
      'data.attack_taken': true,
      'data.atk_count': this.actor.data.data.atk_count - 1,
      'data.stats.search_traps': this.actor.data.data.stats.search_traps + 1,
    });
  }

  _on_search_treasure(ev) {
    this.actor.update({
      'data.attack_taken': true,
      'data.atk_count': this.actor.data.data.atk_count - 1,
      'data.stats.search_treasure': this.actor.data.data.stats.search_treasure + 1,
    });
    hq.chat.send(`Let looting commence!`, `${this.actor.name} searches for treasure.`);
    hq.socket.emit('draw_treasure', {name: this.actor.name});
  }

  _on_potion_use(ev) {
    ev.preventDefault();
    let el = ev.currentTarget;
    let po = el.dataset.key;
    if (this.actor.data.data.potions[po].amount > 0) {
      hq.chat.send('Potion', `${this.actor.name} uses a ${this.actor.data.data.potions[po].name}!`)
      this.actor.update({
        data: {
          potions: {
            [po]: {
              amount: this.actor.data.data.potions[po].amount - 1
            }
          },
          stats: {
            potions: {
              [po]: this.actor.data.data.stats.potions?.[po] ? this.actor.data.data.stats.potions[po] + 1 : 1,
            },
          }
        }
      });
      hq.potions[po](this.actor);
    }else{
      hq.dialog.prompt(`I can't let you do that Dave.`, `You have no ${this.actor.data.data.potions[po].name}`);
    }
    hq.socket.emit('refresh', {});
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
    hq.spells[sp](this.actor);
    //hq.chat.send(`${spell_data.element} Spell`, `${this.actor.name} casts ${spell_data.name}!`, spell_data.description);
    this.actor.update({
      data: {
        spells: {[sp]: {cast: true}},
        atk_count: this.actor.data.data.atk_count - 1,
        attack_taken: true,
        stats: {
          spells: {
            [sp]: this.actor.data.data.stats.spells?.[sp] ? this.actor.data.data.stats.spells[sp] + 1 : 1,
          }
        }
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