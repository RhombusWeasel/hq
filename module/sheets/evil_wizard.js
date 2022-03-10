export default class hqGMSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
    template: `systems/hq/templates/actor/actor-evil-wizard-sheet.html`,
    width: 500,
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
    data.heros = hq.classes;
    return data;
  }

  activateListeners(html) {
    html.find(".new-dungeon").click(this._on_new_game.bind(this));
    
    html.find(".class-select").change(this._on_class_select.bind(this));
  }

  _on_new_game(ev) {
    let heros = hq.gm.get_online_actors();
    for (let i = 0; i < heros.length; i++) {
      const hero = heros[i];
      hero.update({
        'data.initiative': 0,
        'data.atk_count': 1,
        'data.move_rolled': false,
        'data.attack_taken': false,
        'data.search_taken': false,
        'data.stone_skin': 0,
        'data.courage': 0,
        'data.tmp_move': 0,
        'data.tmp_atk': 0,
        'data.tmp_def': 0,
        'data.tmp_mind': 0,
        'spell_bonus_atk': 0,
        'spell_bonus_def': 0,
        'data.body.value': hero.data.data.body.max,
        'data.air': false,
        'data.earth': false,
        'data.fire': false,
        'data.water': false,
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
  }

}