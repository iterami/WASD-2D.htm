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
        'down': core_storage_data['move-↓'],
        'left': core_storage_data['move-←'],
        'right': core_storage_data['move-→'],
        'up': core_storage_data['move-↑'],
      },
    });
}

function randomize_target(){
    entity_entities['target']['x'] = core_random_integer({
      'max': core_storage_data['width'],
    }) - core_storage_data['width'] / 2;
    entity_entities['target']['y'] = core_random_integer({
      'max': core_storage_data['height'],
    }) - core_storage_data['height'] / 2;
}

function repo_drawlogic(){
    canvas.save();
    canvas.translate(
      canvas_properties['width-half'],
      canvas_properties['height-half']
    );

    if(core_storage_data['camera-attach']){
        canvas_setproperties({
          'properties': {
            'fillStyle': core_storage_data['color-positive'],
          },
        });
        canvas.fillRect(
          -17,
          -17,
          34,
          34
        );

        canvas.save();
        canvas.translate(
          -entity_entities['player']['x'],
          -entity_entities['player']['y']
        );

        canvas_setproperties({
          'properties': {
            'fillStyle': core_storage_data['color-negative'],
          },
        });
        canvas.fillRect(
          entity_entities['target']['x'] - 5,
          entity_entities['target']['y'] - 5,
          10,
          10
        );
        canvas.restore();

    }else{
        canvas_setproperties({
          'properties': {
            'fillStyle': core_storage_data['color-positive'],
          },
        });
        canvas.fillRect(
          entity_entities['player']['x'] - 17,
          entity_entities['player']['y'] - 17,
          34,
          34
        );

        canvas_setproperties({
          'properties': {
            'fillStyle': core_storage_data['color-negative'],
          },
        });
        canvas.fillRect(
          entity_entities['target']['x'] - 5,
          entity_entities['target']['y'] - 5,
          10,
          10
        );
    }

    canvas.restore();
}

function repo_logic(){
    let player_dx = 0;
    let player_dy = 0;

    if(core_keys[core_storage_data['move-←']]['state']){
        player_dx -= core_storage_data['speed'];
    }
    if(core_keys[core_storage_data['move-→']]['state']){
        player_dx += core_storage_data['speed'];
    }

    if(core_keys[core_storage_data['move-↓']]['state']){
        player_dy = core_storage_data['speed'];

        if(player_dx !== 0){
            if(!core_storage_data['diagonal']){
                player_dy = 0;

            }else{
                const movement = math_move_2d_diagonal({
                  'dx': player_dx,
                  'dy': 1,
                  'speed': core_storage_data['speed'],
                });
                player_dx = movement['x'];
                player_dy = movement['y'];
            }
        }
    }
    if(core_keys[core_storage_data['move-↑']]['state']){
        player_dy = -core_storage_data['speed'];

        if(player_dx !== 0){
            if(!core_storage_data['diagonal']){
                player_dy = 0;

            }else{
                const movement = math_move_2d_diagonal({
                  'dx': player_dx,
                  'dy': -1,
                  'speed': core_storage_data['speed'],
                });
                player_dx = movement['x'];
                player_dy = movement['y'];
            }
        }
    }

    entity_entities['player']['x'] += player_dx;
    entity_entities['player']['y'] += player_dy;

    if(math_distance({
        'x0': entity_entities['player']['x'],
        'y0': entity_entities['player']['y'],
        'x1': entity_entities['target']['x'],
        'y1': entity_entities['target']['y'],
      }) < 25){
        audio_start({
          'id': 'boop',
        });
        randomize_target();
    }
}

function repo_escape(){
    if(!entity_entities['player']
      && !core_menu_open){
        core_repo_reset();
    }
}

function repo_init(){
    core_repo_init({
      'events': {
        'start': {
          'onclick': core_repo_reset,
        },
      },
      'info': '<input id=start type=button value="Start Training">',
      'reset': canvas_setmode,
      'storage': {
        'camera-attach': false,
        'diagonal': true,
        'height': 500,
        'speed': 3,
        'width': 500,
      },
      'storage-menu': '<table><tr><td><input id=camera-attach type=checkbox><td>Attach Camera'
        + '<tr><td><input id=diagonal type=checkbox><td>Diagonal Movement'
        + '<tr><td><input class=mini id=height min=1 step=any type=number><td>Height'
        + '<tr><td><input class=mini id=speed step=any type=number><td>Speed'
        + '<tr><td><input class=mini id=width min=1 step=any type=number><td>Width</table>',
      'title': 'WASD-2D.htm',
      'ui': '<table><tr><td>Move Up<td id=up><tr><td>Move Left<td id=left><tr><td>Move Down<td id=down><tr><td>Move Right<td id=right></table>',
    });
    audio_create({
      'audios': {
        'boop': {
          'duration': .1,
        },
      },
    });
    canvas_init();
}
