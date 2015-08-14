var canvas;
var canvasContext;
var canvasW;
var canvasH;

var waveLength;//длина волны в нанометрах, красный
var Int0 = 0.25;//начальная интенсивность -> прозрачность
var Int = 0;//текущая интенсивность пикселя
var posX1, posX2, posY1, posY2;//позиция источников света

function draw(){	
	var temp = document.getElementById('wave').value || 17.00;
	waveLength = parseFloat(temp);
	var temp = document.getElementById('posX1').value || 200;
	posX1 = parseFloat(temp);
	var temp = document.getElementById('posY1').value || 250;
	posY1 = parseFloat(temp);
	var temp = document.getElementById('posX2').value || 298;
	posX2 = parseFloat(temp);
	var temp = document.getElementById('posY2').value || 250;
	posY2 = parseFloat(temp);

	canvas = document.getElementById('canvas');
	canvasContext = canvas.getContext('2d');	
	canvasW = canvas.width;
	canvasH = canvas.height;
	canvasContext.fillStyle = 'black';
	canvasContext.fillRect(0,0, canvasW, canvasH);	
	drawEverything();	
}

function drawEverything() {	
	for (var i = 0; i < canvasW; i++) {	
		for (var j = 0; j < canvasH; j++) {			
			//рисуем два источника света
			canvasContext.fillStyle = 'rgba(250, 0, 0, 1)';
			canvasContext.fillRect(posX1, posY1, 2, 2);	
			canvasContext.fillRect(posX2, posY2, 2, 2);

			//расстояние от источников света до текущей точки
			var r1 = Math.sqrt(Math.pow(i - posX1, 2) + Math.pow(j - posY1, 2));
			var r2 = Math.sqrt(Math.pow(i - posX2, 2) + Math.pow(j - posY2, 2));
			var dr = r2 - r1;//разность хода
			var k = 2 * Math.PI / waveLength; //волновое число
			Int = 2 * Int0 * (1 + Math.cos(k * dr));
			drawPixel(i, j, Int);							
		}
	}
}

function drawPixel(i, j, Int) {
	canvasContext.fillStyle = 'rgba(255, 0, 0,' + Int + ')';
	canvasContext.fillRect(i, j, 1, 1);
}