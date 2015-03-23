// Constants
const DEFFONT = "10 pt Courier New";
const SPC = 35;
const EDG = 5;
const SCREENW = 500;
const SCREENH = 500;
const WIDTH = 1000,		// Total width of LP12 simulator
    HEIGHT = 600;		// Total height of LP12 simulator
const BUTWIDTH = 100,	// Button width in pixels
    BUTHEIGHT = 20,		// Button height in pixels
	BUTRADIUS = (0.5 * BUTHEIGHT);
const BUTSPACE = 10,	// Vertical space between buttons.
	BUTNEXTV = BUTHEIGHT + BUTSPACE;	// NEXT Vertical for button row
const SCREENL = SPC + BUTWIDTH,	// Left most pixel of LP12 screen
    SCREENT = EDG,		// Top most pixel of LP12 screen
    SCREENB = SCREENT + SCREENH,	// Bottom most pixel of LP12 screen
    SCREENR = SCREENL + SCREENW;	// Right most pixel of LP12 screen
const BUTCOL1 = EDG,	// Column 1 of buttons left most pixel (to LEFT of screen)
    BUTCOL2 = SCREENR + SPC,		// Column 2 of buttons (to RIGHT of screen)
	BUTCOL2_5 = BUTCOL2 + (0.5 * BUTWIDTH),	// Column 2.5 of buttons (to RIGHT of screen)
    BUTCOL3 = BUTCOL2 + BUTWIDTH + SPC;	// Column 3 of buttons (to RIGHT of screen)

var canvas,
    ctx,
    keystate;
var buttons,
    waveforms,
    vitals;

var button = {
	x: null,
	y: null,
	r: BUTRADIUS,
	width: BUTWIDTH,
	height: BUTHEIGHT,
	hasLED: "False",
	LEDon: "False",
	color: "DimGray",
	textColor: "White",
	textFont: DEFFONT,
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
		if (this.color != "DimGray") {
			ctx.fill();
		} else {
			ctx.fillStyle = "Black";
			ctx.fill();
		}
		
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
var butAdvisory = Object.create(button);
var butAnalyze = Object.create(button);
var butLead = Object.create(button);
var butNibp = Object.create(button);
var butAlarms = Object.create(button);
var butOptions = Object.create(button);
var butEvent = Object.create(button);
// Column 2.5 buttons
var butSize = Object.create(button);
// Column 3 buttons
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
	but12Lead.setup(BUTCOL1, SCREENT+150, BUTRADIUS, BUTWIDTH, BUTHEIGHT, "False", "False", "DimGray", "White", DEFFONT, "12 LEAD", 28, 15);
	butTransmit.setup(BUTCOL1, SCREENT+175, BUTRADIUS, BUTWIDTH, BUTHEIGHT, "False", "False", "DimGray", "White", DEFFONT, "TRANSMIT", 24, 15);
	butCodeSummary.setup(BUTCOL1, SCREENT+200, BUTRADIUS, BUTWIDTH, BUTHEIGHT, "False", "False", "DimGray", "White", DEFFONT, "CODE SUMMARY", 10, 15);
	butPrint.setup(BUTCOL1, SCREENT+225, BUTRADIUS, BUTWIDTH, BUTHEIGHT, "False", "False", "DimGray", "White", DEFFONT, "PRINT", 34, 15);

	// Column 2 buttons
	butAdvisory.setup(BUTCOL2, SCREENT+35, BUTRADIUS, BUTWIDTH, BUTHEIGHT, "True", "False", "DimGray", "White", DEFFONT, "ADVISORY", 24, 15);
	butAnalyze.setup(BUTCOL2, SCREENT+60, BUTRADIUS, BUTWIDTH, BUTHEIGHT, "True", "False", "Gold", "Black", DEFFONT, "ANALYZE", 28, 15);
	butLead.setup(BUTCOL2, SCREENT+110, BUTRADIUS, 40, BUTHEIGHT, "False", "False", "DimGray", "White", DEFFONT, "LEAD", 8, 15);
	butNibp.setup(BUTCOL2, SCREENT+135, BUTRADIUS, BUTWIDTH, BUTHEIGHT, "True", "False", "DimGray", "White", DEFFONT, "NIBP", 38, 15);
	butAlarms.setup(BUTCOL2, SCREENT+160, BUTRADIUS, BUTWIDTH, BUTHEIGHT, "True", "False", "Gold", "Black", DEFFONT, "ALARMS", 30, 15);
	butOptions.setup(BUTCOL2, SCREENT+185, BUTRADIUS, BUTWIDTH, BUTHEIGHT, "False", "False", "DimGray", "White", DEFFONT, "OPTIONS", 28, 15);
	butEvent.setup(BUTCOL2, SCREENT+210, BUTRADIUS, BUTWIDTH, BUTHEIGHT, "True", "False", "DimGray", "White", DEFFONT, "EVENT", 36, 15);

	// Column 2 LED's
	// TODO


	// Column 2.5 buttons
	butSize.setup(BUTCOL2_5, SCREENT+110, BUTRADIUS, 40, BUTHEIGHT, "False", "False", "DimGray", "White", DEFFONT, "SIZE", 10, 15);

	// Column 3 buttons
	butOn.setup(BUTCOL3, SCREENT+10, BUTRADIUS, BUTWIDTH, BUTHEIGHT, "True", "False", "DarkGreen", "White", DEFFONT, "ON", 40, 15);
	butEnergySelect.setup(BUTCOL3, SCREENT+35, BUTRADIUS, BUTWIDTH, BUTHEIGHT, "False", "False", "DimGray", "White", DEFFONT, "\u25B2 ENG SLCT \u25BC", 14, 15);
	butCharge.setup(BUTCOL3, SCREENT+60, BUTRADIUS, BUTWIDTH, BUTHEIGHT, "False", "False", "Gold", "Black", DEFFONT, "CHARGE", 30, 15);
	butShock.setup(BUTCOL3, SCREENT+85, BUTRADIUS, BUTWIDTH, BUTHEIGHT, "True", "False", "Red", "White", DEFFONT, "SETUP", 34, 15);
	butSync.setup(BUTCOL3, SCREENT+110, BUTRADIUS, BUTWIDTH, BUTHEIGHT, "True", "False", "DimGray", "White", DEFFONT, "SYNC", 36, 15);
	butPacer.setup(BUTCOL3, SCREENT+135, BUTRADIUS, BUTWIDTH, BUTHEIGHT, "True", "False", "DimGray", "White", DEFFONT, "PACER", 34, 15);
	butRate.setup(BUTCOL3, SCREENT+160, BUTRADIUS, BUTWIDTH, BUTHEIGHT, "False", "False", "DimGray", "White", DEFFONT, "\u25B2 RATE \u25BC", 24, 15);
	butCurrent.setup(BUTCOL3, SCREENT+185, BUTRADIUS, BUTWIDTH, BUTHEIGHT, "False", "False", "DimGray", "White", DEFFONT, "\u25B2 CURRENT \u25BC", 16, 15);
	butPause.setup(BUTCOL3, SCREENT+210, BUTRADIUS, BUTWIDTH, BUTHEIGHT, "False", "False", "DimGray", "White", DEFFONT, "PAUSE", 34, 15);

}

