const canvas = document.querySelector('.myCanvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

var center_x = 300;
var center_y = 300;
var radius = 250;
var point_size = 4;
var font_size = "20px"
var num_points = 500;
var mult = 2;
var iterations = 10;
var increment = 1;
var delay_iteration = 200;
var delay_line = 10;

function getValues() {
	num_points = parseInt(document.getElementById("nPoints").value);
	mult = parseInt(document.getElementById("multiplikator").value);
	increment = parseFloat(document.getElementById("increment").value);
	iterations = parseInt(document.getElementById("iterationer").value);
	delay_iteration = parseInt(document.getElementById("delayIterationer").value);
	delay_line = parseInt(document.getElementById("delayRitningar").value);
};

function setValues() {
	document.getElementById("nPoints").value = num_points;
	document.getElementById("multiplikator").value = mult;
	document.getElementById("increment").value = increment;
	document.getElementById("iterationer").value = iterations;
	document.getElementById("delayIterationer").value = delay_iteration;
	document.getElementById("delayRitningar").value = delay_line;
};

function degToRad(degrees) {
  return degrees * Math.PI / 180;
};

function get_random_color() {
  function c() {
    var hex = Math.floor(Math.random()*256).toString(16);
    return ("0"+String(hex)).substr(-2); // pad with zero
  }
  return "#"+c()+c()+c();
}

function getX(x) {
	var angle = 360/num_points*x;
	return center_x + radius * Math.cos(-angle*Math.PI/180);
}
function getY(y) {
	var angle = 360/num_points*y;
	return center_y + radius * Math.sin(-angle*Math.PI/180);	
}

function drawCircle() {
	ctx.beginPath();
	ctx.arc(300, 300, 250, degToRad(0), degToRad(360), false);
	ctx.stroke();
}

function drawPoint(angle,distance,label){
	var angle = 360/num_points*angle;
  	var x = center_x + radius * Math.cos(-angle*Math.PI/180) * distance;
	var y = center_y + radius * Math.sin(-angle*Math.PI/180) * distance;

	ctx.beginPath();
	ctx.arc(x, y, point_size, 0, 2 * Math.PI);
	ctx.fill();

	ctx.font = font_size;
	ctx.fillText(label,x + 10,y);
}

function addDots(ctx) {
  for (i = 0; i < num_points; i++) {
	  drawPoint(i, 1, i);
	}
}

function connectPoints(point1, point2) {
	toPoint = point2%num_points;
	x1 = getX(point1);
	y1 = getY(point1);
	x2 = getX(toPoint);
	y2 = getY(toPoint);

	ctx.lineWidth = 1;

  	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function updateValues() {
	getValues();
}

async function drawForMultiplicator(mult) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.strokeStyle = get_random_color();
	drawCircle();
	for (dot = 0; dot < num_points; dot++) {
		connectPoints(dot, dot*mult);
		await sleep(delay_line);
	}
}

function drawOne() {
	getValues();
	drawForMultiplicator(mult);
}

function drawNext() {
	mult++;
	setValues();
	drawForMultiplicator(mult);
}

function drawPrevious() {
	mult--;
	setValues();
	drawForMultiplicator(mult);
}

async function demo() {
	getValues();

	drawCircle();
	addDots(ctx);

	for (m=0; m < iterations; m=m+increment) {
		drawForMultiplicator(m+mult);
		await sleep(delay_iteration);
	}
}
