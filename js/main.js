var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
var width = canvas.scrollWidth;
var height = canvas.scrollHeight;
var points = 25;
var yourFunction = "x^2";
drawFunction(yourFunction);
var zoomInButton = document.getElementById("zoomIn");
var zoomOutButton = document.getElementById("zoomOut");
var changes;

function drawAxes(){
 context.beginPath();
 context.moveTo(width/2, 0);
 context.lineTo(width/2, height);
 context.stroke();
 context.closePath();
 context.moveTo(0, height/2);
 context.lineTo(width, height/2);
 context.stroke();
 context.closePath();
 for(i=0;i<width;i+=(500/points/2)){
  context.beginPath();
  context.moveTo(i, height/2-5);
  context.lineTo(i, height/2+5);
  context.stroke();
  context.closePath();
 }
 for(i=0;i<height;i+=(500/points/2)){
  context.beginPath();
  context.moveTo(width/2-5, i);
  context.lineTo(width/2+5, i);
  context.stroke();
  context.closePath();
 }
}

function getFunction(){
 yourFunction = prompt("Please enter a function: ", yourFunction);
 if(yourFunction != null){
  context.clearRect(0,0, width, height);
  drawAxes();
  drawFunction(yourFunction);
 }
}

function drawFunction(fofx){
 fofx = fixFunction(fofx);
 for(x = -points; x < points; x += (points/1000)){
  var y = eval(fofx);
  var realX = (500/points/2)*(x+points);
  var realY = height-((500/points/2)*(y+points));
  context.fillRect(realX, realY, 2, 2);
 }
}

function zoomIn(){
 if(points>1){
  points -= 1;
  context.clearRect(0,0, width, height);
  drawAxes();
  drawFunction(yourFunction);
 }
}

function zoomOut(){
 points += 1;
 context.clearRect(0,0, width, height);
 drawAxes();
 drawFunction(yourFunction);
}

function fixFunction(functionString) {
  functionString = functionString.replace(/[^a-z+\-*^=0-9\(\)/]/g,"");
  changes = [
    ["^","**"],
    ["sin(","Math.sin("],
    ["cos(","Math.cos("],
    ["tan(","Math.tan("],
    ["abs(","Math.abs("],
    ["sqrt(","Math.sqrt("]
  ];
  changes.forEach(function(change) {
    functionString = functionString.replace(change[0],change[1]);
  });
  return functionString
}
