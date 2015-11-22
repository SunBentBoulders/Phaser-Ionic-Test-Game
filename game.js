
var GameState = function(game) {};

// set size of screen - iPhone5 resolution(1136x640), landscape
var stageSize = {
	width: 1136,
	height: 640
};
// set center of screen, important for knowing when we're on R or L side of screen when using controls
var centerPoint = {
	x: stageSize.width/2,
	y: stageSize.height/2
};

// preload images, audio, spritesheets here
// preloading avoids any potential load-lag later
// preload all assets for game
GameState.prototype.preload = function() {
	// load loads all external asset types (images, audio, json, xml, txt) and adds them to Cache
	// load automatically invoked by a state
	this.game.load.image('player', 'cape.png')
};

// this function is called immediately after preloading
GameState.prototype.create = function() {
	// adds background color as a number
	this.game.stage.backgroundColor = 0x360000
	this.game.add.existing(
		this.player = new Player(this.game, 150, centerPoint.y, this.game.input)
		);
	// add frames per second timer
	this.game.time.advancedTiming = true;
	// add timer as text on the screen
	this.fpsText = this.game.add.text(20, 20, '', {font: '16px optima', fill: '#eecccc'});
};

// this method is called every frame
GameState.prototype.update = function() {
	// update the fpsText
	if (this.game.time.fps !== 0) {
		this.fpsText.setText(this.game.time.fps + ' FPS');
	}
};

// create player class
var Player = function(game, x, y, target) {
	// based on phaser's sprite class
	Phaser.Sprite.call(this, game, x, y, 'player');
	// set game input as target
	this.target = target;
	// centerpoint allows us to rotate/pivot character based on its centerpoint
	this.anchor.setTo(0.5,0.5);
	// enable physics to move player around
	this.game.physics.enable(this, Phaser.Physics.ARCADE);
	// set target position for player to head to
	this.targetPos = {x: this.x, y: this.y};
	// easing constant to smooth the movement
	this.easer = .5;
	// set health
	this.health = 100;
};

// give our player a type of Phaser
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
	// if the target's active pointer is down (we assigned target as this.game.input)
	if (this.target.activePointer.isDown) {
		// make new target position to pointer's potition
		this.targetPos = {x: this.target.x, y: this.target.y};
	}
	// work out velocities by working out the difference between target and current position; use easer to smooth it
	var velX = (this.targetPos.x - this.x)/this.easer;
	var velY = (this.targetPos.y - this.y)/this.easer;

	// set player's physics body's velocity
	this.body.velocity.setTo(velX, velY);
};


// instantiate a new phaser game with iPhone5 resolution(1136x640) - this example uses landscape
var game = new Phaser.Game(1136, 640, Phaser.AUTO, 'game');

// add GameState to the game we just instantiated as the default state
// extends base game state with the GameState we created above
game.state.add('game', GameState, true);