function update() {
	
	// Backgrounds
	ctx.fillStyle = "DimGray";
	ctx.fillRect(BUTCOL3-5, SCREENT+33, 110, 75);
	ctx.fillStyle = "DarkOliveGreen";
	ctx.fillRect(BUTCOL3-5, SCREENT+133, 110, 100);
	ctx.fillStyle = "SteelBlue";
	ctx.fillRect(BUTCOL2-5, SCREENT+33, 110, 55);
	
	// Screen box
	ctx.strokeStyle = "Goldenrod";
	ctx.rect(SCREENL, SCREENT, SCREENR-SCREENL, SCREENB-SCREENT);
	//ctx.fillRect(50, 50, 100, 100);
	ctx.stroke();
	
	// Column 1 buttons
	but12Lead.update();
	butTransmit.update();
	butCodeSummary.update();
	butPrint.update();

	// Column 2 buttons
	butAdvisory.update();
	butAnalyze.update();
	butLead.update();
	butNibp.update();
	butAlarms.update();
	butOptions.update();
	butEvent.update();

	// Column 2 LED's
	
	// Column 2.5 buttons
	butSize.update();
	
	// Column 3 buttons
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

	// Column 1 buttons
	but12Lead.draw();
	butTransmit.draw();
	butCodeSummary.draw();
	butPrint.draw();

	// Column 2 buttons
	butAdvisory.draw();
	butAnalyze.draw();
	butLead.draw();
	butNibp.draw();
	butAlarms.draw();
	butOptions.draw();
	butEvent.draw();
	
	// Column 2 LED's
	
	// Column 2.5 Buttons
	butSize.draw();
	
	// Column 3 buttons
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
