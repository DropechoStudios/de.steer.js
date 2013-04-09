// Config
var PG_HEIGHT = 1024;
var PG_WIDTH = 1600;
var REFRESH_RATE = 0;
var SPEED = 10;

var KEY_LEFT  = 'A'.charCodeAt();
var KEY_RIGHT = 'D'.charCodeAt();
var KEY_UP    = 'W'.charCodeAt();
var KEY_DOWN  = 'S'.charCodeAt();

var KEY_ROT_LEFT  = 'E'.charCodeAt();
var KEY_ROT_RIGHT = 'Q'.charCodeAt();

var TILE_SIZE = 16;
var SPRITE_SIZE = 16;
var TILE_COUNT = PG_WIDTH / (TILE_SIZE*4);

var redCube = new $.gameQuery.Animation({ imageURL: "./v1-small.png"});  //media
var blueCube = new $.gameQuery.Animation({ imageURL: "./v2-small.png"});  //media
var grid = new $.gameQuery.Animation({ imageURL: "./grid2.png"});  //media

//helpers
var handlePlayerKeys = function(){
  var player = $("#player"),
      keys = $.gameQuery.keyTracker;

  var trans = DE.Vec2d();

  if(keys[KEY_UP])    { trans.x += SPEED; }
  if(keys[KEY_DOWN])  { trans.x -= SPEED; }
  if(keys[KEY_LEFT])  { player.rotate(-SPEED,true); }
  if(keys[KEY_RIGHT]) { player.rotate(SPEED,true);}  

  var currentRot = DE.HeadingVec(player.rotate());
  var trans = DE.Vector.WorldToLocal(trans,currentRot);
  if(trans.Length() > 0){
    player.xy(trans,true); 
  } 
};

var updatePlayer = function(){
  handlePlayerKeys();

  var player = $("#player"),
      enemy = $("#enemy"),
      playerPos = DE.Vec2d(player.xy()),
      enemyPos = DE.Vec2d(enemy.xy());
  
  
  //var flee = DE.Steer.Evade(playerPos,enemyPos,10,64);
  //player.rotate(DE.Vector.HeadingToDeg(flee));
  //player.xy(flee, true);
}

var center = DE.Vec2d(PG_WIDTH/2,PG_HEIGHT/2);

var updateEnemy = function(){
  var player = $("#player"),
      enemy = $("#enemy"),
      playerPos = DE.Vec2d(player.xy()),      
      enemyPos = DE.Vec2d(enemy.xy());

  var steering = DE.Steer.Arrive(enemyPos,playerPos,5);
  enemy.rotate(DE.Vector.HeadingToDeg(steering));
  enemy.xy(steering, true);
};

//Main game loop.
var mainLoop = function(){  
  updatePlayer();
  updateEnemy();
};

$(document).ready(function(){
  var $playground = $("#demo");  

  $playground
    .playground({height: PG_HEIGHT, width: PG_WIDTH, refesh: REFRESH_RATE, keyTracker: true})

    .addGroup('actors', {height: PG_HEIGHT, width: PG_WIDTH})
      .addTilemap('tileMap',function(){return 1;},grid,{width: TILE_SIZE*4, height: TILE_SIZE*4, sizex: TILE_COUNT, sizey: TILE_COUNT})
      .addSprite('player',{animation: redCube, posx: 512, posy: 512, height:SPRITE_SIZE, width: SPRITE_SIZE})
      .addSprite('enemy',{animation: blueCube, posx: 512, posy: 512, height:SPRITE_SIZE, width: SPRITE_SIZE})
      .end()
    .registerCallback(mainLoop,REFRESH_RATE)
    .startGame();
});


