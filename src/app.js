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
    this.swarmPos = 0;
    this.swarmDir = -1;

    document.onkeydown = function(e) {
      e = e || window.event;

      if(e.keyCode == 37) {
        self.player.move(-5, 0);
      } else if(e.keyCode == 39) {
        self.player.move(5, 0);
      }
    };
  }

  Game.prototype.draw = function() {
    var self = this;

    //clear canvas before redraw
    context.clearRect(0, 0, canvas.width, canvas.height);
    //draw screen
    this.map.draw();
    //draw player
    this.player.draw();
    //draw aliens
    this.swarm.draw();

    //move the swarm
    this.swarm.move(this.swarmDir*1, 0);
    this.swarmPos += this.swarmDir*1;

    if(this.swarmDir === -1 && this.swarmPos < -100) {
      this.swarmDir = 1;
      this.swarmPos = -100;
    } 

    if(this.swarmDir === 1 && this.swarmPos > 100) {
      this.swarmDir = -1;
      this.swarmPos = 100;
    }

    //game loop
    setTimeout(function() { self.draw(); }, 10);
  };

  function Actor(x, y) {
    this.x = x;
    this.y = y;
  }

  Actor.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
  };

  Actor.prototype.draw = function(style) {
    context.fillStyle = style;
    context.fillRect(this.x, this.y, 20, 20);
  };

  Player.prototype = Object.create(Actor.prototype);
  Player.prototype.constructor = Player;
  function Player() {
    Actor.call(this, 320, 440);
  }

  Player.prototype.draw = function() {
    Actor.prototype.draw.call(this, 'green');
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

  Swarm.prototype.move = function(x, y) {
    for(var i = 0; i< this.aliens.length; i++) {
      this.aliens[i].move(x, y);
    }
  };

  function Missle(direction) {
    this.direction = direction;
  }

  var game = new Game();
  game.draw();
})();
