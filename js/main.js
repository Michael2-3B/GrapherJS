var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
var width = canvas.scrollWidth;
var height = canvas.scrollHeight;

function drawAxes(){
 context.beginPath();
 context.moveTo(width/2, 0);
 context.lineTo(width/2, height);
 context.stroke();
 context.moveTo(0, height/2);
 context.lineTo(width, height/2);
 context.stroke();
 for(i=0;i<width;i+=10){
  context.moveTo(i, height/2-5);
  context.lineTo(i, height/2+5);
  context.stroke();
 }
 for(i=0;i<height;i+=10){
  context.moveTo(width/2-5, i);
  context.lineTo(width/2+5, i);
  context.stroke();
 }
}

function getFunction(){
 var yourFunction = prompt("Please enter a function: ");
 if(yourFunction != null){
  context.clearRect(0,0, width, height);
  drawAxes();
  drawFunction(yourFunction);
 }
}

function drawFunction(fofx){
 for(x=-25;x<25;x+=0.1){
  var y = eval(fofx);
  var realX = 10*(x+25);
  var realY = height-(10*(y+25));
  context.fillRect(realX, realY, 2, 2);
 }
}
