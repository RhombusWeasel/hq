let hq = {
    classes: [
        {
            name: 'Barbarian',
            move: 2,
            atk: 3,
            def: 2,
            body: 8,
            mind: 2,
            spells: 0
        },
        {
            name: 'Dwarf',
            move: 2,
            atk: 2,
            def: 2,
            body: 7,
            mind: 3,
            spells: 0
        },
        {
            name: 'Elf',
            move: 2,
            atk: 2,
            def: 2,
            body: 6,
            mind: 4,
            spells: 1
        },
        {
            name: 'Wizard',
            move: 2,
            atk: 2,
            def: 2,
            body: 4,
            mind: 6,
            spells: 3
        },
    ],
    monsters: [
        {
            name: 'Gargoyle',
            type: 'gargoyle',
            move: 6,
            atk: 4,
            def: 4,
            body: 3,
            mind: 4
        },
        {
            name: 'Chaos Warrior',
            type: 'chaos',
            move: 6,
            atk: 3,
            def: 4,
            body: 2,
            mind: 3
        },
        {
            name: 'Fimir',
            type: 'lizardman',
            move: 6,
            atk: 3,
            def: 3,
            body: 2,
            mind: 3
        },
        {
            name: 'Orc',
            type: 'orc',
            move: 8,
            atk: 3,
            def: 2,
            body: 1,
            mind: 2
        },
        {
            name: 'Goblin',
            type: 'orc',
            move: 10,
            atk: 2,
            def: 1,
            body: 1,
            mind: 1
        },
        {
            name: 'Mummy',
            type: 'undead',
            move: 4,
            atk: 3,
            def: 4,
            body: 1,
            mind: 0
        },
        {
            name: 'Skeleton',
            type: 'undead',
            move: 6,
            atk: 2,
            def: 2,
            body: 1,
            mind: 0
        },
        {
            name: 'Zombie',
            type: 'undead',
            move: 4,
            atk: 2,
            def: 3,
            body: 1,
            mind: 0
        },
    ],
    equipment: [
        {
            name: 'Battle Axe',
            desc: 'The Battle Axe allows you to roll four combat dice in attack.  You may not use a shield when using the Battle Axe.',
            cost: 400,
            type: 'weapon',
            stat: 'atk',
            buff: 4,
            wizard: false,
        },
        {
            name: 'Bracers',
            desc: 'The Bracers allow you to roll one extra combat die in defence.',
            cost: 200,
            type: 'shield',
            stat: 'def',
            buff: 1,
            wizard: true,
        },
        {
            name: 'Broadsword',
            desc: 'The Broadsword allows you to roll three combat dice in defence.',
            cost: 250,
            type: 'weapon',
            stat: 'atk',
            buff: 1,
            wizard: false,
        },
        {
            name: 'Chain Mail',
            desc: 'Chain Mail armour allows you to roll three combat dice in defence.',
            cost: 400,
            type: 'armour',
            stat: 'def',
            buff: 3,
            wizard: false,
        },
        {
            name: 'Cloak of Protection',
            desc: 'The Cloak of Protection allows you to roll one extra die in defence.',
            cost: 350,
            type: 'armour',
            stat: 'def',
            buff: 1,
            wizard: true,
        },
        {
            name: 'Crossbow',
            desc: 'The crossbow allows you to roll three combat dice in attack.  You may not use the Crossbow against an opponent who is adjacent to you.',
            cost: 350,
            type: 'weapon',
            stat: 'atk',
            buff: 3,
            wizard: false,
        },
        {
            name: 'Hand Axe',
            desc: 'The hand Axe allows you to roll two combat dice in attack, you may also throw the Hand Axe but if you do you lose it.',
            cost: 150,
            type: 'weapon',
            stat: 'atk',
            buff: 2,
            wizard: false,
        },
        {
            name: 'The Helmet',
            desc: 'The Helmet allows you to roll an extra combat die in defence.',
            cost: 120,
            type: 'helmet',
            stat: 'def',
            buff: 1,
            wizard: false,
        },
        {
            name: 'Plate Armour',
            desc: 'The Plate armour allows you to roll four dice in defence BUT you may only roll one die for movement whilst wearing Plate Armour',
            cost: 850,
            type: 'armour',
            stat: 'def',
            buff: 4,
            wizard: false,
        },
        {
            name: 'The Shield',
            desc: 'The Shield allows you to roll an extra combat die in defence.',
            cost: 100,
            type: 'shield',
            stat: 'def',
            buff: 1,
            wizard: false,
        },
        {
            name: 'Short Sword',
            desc: 'The Short Sword allows you to roll two combat dice in attack, the Short Sword may be used to attack diagonally.',
            cost: 150,
            type: 'weapon',
            stat: 'atk',
            buff: 2,
            wizard: false,
        },
        {
            name: 'Spear',
            desc: 'The Spear allows you to roll two combat dice in attack, the Spear may be used to attack diagonally.  You may also throw the Spear but if you do so you lose it.',
            cost: 150,
            type: 'weapon',
            stat: 'atk',
            buff: 2,
            wizard: false,
        },
        {
            name: 'Staff',
            desc: 'The Staff allows you to roll two combat dice in attack, the Staff may be used to attack diagonally.',
            cost: 100,
            type: 'weapon',
            stat: 'atk',
            buff: 2,
            wizard: true,
        },
        {
            name: 'Toolkit',
            desc: 'The Toolkit allows you to remove any trap you find.  Roll one combat die, on the roll of a skull the trap goes off and you lose one body point.  Once you have rolled the die the trap is removed.',
            cost: 200,
            type: 'tool',
            stat: 'disarm',
            buff: true,
            wizard: true,
        },
    ],
    treasure: [
        {
            name: 'Gem!',
            type: 'gold',
            description: 'Tucked into an old boot you find a valuable Gem worth 50 gold coins.',
            value: '0d0 + 50',
            remove: true
        },
        {
            name: 'Gold!',
            type: 'gold',
            description: 'You search and find small amounts of gold in several places.  Roll 1d6 and multiply it by 10 to see how many coins you find.',
            value: '1d6 * 10',
            remove: true
        },
        {
            name: 'Gold!',
            type: 'gold',
            description: 'You find a meagre haul of just 10 gold coins.',
            value: '0d0 + 10',
            remove: true
        },
        {
            name: 'Gold!',
            type: 'gold',
            description: 'A rummage through several items of clothing reveals 20 gold coins.',
            value: '0d0 + 20',
            remove: true
        },
        {
            name: 'Gold!',
            type: 'gold',
            description: 'Amidst the clutter, the old rags, the greasy fur robes and soiled blankets you find 25 gold coins.',
            value: '0d0 + 25',
            remove: true
        },
        {
            name: 'Gold!',
            type: 'gold',
            description: 'Amidst the clutter, the old rags, the greasy fur robes and soiled blankets you find 25 gold coins.',
            value: '0d0 + 25',
            remove: true
        },
        {
            name: 'Gold!',
            type: 'gold',
            description: 'You find a loose stone behind which is a small leather pouch wrapped in an old rag.  You look inside the pouch and find 50 gold coins!',
            value: '0d0 + 50',
            remove: true
        },
        {
            name: 'Heroic Brew',
            type: 'potion',
            description: 'A leather bag hanging on the wall contains a potion.  It is a Heroic Brew.  The potion may be taken just before an attack.  Any player who drinks the potion will be able to make two attacks instead of one for one turn only.  The item is then discarded.',
            remove: true,
            data: {
                stat: 'atk_count',
                buff: 1,
                amount: 1,
            }
        },
        {
            name: 'Holy Water',
            type: 'potion',
            description: 'Discarded and forgotten in a corner of the room you find a vial of Holy Water.  You may use the Holy Water instead of attacking, it will kill any undead creature.  Discard after use.',
            remove: true,
            data: {
                stat: 'none',
                buff: 1,
                amount: 1,
            }
        },
        {
            name: 'Jewels!',
            type: 'gold',
            description: 'You find a small wooden box. The box is plain and old but within it is lined with velvet and contains 50 gold coins worth of Jewels!',
            value: '0d0 + 50',
            remove: true
        },
        {
            name: 'Nothing',
            type: 'none',
            description: 'You find nothing.',
            remove: false
        },
        {
            name: 'Potion of Healing',
            type: 'potion',
            description: 'Enveloped in a bundle of rags you find a small bottle of liquid.  You recognize it as a healing potion.  You may drink the potion at any time, it will restore up to four body points.  The card is then discarded.',
            remove: true,
            data: {
                stat: 'body',
                buff: 4,
                amount: 1,
            }
        },
        {
            name: 'Potion of Healing',
            type: 'potion',
            description: 'Enveloped in a bundle of rags you find a small bottle of liquid.  You recognize it as a healing potion.  You may drink the potion at any time, it will restore up to four body points.  The card is then discarded.',
            remove: true,
            data: {
                stat: 'body',
                buff: 4,
                amount: 1,
            }
        },
        {
            name: 'Potion of Resilience',
            type: 'potion',
            description: 'Amidst a collection of old bottles and earthen jugs you find a small clear vial, a Potion of Resilience!  It may be taken at any time, you may then roll two extra combat dice in defence when you next defend.  The card is then discarded.',
            remove: true,
            data: {
                stat: 'def',
                buff: 1,
                amount: 1,
            }
        },
        {
            name: 'Potion of Speed',
            type: 'potion',
            description: 'Standing on a shelf you see a dusty bottle, as you wipe it clean you realise it is a potion of speed!  You may drink the potion at any time, it will allow you to roll twice as many dice as usual the next time you move.  The card is then discarded.',
            remove: true,
            data: {
                stat: 'move',
                buff: 2,
                amount: 1,
            }
        },
        {
            name: 'Potion of Strength',
            type: 'potion',
            description: 'You find a small purple bottle, it is a potion of strength!  You may drink the potion at any time, it will enable you to roll two extra combat dice in attack in your next attack.  The card is then discarded.',
            remove: true,
            data: {
                stat: 'atk',
                buff: 1,
                amount: 1,
            }
        },
        {
            name: 'Trap!',
            type: 'trap',
            description: 'As you search, you unwittingly set  off a trap.  An arrow shoots out from the wall, you lose one body point.  Return this card to the treasure pile.',
            value: 1,
            remove: false,
        },
        {
            name: 'Trap!',
            type: 'trap',
            description: 'As you search, you unwittingly set  off a trap.  An arrow shoots out from the wall, you lose one body point.  Return this card to the treasure pile.',
            value: 1,
            remove: false,
        },
        {
            name: 'Trap!',
            type: 'trap',
            description: 'As you search, you unwittingly set  off a trap.  An arrow shoots out from the wall, you lose one body point.  Return this card to the treasure pile.',
            value: 1,
            remove: false,
        },
        {
            name: 'Treasure Horde',
            type: 'gold',
            description: 'Luck is with you, you find a small treasure chest under an old fur contains 100 gold coins.',
            value: '0d0 + 100',
            remove: true
        },
        {
            name: 'Wandering Monster!',
            type: 'monster',
            description: 'As you are busy searching a monster stalks up on you and attacks!  The Evil Wizard player may place the wandering monster shown in this adventure in any square next to you, the monster attacks immediately.  Return this card to the treasure pile.',
            value: 0,
            remove: false
        },
        {
            name: 'Wandering Monster!',
            type: 'monster',
            description: 'As you are busy searching a monster stalks up on you and attacks!  The Evil Wizard player may place the wandering monster shown in this adventure in any square next to you, the monster attacks immediately.  Return this card to the treasure pile.',
            value: 0,
            remove: false
        },
        {
            name: 'Wandering Monster!',
            type: 'monster',
            description: 'As you are busy searching a monster stalks up on you and attacks!  The Evil Wizard player may place the wandering monster shown in this adventure in any square next to you, the monster attacks immediately.  Return this card to the treasure pile.',
            value: 0,
            remove: false
        },
        {
            name: 'Wandering Monster!',
            type: 'monster',
            description: 'As you are busy searching a monster stalks up on you and attacks!  The Evil Wizard player may place the wandering monster shown in this adventure in any square next to you, the monster attacks immediately.  Return this card to the treasure pile.',
            value: 0,
            remove: false
        },
        {
            name: 'Wandering Monster!',
            type: 'monster',
            description: 'As you are busy searching a monster stalks up on you and attacks!  The Evil Wizard player may place the wandering monster shown in this adventure in any square next to you, the monster attacks immediately.  Return this card to the treasure pile.',
            value: 0,
            remove: false
        },
    ],
    /** GET_ACTOR
    * Gets an actor from a name, will check actors and tokens and return just the Actor object.
    * @param {string} name 
    * @returns Actor
    */
    get_actor: function(name) {
        let char = game.actors.getName(name);
        if (char) return char;
        return canvas.tokens.placeables.find(i => i.name == name).document.actor;
    },
}