var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// c.fillStyle = 'rgba(255, 0, 0, 0.5)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0, 0, 255, 0.5)';
// c.fillRect(340, 150, 100, 100);
// c.fillStyle = 'rgba(0, 255, 0, 0.5)';
// c.fillRect(200, 610, 100, 100);


var mouse = {
	x: undefined,
	y: undefined
}


var maxRadius = 40;

var minRadius = 3;

var growSpeed = 3;

var amountCircles = 1000;

// blue, red, navy, dark turqois, light graey
var colorArray = [
	'#2C3E50',
	'#E74C3C',
	'#ECF0F1',
	'#3498DB',
	'#298089'
];

//oranges and blues
var colorArray = [
	'#002447',
	'#003F7D',
	'#E1E3E7',
	'#FF8E00',
	'#FF5003'
];
/*
// bee
var colorArray = [
	'#DBD9CD',
	'#FACC14',
	'#E3AE1E',
	'#332F26',
	'#EF9713'
];

// halloween theme

var colorArray = [
	'#F2B705',
	'#F29F05',
	'#F27405',
	'#F24405',
	'#0D0D0D'
];
*/

// when ouse moves
window.addEventListener('mousemove',
	function(event) {
		mouse.x = event.x;
		mouse.y = event.y;
});


// when window is resize
window.addEventListener('resize',
	function() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		init();
});



// objects passed through here
function Circle(x, y, dx, dy, radius) {
	// setting varlibles to object
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;

	// randomizes the color
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];


	// draws objects
	this.draw = function () {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

		// randomized fill color
		c.fillStyle = this.color;
		c.fill();
	}

	// updates the positions
	this.update = function() {
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}

		if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

		// interactivity
		if (mouse.x - this.x < 50 && mouse.x - this.x > -50
			&& mouse.y - this.y < 50 && mouse.y - this.y > -50) {

			if (this.radius < maxRadius) {
				this.radius += growSpeed;
			}


		} else if (this.radius > this.minRadius) {
			this.radius -= 1;
		}


		this.draw();
	}
}




// makes array that stores the circles
var circleArray = [];
// resets everytime window is resized
function init() {

	circleArray = [];

	// loop makes 100 random circles, with all random values
	for (var i = 0; i < amountCircles; i++) {
		var radius = Math.random() * 3 + 1;

		// makes it so that the circles arent caught on the edge
		var x = Math.random() * (innerWidth - radius * 2) + radius;
		var y = Math.random() * (innerHeight - radius * 2) + radius;

		var dx = (Math.random() - 0.5) * 2;
		var dy = (Math.random() - 0.5) * 2;


		// adds object to array
		circleArray.push(new Circle(x, y, dx, dy, radius));

	}
}


// animates the window
function animate() {

	// makes the function repeat forever
	requestAnimationFrame(animate);

	// clears the screen
	c.clearRect(0, 0, innerWidth, innerHeight);

	// updates all of the objects inside the array
	for (var i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}

	//circleArray.update();

}

init();


animate();
