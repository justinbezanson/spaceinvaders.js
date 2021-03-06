(function() {
  "use strict";

  var canvas = document.getElementById('myCanvas'),
      context = canvas.getContext('2d');

  function Map() {
  
  }

  Map.prototype.draw = function() {
    context.fillStyle = '#000000';
    context.fillRect(0, 0, canvas.width, canvas.height); 
  };

  function Game() {
    var self = this;

    this.map = new Map();
    this.player = new Player();
    this.swarm = new Swarm();

    document.onkeydown = function(e) {
      e = e || window.event;

      if(e.keyCode == 37) {
        self.player.move(-5, 0);
      } else if(e.keyCode == 39) {
        self.player.move(5, 0);
      } else if(e.keyCode == 32) {
        self.player.fire();
      }
    };
  }

  Game.prototype.draw = function() {
    var self = this,
      missles = this.player.getMissles();

    //clear canvas before redraw
    context.clearRect(0, 0, canvas.width, canvas.height);
    //draw screen
    this.map.draw();
    //draw player
    this.player.draw();
    //draw player missles
    for(var i=0; i < missles.length; i++) {
      missles[i].draw();
    }
    //draw aliens
    this.swarm.draw();

    //move the swarm
    this.swarm.move();

    //game loop
    setTimeout(function() { self.draw(); }, 10);
  };

  function Movable(x, y) {
    this.x = x;
    this.y = y;
  }

  Movable.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
  };

  Movable.prototype.draw = function(style) {
    context.fillStyle = style;
    context.fillRect(this.x, this.y, 20, 20);
  };

  Actor.prototype = Object.create(Movable.prototype);
  Actor.prototype.constructor = Actor;
  function Actor(x, y) {
    this.x = x;
    this.y = y;
    this.missles = [];
  }

  Actor.prototype.fire = function(missle) {
    this.missles.push(missle);
    missle.fire();
  };

  Actor.prototype.getMissles = function() {
    return this.missles;
  };

  Player.prototype = Object.create(Actor.prototype);
  Player.prototype.constructor = Player;
  function Player() {
    Actor.call(this, 320, 440);
  }

  Player.prototype.draw = function() {
    Actor.prototype.draw.call(this, 'green');
  };

  Player.prototype.fire = function() {
    Actor.prototype.fire.call(this, new Missle(
      this.x, 
      this.y, 
      Missle.DIRECTION_UP
    ));
  };

  Alien.prototype = Object.create(Actor.prototype);
  Alien.prototype.constructor = Alien;
  function Alien(x, y) {
    Actor.call(this, x, y);
  }

  Alien.prototype.draw = function() {
    Actor.prototype.draw.call(this, 'red');
  };

  function Swarm() {
    this.x = 175;
    this.y = 40;
    this.dist = 30;
    this.aliens = [];
    this.position = 0;
    this.direction = -1;

    for(var rows = 0; rows < 5; rows++) {
      for(var cols = 0; cols < 10; cols++) {
        this.aliens.push(new Alien(
          this.x + (this.dist*cols),
          this.y + (this.dist*rows)
        ));
      }
    }
  }

  Swarm.prototype.draw = function() {
    for(var i = 0; i< this.aliens.length; i++) {
      this.aliens[i].draw();
    }
  };

  Swarm.prototype.move = function() {
    for(var i = 0; i< this.aliens.length; i++) {
      this.aliens[i].move(this.direction, 0);
    }

    //increment position
    this.position += this.direction;

    if(this.direction === -1 && this.position < -100) {
      this.direction = 1;
      this.position = -100;
    } 

    if(this.direction === 1 && this.position > 100) {
      this.direction = -1;
      this.position = 100;
    }    
  };

  Missle.prototype = Object.create(Movable.prototype);
  Missle.prototype.constructor = Missle;
  function Missle(x, y, direction) {
    this.direction = direction;

    Movable.call(this, x, y);
  }

  Missle.prototype.draw = function() {
    Movable.prototype.draw.call(this, 'yellow');
  };

  Missle.prototype.fire = function() {
    var self = this;

    this.move(0, this.direction);

    setTimeout(function() { self.fire(); }, 10);
  };

  Missle.DIRECTION_UP = -2;
  Missle.DIRECTION_DOWN = 2;

  var game = new Game();
  game.draw();
})();
