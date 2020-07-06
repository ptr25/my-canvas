var database;
//var listen;
var drawing = [];
var currentPath = [];
var isDrawing = false;
var button;
function setup() {
    canvas = createCanvas(800,400);
    database = firebase.database();
    canvas.mousePressed(startPath);
   canvas.mouseReleased(endPath);
   canvas.parent('canvascontainer');
   var saveButton = select('#saveButton');
   saveButton.mousePressed(saveDrawing);
   button = createButton("clear");
  }
  function startPath(){
    isDrawing = true;
    currentPath = [];
    drawing.push(currentPath);
  }
  function endPath(){
    isDrawing = false;
  }
 function draw(){
   background(255);
   
   textFont("zapfino");
   fill(0)
   text("MY  CANVAS",50,50);
   button.position(50,427);
  if(isDrawing){
    var point = {
      x:mouseX,
      y:mouseY
    }
  currentPath.push(point);
  }
  
  strokeWeight(2);
  stroke('#fae');
  noFill();
  for(var i= 0;i<drawing.length;i++){
    var path = drawing[i];
    beginShape();
    for(var j= 0;j< path.length;j++){
     vertex(path[j].x,path[j].y);
  }
  //drawing is an array of paths n each path is an array of points
  endShape();
 button.mousePressed(()=>{
   noCanvas();
 })
}

 }
  function saveDrawing(){
    var ref = database.ref('drawings');
     ref.on("value",(data)=>{
      var drawings = data.val();
      var keys = Object.keys(drawings);
      for(var i = 0;i<keys.length;i++){
        var key = keys[i];
        //var li = createElement('li',key);
        //li.parent('drawinglist')
      }
     })
    var data={
      name: "pranathi",
      drawing: drawing
    }
  var info=  ref.push(data,dataSent);
  console.log(info.key);
    function dataSent(status){
      console.log(status);
    }
  }