song = "";

scoreLeftWrist = 0;
scoreRightWrist = 0;
leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY = 0;

function preload(){

    HarryPotter = loadSound("Harry Potter.mp3");
    HarryPotterRemix = loadSound("music.mp3");
    WarRobots = loadSound("War Robots.mp3");
    Christmas = loadSound("Christmas.mp3");
} 


function  setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)
}

function modelLoaded(){
    console.log("PoseNet Is Initialized !!");
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("FF0000");

if(scoreRightWrist > 0.2) {

    circle(rightWristX,rightWristY,20);

    if(rightWristY > 0 && rightWristY <= 100){

        document.getElementsById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }


     else if(rightWristY > 100 && rightWristY <= 200){

        document.getElementsById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }

    else if(rightWristY > 200 && rightWristY <= 300){

        document.getElementsById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }

    else if(rightWristY > 300 && rightWristY <= 400){

        document.getElementsById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }
    else if(rightWristY > 400 && rightWristY <= 500){

        document.getElementsById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }


}



    if(scoreLeftWrist > 0.2)
    {

        circle(leftWristX,leftWristY, 20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}



function play(){



    s_name = document.getElementById("song_name").value;

    if(s_name == "HarryPotter"){
        song = HarryPotter;
        song.play();

        HarryPotterRemix.stop();
        WarRobots.stop();
        Christmas.stop();

    }
    else if(s_name == "HarryPotterMix"){
        song = HarryPotterRemix;
        song.play();

        HarryPotter.stop();
        WarRobots.stop();
        Christmas.stop();
       
    }

    else if(s_name == "WarRobots"){
        song = WarRobots;
        song.play();

        HarryPotterRemix.stop();
        HarryPotter.stop();
        Christmas.stop();
    }

    else if(s_name == "Christmas"){
        song = Christmas;
        song.play();

        HarryPotterRemix.stop();
        HarryPotter.stop();
        WarRobots.stop();
    }

    song.setVolume(1);
    song.rate(1);

   
}

function stop(){

    HarryPotter.stop();
    HarryPotterRemix.stop();
    WarRobots.stop();
    Christmas.stop();
    

}

function pause(){

    song.pause();

}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        console.log("scoreRightWrist = " + scoreRightWrist);

    
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("LeftWristX = " + leftWristX + "LeftWristY = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("RightWristX = " + rightWristX + "RightWristY = " + rightWristY);
    }
}
