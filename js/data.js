'use strict';

function load_data(id){
    entity_create({
      'id': 'player',
    });
    entity_create({
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
    entity_entities['target']['x'] = core_random_integer({
      'max': 500,
    }) - 250;
    entity_entities['target']['y'] = core_random_integer({
      'max': 500,
    }) - 250;
}
