let commands = {
    test: function(data){
        console.log('Packet received', data)
    },
    refresh: function(data) {
        game.user.character.sheet.render(false);
    },
    prompt: function(data) {
        let act = hq.get_actor(data.name)
        if (act.isOwner) {
            hq.dialog.prompt(data.title, data.body);
        }
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
            'data.body.value': game.user.character.data.data.body.max,
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
    next_turn: function(data) {
        let act = hq.get_actor(data.name);
        if (game.user.isGM) return;
        if (act.isOwner) {
            hq.dialog.prompt('Your Turn', 'It is time for you to act.', 'Be wary, brave adventurer for many perils await you in the dungeon.');
            act.update({
                'data.move_rolled': false,
                'data.attack_taken': false,
                'data.search_taken': false,
                'data.my_turn': true,
            });
        }
    },
    next_round: function(data) {
        if (game.user.isGM) return;
        game.user.character.update('')
    },
    draw_treasure: function(data) {
        if (game.user.isGM) {
            let draw = game.hq.treasure_deck.pop();
            if (draw.type == 'monster' || draw.type == 'nothing') {
                hq.chat.send(draw.name, draw.description);
                game.hq.treasure_deck.push(draw);
            }
            let act = hq.get_actor(data.name);
            if (draw.type == 'trap') {
                hq.chat.send(draw.name, draw.description);
                game.hq.treasure_deck.push(draw);
                act.update({
                    'data.body.value': act.data.data.body.value - 1,
                    'data.spell_bonus_def': 0,
                });
            }
            if (draw.type == 'potion') {
                hq.socket.emit('prompt', {title: draw.name, body: draw.description, name: data.name});
                act.update({data: {potions: {[draw.key]: {amount: act.data.data.potions[draw.key].amount + 1}}}});
            }
            if (draw.type == 'gold') {
                hq.socket.emit('prompt', {title: draw.name, body: draw.description});
                let r = new Roll(draw.value).evaluate({async: false});
                act.update({
                    'data.gold': act.data.data.gold + r._total,
                });
            }
            game.hq.treasure_deck = hq.deck.shuffle(game.hq.treasure_deck);
            hq.journal.save('treasure_deck', game.hq.treasure_deck);
        }
    },
}

Hooks.on("ready", () => {
    console.log("HQ | Initializing socket listeners...")
    game.socket.on('system.hq', (data) => {
        console.log('RECEIVE:', data);
        if (data.operation in commands) {
            commands[data.operation](data.data);
            hq.gm.update_sheet();
            return true;
        }
    });
});