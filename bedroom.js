status = "";
bedroom_image = "";
objects = [];

function preload(){
    bedroom_image = loadImage("bedroom.jpg");
}

function setup(){
    canvas = createCanvas(640,350);
    canvas.position(315,200);
    object_detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true
    object_detector.detect(bedroom_image,gotResults);
}

function gotResults(results,error){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(bedroom_image,0,0,640,350);
    if(status !=""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("Status").innerHTML = "Status: Objects Detected";

            fill("#");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x - 800, objects[i].y - 520);
            noFill();
            stroke("");
            rect(objects[i].x  - 800, objects[i].y - 520 , objects[i].width - 910, objects[i].height - 200);
        }
    }
}