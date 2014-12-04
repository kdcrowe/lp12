var WIDTH=1000, HEIGHT=600;
var SCREENL=100, SCREENT=0, SCREENB=500, SCREENR=700;
var BUTCOL1=10, BUTCOL2=SCREENR+10, BUTCOL3=SCREENR+120;
var BUTNEXTV=25;
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
	
	setup: function(x, y, r, width, height, hasLED, LEDon, color, textColor, textFont, text, textX, textY) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.width = width;
		this.height = height;
		this.hasLED = hasLED;
		this.LEDon = LEDon;
		this.color = color;
		this.textColor = textColor;
		this.textFont = textFont
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
		if (this.color != "DimGray")
			ctx.fill();
		
		ctx.font = this.textFont;
		ctx.fillStyle = this.textColor;
		ctx.fillText(this.text, this.x + this.textX, this.y + this.textY);
		
		ctx.restore();
	}
};

// Column 1 buttons
var but12Lead = Object.create(button);
var butTransmit = Object.create(button);
var butCodeSummary = Object.create(button);
var butPrint = Object.create(button);
//Column 2 buttons
//Column 3 buttons
var butOn = Object.create(button);
var butEnergySelect = Object.create(button);
var butCharge = Object.create(button);
var butShock = Object.create(button);
var butSync = Object.create(button);
var butPacer = Object.create(button);
var butRate = Object.create(button);
var butCurrent = Object.create(button);
var butPause = Object.create(button);


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

	// button draw function:
	// function(x, y, r, width, height, hasLED, LEDon, color, textColor, textFont text, textX, textY)

	// Column 1 buttons
	but12Lead.setup(BUTCOL1, SCREENT+400, 10, 100, 20, "False", "False", "DimGray", "White", "12pt Ariel", "12 Lead", 18, 15);
	butTransmit.setup(BUTCOL1, SCREENT+425, 10, 100, 20, "False", "False", "DimGray", "White", "12pt Ariel", "Transmit", 18, 15);
	butCodeSummary.setup(BUTCOL1, SCREENT+450, 10, 100, 20, "False", "False", "DimGray", "White", "11pt Ariel", "Code Summary", 5, 15);
	butPrint.setup(BUTCOL1, SCREENT+475, 10, 100, 20, "False", "False", "DimGray", "White", "12pt Ariel", "Print", 34, 15);

	// Column 2 buttons

	
	// Column 3 buttons
	butOn.setup(BUTCOL3, SCREENT+10, 10, 100, 20, "True", "False", "DarkGreen", "White", "12pt Ariel", "ON", 18, 15);
	butEnergySelect.setup(BUTCOL3, SCREENT+35, 10, 100, 20, "False", "False", "DimGray", "White", "11pt Ariel", "Energy Select", 18, 15);
	butCharge.setup(BUTCOL3, SCREENT+60, 10, 100, 20, "False", "False", "Gold", "Black", "12pt Ariel", "Charge", 18, 15);
	butShock.setup(BUTCOL3, SCREENT+85, 10, 100, 20, "True", "False", "Red", "White", "12pt Ariel", "Setup", 18, 15);
	butSync.setup(BUTCOL3, SCREENT+110, 10, 100, 20, "True", "False", "DimGray", "White", "12pt Ariel", "Sync", 18, 15);
	butPacer.setup(BUTCOL3, SCREENT+135, 10, 100, 20, "True", "False", "DimGray", "White", "12pt Ariel", "Pacer", 18, 15);
	butRate.setup(BUTCOL3, SCREENT+160, 10, 100, 20, "False", "False", "DimGray", "White", "12pt Ariel", "Rate", 18, 15);
	butCurrent.setup(BUTCOL3, SCREENT+185, 10, 100, 20, "False", "False", "DimGray", "White", "12pt Ariel", "Current", 18, 15);
	butPause.setup(BUTCOL3, SCREENT+210, 10, 100, 20, "False", "False", "DimGray", "White", "12pt Ariel", "Pause", 18, 15);

}

function update() {
	but12Lead.update();
	butTransmit.update();
	butCodeSummary.update();
	butPrint.update();

	butOn.update();
	butEnergySelect.update();
	butCharge.update();
	butShock.update();
	butSync.update();
	butPacer.update();
	butRate.update();
	butCurrent.update();
	butPause.update();

}

function draw() {
	but12Lead.draw();
	butTransmit.draw();
	butCodeSummary.draw();
	butPrint.draw();

	butOn.draw();
	butEnergySelect.draw();
	butCharge.draw();
	butShock.draw();
	butSync.draw();
	butPacer.draw();
	butRate.draw();
	butCurrent.draw();
	butPause.draw();
}

main();
