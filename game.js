//IMPORTANT: Make sure to use Kaboom version 0.5.0 for this game by adding the correct script tag in the HTML file.

kaboom({
    global: true,
    fullscreen: true,
    scale: 2,
    debug: true,
    clearColor: [0, 0, 0, 0],
    
  })
  
  // Speed identifiers
  const MOVE_SPEED = 120
  const JUMP_FORCE = 330
  const BIG_JUMP_FORCE = 450
  let CURRENT_JUMP_FORCE = JUMP_FORCE
  const FALL_DEATH = 400
  const ENEMY_SPEED = 20
  const CLOUD_SPEED = 5

  //images
  const leftimage = 'evil-shroom'
  
  // Game logic
  
  let isJumping = true
  
  // loadRoot('https://i.imgur.com/')
  loadSprite('coin', 'img/vbuck.png')
  loadSprite('evil-shroom', 'img/Jeroen-evil.png')
  loadSprite('brick', 'img/stoneGround.jpg')
  loadSprite('block', 'img/grass.jpg')
  loadSprite('mario', 'img/Niels.png')
  loadSprite('mushroom', 'img/up.png')
  loadSprite('surprise', 'img/floaterSup.jpg')
  loadSprite('unboxed', 'img/floaterSup.jpg')
  loadSprite('pipe-top-left', 'img/hole-right-up.png')
  loadSprite('pipe-top-right', 'img/hole-left-up.png')
  loadSprite('pipe-bottom-left', 'img/hole-right-down.png')
  loadSprite('pipe-bottom-right', 'img/hole-left-down.png')
  loadSprite('pipe-upper-right', 'img/hole-right-upper.png')
  loadSprite('pipe-upper-left', 'img/hole-left-upper.png')

  //EXTRA
  loadSprite('grassStone', 'img/stoneGround.jpg')
  loadSprite('dirt', 'img/earth.jpg')
  loadSprite('border', 'img/none.png')
  loadSprite('hole-right', 'img/earth-hole-right.jpg')
  loadSprite('hole-left', 'img/earth-hole-left.jpg')
  loadSprite('spike-right', 'img/spike2.jpg')
  loadSprite('spike-left', 'img/spike1.jpg')
  loadSprite('stone1', 'img/stone.png')
  loadSprite('stone2', 'img/stone2.png')
  loadSprite('tree1', 'img/boom1.png')
  loadSprite('cloud1', 'img/cloud.png')
  loadSprite('gr-l-e', 'img/grass-end-left2.png')
  loadSprite('gr-r-e', 'img/grass-end-right2.png')
  loadSprite('pole', 'img/pole.png')
  loadSprite('pole-end', 'img/pole-end.png')
  loadSprite('shaft', 'img/shaft.jpg')
  loadSprite('floater', 'img/floater.jpg')
  loadSprite('fenceL', 'img/fence-left.png')
  loadSprite('fenceR', 'img/fence-right.png')
  loadSprite('bridge', 'img/bridge3.png')
  loadSprite('bridge2', 'img/bridge2.png')
  loadSprite('bridgeBR', 'img/bridgeBR1.png')
  loadSprite('bridgeBR2', 'img/bridgeBR2.png')
  
  loadSprite('blue-block', 'img/none.jpg')
  loadSprite('blue-brick', 'img/none.png')
  loadSprite('blue-steel', 'img/none.jpg')
  loadSprite('blue-evil-shroom', 'img/none.jpg')
  loadSprite('blue-surprise', 'img/none.jpg')
  
  
  
  scene("game", ({ level, score }) => {
    layers(['bg', 'obj', 'ui'], 'obj')
  
    const maps = [
      [
        '             c                                               c                                  c                            ',
        '                                            c                                                                                ',
        '                           c                                                                                                 ',
        '                                                                                                                             ',
        '                                   c                                  c                                  c                   ',
        '                                                                                                                             ',
        '      c                                      c                                  c                                  c         ',
        '                                                                                                                             ',
        '                                                                W                                                            ',
        '                                                                w                                                            ',
        '     %   2*2%2                                                  w                                                            ',
        '             t                                        t       |?w                                                            ',
        '                                                              -+w                                                            ',
        '      i          o ^   ^   i3    4          o             o   ()w                                                            ',
        '=============================8  9================================', 
        'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEENMEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
        'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE11EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
        'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE11EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
        'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE11EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
        'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE11EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
        'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE11EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
        'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE11EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
        'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE11EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
        'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE11EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
        'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE11EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
        'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEECVEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
        
      ],
      [
        '£                                       £',
        '£                                       £',
        '£                                       £',
        '£                                       £',
        '£                                       £',
        '£        @@@@@@              x x        £',
        '£                          x x x        £',
        '£                        x x x x  x   -+£',
        '£               z   z  x x x x x  x   ()£',
        '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
      ]
    ]
  
    const levelCfg = {
      width: 20,
      height: 20,
      '=': [sprite('block'), solid()],
      '$': [sprite('coin'), 'coin'],
      '%': [sprite('surprise'), solid(), 'coin-surprise'],
      '*': [sprite('surprise'), solid(), 'mushroom-surprise'],
      '}': [sprite('unboxed'), solid()],
      '(': [sprite('pipe-bottom-left'), solid(), scale(1)],
      ')': [sprite('pipe-bottom-right'), solid(), scale(1)],
      '-': [sprite('pipe-top-left'), solid(), scale(1), 'pipe'],
      '+': [sprite('pipe-top-right'), solid(), scale(1), 'pipe'],
      '|': [sprite('pipe-upper-left'), scale(1), 'pipe'],
      '?': [sprite('pipe-upper-right'), scale(1), 'pipe'],
      '^': [sprite('evil-shroom'), solid(),scale(0.9), 'dangerous'],
      '#': [sprite('mushroom'), solid(), 'mushroom', body()],
      '!': [sprite('blue-block'), solid(), scale(0.5)],
      '&': [sprite('blue-brick'), solid(), scale(0.5)],
      'z': [sprite('blue-evil-shroom'), solid(), scale(0.5), 'dangerous'],
      '@': [sprite('blue-surprise'), solid(), scale(0.5), 'coin-surprise'],
      'x': [sprite('blue-steel'), solid(), scale(0.5)],
      //extra
      'S': [sprite('grassStone'), solid(), scale(1)],
      'E': [sprite('dirt'), solid(), scale(1)],
      'e': [sprite('dirt'), scale(1)],
      '£': [sprite('border'), solid(), scale(1)],
      'N': [sprite('hole-left'), scale(1)],
      'M': [sprite('hole-right'), scale(1)],
      'C': [sprite('spike-left'),solid(), scale(1)],
      'V': [sprite('spike-right'),solid(), scale(1)],
      'i': [sprite('stone1'), scale(1)],
      'o': [sprite('stone2'), scale(1)],
      't': [sprite('tree1'), scale(3)],
      'c': [sprite('cloud1'), scale(2), 'clouds'],
      'g': [sprite('gr-l-e'), scale(1)],
      'G': [sprite('gr-r-e'), scale(1)],
      'w': [sprite('pole'), scale(1), solid()],
      'W': [sprite('pole-end'), scale(1), solid()],
      '1': [sprite('shaft'), scale(1),],
      '2': [sprite('floater'), scale(1), solid()],
      '3': [sprite('fenceL'), scale(1),],
      '4': [sprite('fenceR'), scale(1),],
      '5': [sprite('bridge'), scale(1),solid()],
      '6': [sprite('bridge2'), scale(1),],
      '7': [sprite('bridge2'), scale(1),],
      '8': [sprite('bridgeBR'), scale(1),],
      '9': [sprite('bridgeBR2'), scale(1),],
    }
  
    const gameLevel = addLevel(maps[level], levelCfg)
  
    const scoreLabel = add([
      text(score),
      pos(30, 6),
      layer('ui'),
      {
        value: score,
      }
    ])
  
    add([text('level ' + parseInt(level + 1) ), pos(40, 6)])
    
    function big() {
      let timer = 0
      let isBig = false
      return {
        update() {
          if (isBig) {
            CURRENT_JUMP_FORCE = BIG_JUMP_FORCE
            timer -= dt()
            if (timer <= 0) {
              this.smallify()
            }
          }
        },
        isBig() {
          return isBig
        },
        smallify() {
          this.scale = vec2(1)
          CURRENT_JUMP_FORCE = JUMP_FORCE
          timer = 0
          isBig = false
        },
        biggify(time) {
          this.scale = vec2(2)
          timer = time
          isBig = true     
        }
      }
    }
  
    const player = add([
      sprite('mario'), solid(),
      pos(30, 0),
      body(),
      big(),
      origin('bot')
    ])
  
    action('mushroom', (m) => {
      m.move(20, 0)
      
    })
   
  
    player.on("headbump", (obj) => {
      if (obj.is('coin-surprise')) {
        gameLevel.spawn('$', obj.gridPos.sub(0, 1))
        destroy(obj)
        gameLevel.spawn('}', obj.gridPos.sub(0,0))
      }
      if (obj.is('mushroom-surprise')) {
        gameLevel.spawn('#', obj.gridPos.sub(0, 1))
        destroy(obj)
        gameLevel.spawn('}', obj.gridPos.sub(0,0))
      }
    })
  
    player.collides('mushroom', (m) => {
      destroy(m)
      player.biggify(6)
    })
  
    player.collides('coin', (c) => {
      destroy(c)
      scoreLabel.value++
      scoreLabel.text = scoreLabel.value
    })
  
    action('dangerous', (d) => {
      d.move(-ENEMY_SPEED, 0)
    })
    action('clouds', (c) => {
      c.move(-CLOUD_SPEED, 0)
    })
    
  
    player.collides('dangerous', (d) => {
      if (isJumping) {
        destroy(d)
      } else {
        go('lose', { score: scoreLabel.value})
      }
    })
  
    player.action(() => {
      camPos(player.pos)
      if (player.pos.y >= FALL_DEATH) {
        go('lose', { score: scoreLabel.value})
      }
    })
  
    player.collides('pipe', () => {
      keyPress('s', () => {
        go('game', {
          level: (level + 1) % maps.length,
          score: scoreLabel.value
        })
      })
    })

    //idk
    // function Update () {
 
    //   if (Input.GetKey(KeyCode.A))
    //       transform.Rotate(Vector3.up * -MOVE_SPEED * Time.deltaTime);
          
    //   if (Input.GetKey(KeyCode.D))
    //       transform.Rotate(-Vector3.up * MOVE_SPEED * Time.deltaTime);
     
    //  }


  
    keyDown('a', () => {
      player.move(-MOVE_SPEED, 0);
  
    })
  
    keyDown('d', () => {
      player.move(MOVE_SPEED, 0)
    
    })
  
    player.action(() => {
      if(player.grounded()) {
        isJumping = false
      }
    })
  
    keyPress('space', () => {
      if (player.grounded()) {
        isJumping = true
        player.jump(CURRENT_JUMP_FORCE)
      }
    })

    //?
    keyPress('w', () => {
      if (player.grounded()) {
        isJumping = true
        player.jump(CURRENT_JUMP_FORCE)
      }
    })

  })
  
  scene('lose', ({ score }) => {
    add([text(score, 32), origin('center'), pos(width()/2, height()/ 2)])
  })
  
  start("game", { level: 0, score: 0})
  