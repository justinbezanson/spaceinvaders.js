(function() {
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

    document.onkeydown = function(e) {
      e = e || window.event;

      if(e.keyCode == 37) {
        self.player.move(-10, 0);
      } else if(e.keyCode == 39) {
        self.player.move(10, 0);
      }
    };
  }

  Game.prototype.draw = function() {
    var self = this;

    //clear canvas before redraw
    context.clearRect(0, 0, canvas.width, canvas.height);

    this.map.draw();
    this.player.draw();
    //this.context.font = '40pt Calibri';
    //this.context.fillStyle = 'blue';
    //this.context.fillText('Hello World!', 150, 100);

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

  function Alien() {

  }

  function Missle(direction) {
    this.direction = direction;
  }

  var game = new Game();
  game.draw();
})();
