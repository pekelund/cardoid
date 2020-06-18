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

function degToRad(degrees) {
  return degrees * Math.PI / 180;
};

function getX(x) {
	var angle = 360/num_points*x;
	return center_x + radius * Math.cos(-angle*Math.PI/180);
}
function getY(y) {
	var angle = 360/num_points*y;
	return center_y + radius * Math.sin(-angle*Math.PI/180);	
}

function drawPoint(angle,distance,label){
	var angle = 360/num_points*angle;
  var x = center_x + radius * Math.cos(-angle*Math.PI/180) * distance;
	var y = center_y + radius * Math.sin(-angle*Math.PI/180) * distance;
  //console.log("drawPoint: ", angle, distance, label, x, y);

	ctx.beginPath();
	ctx.arc(x, y, point_size, 0, 2 * Math.PI);
	ctx.fill();

	ctx.font = font_size;
	ctx.fillText(label,x + 10,y);
}

function addDots(ctx) {
  for (i = 0; i < num_points; i++) {
	  //console.log("Drawing dot ", i, i*36);
	  drawPoint(i, 1, i);
	}
}

function connectPoints(point1, point2) {
	toPoint = point2%num_points;
	x1 = getX(point1);
	y1 = getY(point1);
	x2 = getX(toPoint);
	y2 = getY(toPoint);

	//console.log("connectPoints: ", point1, point2, x1, y1, x2, y2);
	ctx.fillStyle = 'rgb(0, 0, 255)';
	ctx.lineWidth = 1;

  ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
	//ctx.beginPath();
  //ctx.arc(x1, y1, point_size*2, 0, 2 * Math.PI);
  //ctx.arc(x2, y2, point_size*2, 0, 2 * Math.PI);
  //ctx.fill();
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function updateValues() {
	getValues();
}

async function demo() {
	getValues();
	ctx.fillStyle = 'rgb(0, 0, 255)';
	ctx.beginPath();
	ctx.arc(300, 300, 250, degToRad(0), degToRad(360), false);
	ctx.stroke();

	addDots(ctx);

	for (m=0; m < iterations; m=m+increment) {
		console.log("Mult: ", m + mult);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (dot = 0; dot < num_points; dot++) {
			//console.log("connect points: ", dot, dot*mult);
			connectPoints(dot, dot*(m+mult));
			await sleep(delay_line);
		}
		await sleep(delay_iteration);

	}
}
