let commands = {
    test: function(data){
        console.log('Packet received', data)
    },
    refresh: function(data) {
        game.user.character.sheet.render(false);
    },
    new_game: function(data) {
        console.log('SOCKET: new_game: Starting new game.');
        game.user.character.update({
            'data.initiative': 0,
            'data.in_dungeon': true,
            'data.my_turn': false,
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
    },
}

Hooks.on("ready", () => {
    console.log("HQ | Initializing socket listeners...")
    game.socket.on('system.hq', (data) => {
        console.log('RECEIVE:', data);
        if (data.operation in commands) {
            commands[data.operation](data.data);
            hq.gm.update_sheet();
            return false;
        }
    });
});