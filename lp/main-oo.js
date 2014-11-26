var WIDTH=1000, HEIGHT=600;
var canvas, ctx, keystate;
var buttons, waveforms, vitals;


var button = {
	x: null,
	y: null,
	r: 10,
	width: 100,
	height: 20,
	hasLED: "False",
	LEDon: "False",
	color: "DimGray",
	textColor: "White",
	text: null,
	textX: 5,
	textY: 15,
	// TODO button activated status true/false ?  To show in a different color or highlight.
	
	setup: function(x, y, r, width, height, hasLED, LEDon, color, textColor, text, textX, textY) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.width = width;
		this.height = height;
		this.hasLED = hasLED;
		this.LEDon = LEDon;
		this.color = color;
		this.textColor = textColor;
		this.text = text;
		this.textX = textX;
		this.textY = textY;
	},
	
	update: function() {},
	
	draw: function() {
		ctx.save();
		ctx.fillStyle = this.color;
		ctx.strokeStyle = this.color;
		ctx.lineWidth = 1;
		//square rectangle: ctx.fillRect(this.x, this.y, this.width, this.height);
		if (this.width < 2 * this.r) this.r = this.width / 2;
		if (this.height < 2 * this.r) this.r = this.height / 2;
		ctx.beginPath();
		ctx.moveTo(this.x+this.r, this.y);
		ctx.arcTo(this.x+this.width, this.y, this.x+this.width, this.y+this.height, this.r);
		ctx.arcTo(this.x+this.width, this.y+this.height, this.x, this.y+this.height, this.r);
		ctx.arcTo(this.x, this.y+this.height, this.x, this.y, this.r);
		ctx.arcTo(this.x, this.y, this.x+this.width, this.y, this.r);
		ctx.closePath();
		ctx.stroke();
		// ctx.fill();
		
		ctx.font = '12pt Arial';
		ctx.fillStyle = 'DarkGoldenRod';
		ctx.fillText(this.text, this.x + this.textX, this.y + this.textY);
		
		ctx.restore();
	}
};

var but12Lead = Object.create(button);


waveform = {
	x: null,
	y: null,
	side: 20,
	
	update: function() {},
	draw: function() {
		ctx.fillRect(this.x, this.y, this.side, this.side);
	}
};

vital = {
	x: null,
	y: null,
	
	update: function() {},
	draw: function() {
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
};


function main() {
	canvas = document.createElement("canvas");
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	ctx = canvas.getContext("2d");
	document.body.appendChild(canvas);
	

	init();
	

	
	var loop = function() {
		update();
		draw();
		
		window.requestAnimationFrame(loop, canvas);
	};
	window.requestAnimationFrame(loop, canvas);
}

function init() {
	but12Lead.setup(25, 50, 10, 100, 20, "False", "False", "DimGray", "White", "12 Lead", 18, 15);

}

function update() {
	but12Lead.update();

}

function draw() {
	but12Lead.draw();
}

main();
