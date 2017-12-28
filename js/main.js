var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
//It is more appropriate to use the canvas.height and canvas.width attributes, because they exist and were made for this purpose.
var width = canvas.width;
var height = canvas.height;
var points = 25;
var yourFunction = "x^2";
drawFunction(javascriptify(yourFunction));
//This array, funcArray, holds the individual tokens. Notice that I am not using a string, because some tokens (like 'sqrt(') do not have the same length as other tokens. (like 'x')
var funcArray = ["x","^","2"];

function drawAxes(){
 context.beginPath();
 context.moveTo(width/2, 0);
 context.lineTo(width/2, height);
 context.stroke();
 context.moveTo(0, height/2);
 context.lineTo(width, height/2);
 context.stroke();
 for(i=0;i<width;i+=(500/points/2)){
  context.moveTo(i, height/2-5);
  context.lineTo(i, height/2+5);
  context.stroke();
 }
 for(i=0;i<height;i+=(500/points/2)){
  context.moveTo(width/2-5, i);
  context.lineTo(width/2+5, i);
  context.stroke();
 }
}

function drawFunction(fofx){
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

function addToFunction(token) {
 // if the token given is not the token we have designated to be "backspace".
  if (token != "<-") {
   //add the token to the end of the array.
    funcArray[funcArray.length] = token;
   //Add the token to the display. A span is pretty much the same as a div, but with the CSS attribute 'display' set to 'inline-block' by default instead of 'block'. Note that we are setting the ID to be the length of the array.
    document.getElementById('functionDisplay').innerHTML += '<span id="'+funcArray.length+'">'+token+'</span>';
   //Array.join() takes all of the elements in an array and separates them with the argument passed. In this case, we want nothing between each token, so we pass it the empty string.
    yourFunction = javascriptify(funcArray.join(''));
    //Redraw canvas.
    context.clearRect(0,0, width, height);
    drawAxes();
    drawFunction(yourFunction);
  }
  else {
   //remove the element that has an ID of the length of the array, which is basically the last character entered.
    document.getElementById(funcArray.length).remove();
   //Remove the last element (token) from the array.
    funcArray.pop()
   //explained before.
    yourFunction = javascriptify(funcArray.join(''));
    context.clearRect(0,0, width, height);
    drawAxes();
    drawFunction(yourFunction);
  }
}

//when the page loads, create the buttons. I didn't want to create each button by hand, so I have a function that does it for me. 
window.onload = function() {
 //add stuff to this array to add more functions.
  var buttons = ["1","2","3","4","5","6","7","8","9","0","x",".","+","-","*","/","^","(",")","abs(","sqrt(","sin(","cos(","tan(","<-"];
 //For each element in th array 'buttons'...
  buttons.forEach(function(buttonName) {
   //...create a button element...
    var button = document.createElement("BUTTON");
   //...if it is a number...
   if (buttons.indexOf(buttonName) <= 10) {
      //...add it to the numberButtons div...
     document.getElementById('numberButtons').appendChild(button);
   }
   else {
    //...otherwise, add it to the functionButtons div...
    document.getElementById('functionButtons').appendChild(button);
   }
   //...make the button execute the "addToFunction()" function when it is clicked, passing the token to the function...
    button.setAttribute("onclick","addToFunction('"+buttonName+"')");
   //...set its inner text to the button name (the token) 
    button.innerText = buttonName;
   //... and set the class of the button.
    button.setAttribute("class","functionButtonData");
  });
 //initialize the functionDisplay div.
  var i = 0;
  funcArray.forEach(function(funcArrayItem) {
    i++
    document.getElementById('functionDisplay').innerHTML += "<span id=\""+i+"\">"+funcArrayItem+"</span>";
  });
}

//basically the 'fixFunction' function from last revision, but I changed the name and removed the security thing. 
function javascriptify(functionString) {
  changes = [
    ["^","**"],
    ["sin(","Math.sin("],
    ["cos(","Math.cos("],
    ["tan(","Math.tan("],
    ["abs(","Math.abs("],
    ["sqrt(","Math.sqrt("],
  ];
  changes.forEach(function(change) {
    functionString = functionString.replace(change[0],change[1]);
  });
 //this replaces 2x with 2*x, where 2 can be any # from 0 to 9. Cleverly, this also works with things like 10x.
  functionString = functionString.replace(/([0-9])x/g,"$1*x");
  return functionString
}
