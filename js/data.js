'use strict';

function load_data(id){
    core_entity_create({
      'id': 'player',
    });
    core_entity_create({
      'id': 'target',
    });

    randomize_target();

    core_ui_update({
      'ids': {
        'down': String.fromCharCode(core_storage_data['move-↓']),
        'left': String.fromCharCode(core_storage_data['move-←']),
        'right': String.fromCharCode(core_storage_data['move-→']),
        'up': String.fromCharCode(core_storage_data['move-↑']),
      },
    });
}

function randomize_target(){
    core_entities['target']['x'] = core_random_integer({
      'max': 500,
    }) - 250;
    core_entities['target']['y'] = core_random_integer({
      'max': 500,
    }) - 250;
}
