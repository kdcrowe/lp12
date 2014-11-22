var canvas = document.getElementById('canvas');
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
canvas.style.width = canvas.width + "px";
canvas.style.height = canvas.height + "px";

var ctx = canvas.getContext('2d');
// ctx.font = '18pt Arial';
// ctx.fillStyle = 'DarkGoldenRod';
// ctx.strokeStyle = 'DarkSlateGray';

// ctx.fillText("LifePak 12", 0, 20);
// ctx.strokeText("What does this text look like?", 30, 200);

// ctx.moveTo(0,50);
// ctx.lineTo(100,50);
// ctx.strokeStyle='DarkGoldenRod';
// ctx.stroke();

// ctx.fillStyle = 'DarkGoldenRod';
// ctx.fillRect(200,200,300,300);

var bpInt = 5;
var atemp, btemp;


Rectangle = function(x, y, w, h)
{
	if (x == null || y == null || w == null || h == null)
	{
		alert("You did not pass all required variables!");

		var errorMsg = "The following was not provided:";
		if (x == null)
			errorMsg += " 'x' ";
		if (y == null)
			errorMsg += " 'y' ";
			
		throw new Error(errorMsg);
	}

	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
		
	this.Contains = function(x, y)
	{
		if (x >= this.x && x <= this.x + this.width &&
			y >= this.y && y <= this.y + this.height)
			{
				return true;
			}
			else
				return false;
	};

	this.Intersects = function(shape)
	{
		var offset = 0;
		
		// deal with circles by getting radius
		if (shape.radius != null)
			offset = shape.radius;
		
		// check each corner of shape 1 against shape 2 to make sure
		// it's within the 'width' / 'height' of the other shape
		if (shape.x - offset >= this.x &&
			shape.x - offset <= this.x + this.width &&
			shape.y - offset >= this.y &&
			shape.y - offset <= this.y + this.height ||
			this.x >= shape.x - offset &&
			this.x <= shape.x - offset + shape.width &&
			this.y >= shape.y - offset &&
			this.y <= shape.y - offset + shape.height ||
			shape.x - offset + shape.width >= this.x &&
			shape.x - offset + shape.width <= this.x + this.width &&
			shape.y - offset >= this.y &&
			shape.y - offset <= this.y + this.height ||
			this.x + this.width >= shape.x - offset &&
			this.x + this.width <= shape.x - offset + shape.width &&
			this.y >= shape.y - offset &&
			this.y <= shape.y - offset + shape.height)
			{
				return true;
			}
			else
				return false;
	};
	
	this.Draw = function(ctx, color)
	{
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	};
	
};


Vector2 = function(x, y)
{
	this.x = 0;
	this.y = 0;
	
	if (x != null)
		this.x = x;
	if (y != null)
		this.y = y;
	
	this.previousX = 0;
	this.previousY = 0;
	
	this.Set = function(x, y) {
		if (x == null && y == null) {
			console.log("No 'x' or 'y' passed to Vector2 Set function");
		} else {
			this.previousX = this.x;
			this.previousY = this.y;
			if (x != null)
				this.x = x;
			if (y != null)
				this.y = y;
		}
	};

	
	this.Normalize = function()
	{
		var tmp = new Vector2(this.x, this.y);
		var mag = Math.sqrt((tmp.x * tmp.x) + tmp.y * tmp.y);

		tmp.x = tmp.x / mag;
		tmp.y = tmp.y / mag;
		
		return tmp;
	};
	
	
	this.Distance = function(vec2)
	{
		if (vec2 != null)
			return Math.sqrt(((vec2.x - this.x) * (vec2.x - this.x)) + ((this.y - vec2.y) * (this.y - vec2.y)));
		else
			return (Math.sqrt(((this.previousX - this.x) * (this.previousX - this.x)) + ((this.previousY - vec2.y) * (this.previousY - vec2.y))));
	};
};






// =======================================================
var rect = new Rectangle(15, 15, 50, 50);
var rect1 = new Rectangle(150, 15, 50, 50);
var rect2 = new Rectangle(80, 15, 50, 50);
var movement = -1;

/* setIntervalNULL(function()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	rect.Draw(ctx, "red");
	rect1.Draw(ctx, "green");
	rect2.Draw(ctx, "blue");
	
	// alert(rect.Contains(20, 20));  // makes an alert popup.
	
	rect2.x += movement;
	
	if (rect2.Intersects(rect) || rect2.Intersects(rect1))
		movement *= -1;


	//alert(rect.Intersects(rect2));
	
}, 33);
*/

setInterval(function()
{
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.font = '18pt Arial';
	ctx.fillStyle = 'DarkGoldenRod';
	ctx.strokeStyle = 'DarkGoldenRod';
	
	// Lines & boxes on screen
	ctx.fillRect(0, 0, canvas.width, 25);
	ctx.moveTo(120, 25);
	ctx.lineTo(120, canvas.height);
	ctx.stroke();
	
	// SpO2 box
	ctx.fillRect(0, 100, 120, 25);
	// NIBP box
	ctx.fillRect(0, 200, 120, 25);
	
	// Black text
	ctx.fillStyle = 'Black';
	ctx.fillText("HR", 0, 20);
	ctx.fillText("SpO2", 0, 120);
	ctx.fillText("NIBP", 0, 220);
	
	
	// Golden text
	ctx.fillStyle = 'DarkGoldenRod';
	// HR random value
	ctx.fillText(Math.floor( (Math.random() * 20) + 50), 10, 50);
	// SpO2 random value
	ctx.fillText(Math.floor((Math.random() * 5) + 95), 10, 150);

	// BP random value
	if (bpInt >= 5) {
		atemp = Math.floor((Math.random() * 10) + 120);
		btemp = Math.floor((Math.random() * 5) + 80);
		bpInt = 0;
	} else {
		bpInt++;
	}
	ctx.fillText(atemp, 10, 250);
	ctx.fillText("/", 50, 250);
	ctx.fillText(btemp, 60, 250);

}, 1000);



