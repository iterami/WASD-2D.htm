'use strict';

function draw_logic(){
    canvas_buffer.save();
    canvas_buffer.translate(
      canvas_properties['width-half'],
      canvas_properties['height-half']
    );

    if(core_storage_data['camera-attach']){
        canvas_buffer.save();
        canvas_buffer.translate(
          -core_entities['player']['x'],
          -core_entities['player']['y']
        );

        // Draw target.
        canvas_setproperties({
          'properties': {
            'fillStyle': core_storage_data['color-negative'],
          },
        });
        canvas_buffer.fillRect(
          core_entities['target']['x'] - 5,
          core_entities['target']['y'] - 5,
          10,
          10
        );
        canvas_buffer.restore();

        // Draw player.
        canvas_setproperties({
          'properties': {
            'fillStyle': core_storage_data['color-positive'],
          },
        });
        canvas_buffer.fillRect(
          -17,
          -17,
          34,
          34
        );

    }else{
        // Draw player.
        canvas_setproperties({
          'properties': {
            'fillStyle': core_storage_data['color-positive'],
          },
        });
        canvas_buffer.fillRect(
          core_entities['player']['x'] - 17,
          core_entities['player']['y'] - 17,
          34,
          34
        );

        // Draw target.
        canvas_setproperties({
          'properties': {
            'fillStyle': core_storage_data['color-negative'],
          },
        });
        canvas_buffer.fillRect(
          core_entities['target']['x'] - 5,
          core_entities['target']['y'] - 5,
          10,
          10
        );
    }

    canvas_buffer.restore();
}

function logic(){
    var player_dx = 0;
    var player_dy = 0;

    // Add player key movments to dx and dy, if still within level boundaries.
    if(core_keys[core_storage_data['move-←']]['state']){
        player_dx -= 3;
    }

    if(core_keys[core_storage_data['move-→']]['state']){
        player_dx += 3;
    }

    if(core_keys[core_storage_data['move-↓']]['state']){
        if(player_dx != 0){
            player_dx = player_dx / 3 * Math.SQRT2;
            player_dy += Math.SQRT2;

        }else{
            player_dy += 3;
        }
    }

    if(core_keys[core_storage_data['move-↑']]['state']){
        if(player_dx != 0){
            player_dx = player_dx / 3 * Math.SQRT2;
            player_dy -= Math.SQRT2;

        }else{
            player_dy -= 3;
        }
    }

    core_entities['player']['x'] += player_dx;
    core_entities['player']['y'] += player_dy;

    if(math_distance({
      'x0': core_entities['player']['x'],
      'y0': core_entities['player']['y'],
      'x1': core_entities['target']['x'],
      'y1': core_entities['target']['y'],
    }) < 25){
        randomize_target();
    }
}

function repo_init(){
    core_repo_init({
      'events': {
        'start': {
          'onclick': function(){
              canvas_setmode({
                'newgame': true,
              });
          },
        },
      },
      'info': '<input id=start type=button value="Start Training">',
      'keybinds': {
        72: {
          'todo': canvas_setmode,
        },
      },
      'menu': true,
      'storage': {
        'camera-attach': false,
      },
      'storage-menu': '<table><tr><td><input id=camera-attach type=checkbox><td>Attach Camera</table>',
      'title': 'WASD-2D.htm',
    });
    canvas_init();
}