var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function Shape(x, y, w, h, fill, alpha, reset) {
    this.x = x || 0;
    this.y = y || 0;
    this.originalX = x;
    this.originalY = y;
    this.width = w || 1;
    this.height = h || 1;
    this.fill = fill || '#AAAAAA';
    this.alpha = alpha || 1;
    this.shouldReset = reset || false;
}

Shape.prototype.draw = function(context) {
    context.globalAlpha = this.alpha;
    context.fillStyle = this.fill;
    context.fillRect(this.x, this.y, this.width, this.height);
}

function CanvasState(canvas) {
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.context = canvas.getContext('2d');
  
    this.redraw = false;
    this.shapes = [];

    var myState = this;
  
    this.interval = 30;
    setInterval(function() { myState.draw(); }, myState.interval);
}

CanvasState.prototype.addShape = function(shape) {
    this.shapes.push(shape);
    this.redraw = true;
}

CanvasState.prototype.clear = function() {
    this.context.clearRect(0, 0, this.width, this.height);
}

CanvasState.prototype.animate = function(startTime) {
    var time = (new Date()).getTime() - startTime;
    var speed = 100;
    var shapes = this.shapes;

    for (var i=0; i<shapes.length; i++)
    {
        var testMultiplier = 15;
        var growthDeviation = Math.floor((Math.random() * 20) + 1) / 1000;
        var newX = shapes[i].x + (speed * time / 1000);
        shapes[i].x -= 0.025 * testMultiplier;
        shapes[i].y -= 0.025 * testMultiplier;
        shapes[i].width += 0.05 * testMultiplier;
        shapes[i].height += (0.05 + growthDeviation) * testMultiplier;

        //increment it if it hasn't reached a full cycle yet
        if (shapes[i].shouldReset == false)
        {
            shapes[i].alpha += 0.00015 * testMultiplier;

            if (shapes[i].alpha >= 0.5)
            {
                shapes[i].shouldReset = true;
            }
        }
        // reset shape to a random position if the alpha is 0
        else if (shapes[i].shouldReset == true)
        {
            shapes[i].alpha -= 0.00015 * testMultiplier;

            if (shapes[i].alpha <= 0)
            {
                var orgX = shapes[i].originalX;
                var orgY = shapes[i].originalY;
                var offset = 400;
                shapes[i].x = Math.random() * ((orgX+offset) - (orgX - offset)) + (orgX - offset);
                shapes[i].y = Math.random() * ((orgY+offset) - (orgY - offset)) + (orgY - offset);
                shapes[i].width = Math.random() * (500 - 50) + 50;
                shapes[i].height = Math.random() * (500 - 50) + 50;
                shapes[i].alpha = 0;
                shapes[i].shouldReset = false;
            }
        }
    }
}

CanvasState.prototype.draw = function() {
    requestAnimationFrame(function(){
        CanvasState.prototype.draw();
    });

    if (this.redraw) {
        var startTime = (new Date()).getTime();
        this.animate(startTime);

        var context = this.context;
        var shapes = this.shapes;
        this.clear();

        for (var i = 0; i < shapes.length; i++) {
          var shape = shapes[i];
          // don't draw what's off-screen
          if (shape.x > this.width || shape.y > this.height ||
              shape.x + shape.w < 0 || shape.y + shape.h < 0) continue;
          shapes[i].draw(context);
        }

        this.redraw = true;
    }
}

function init() {
    var state = new CanvasState(document.getElementById('canvas'));

    var shapeColor = '#383838';
    
    function coordinate(x, y) {
        this.x = x;
        this.y = y;
    }

    var shapesPerSpawn = 10;
    var spawnPoints = [];
    spawnPoints.push(new coordinate(100, 0));
    spawnPoints.push(new coordinate(500, 300));
    spawnPoints.push(new coordinate(100, 700));
    spawnPoints.push(new coordinate(1400, 0));
    spawnPoints.push(new coordinate(1420, 400));

    for (var i=0; i<spawnPoints.length; i++)
    {
        
        for (var ct=0; ct<shapesPerSpawn; ct++)
        {
            var x = spawnPoints[i].x;
            var y = spawnPoints[i].y;

            x += Math.random() * (200 - -200) + -200;
            y += Math.random() * (200 - -200) + -200;
            var width = Math.random() * (1000 - 0) + 0;
            var height = Math.random() * (1000 - 0) + 0;
            var alpha = Math.random() * ((50 - 0) + 0) / 100;
            var resetChance = Math.random() * (2 - 0) + 0;
            var resetPick = true;
            if (resetChance>0)
            {
                resetPick = false;
            }

            state.addShape(new Shape(x, y, width, height, shapeColor, alpha, resetPick));
        }
    }  
}

init();