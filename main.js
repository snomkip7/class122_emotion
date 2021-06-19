link_in_progress = "https://teachablemachine.withgoogle.com/models/_pV30nOzj/";

camera = document.getElementById("camera");

Webcam.attach(camera);

function take_snapshot(){
    Webcam.snap(function(data_uri){
       document.getElementById("result").innerHTML = '<img src="'+data_uri+'" id="captured_image"/>'
    })
}

console.log('ml5 version', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Lm0wUNzGu/model.json', modelLoaded);

function modelLoaded(){
    console.log("Model loaded!");
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}
prediction1 = "";
prediction2 = "";
function gotResult(error, results){
    if(error){
        console.error(error);
        console.log("failed :(");
    }
    else{
        console.log(results);
        console.log("success!!!");
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        if(results[0].label == "Happy"){
            document.getElementById("update_emoji").innerHTML = "&#128512;";
        }
        if(results[0].label == "sad"){
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }
        if(results[0].label == "angry"){
            document.getElementById("update_emoji").innerHTML = "&#128548;";
        }
        if(results[0].label == "suprised"){
            document.getElementById("update_emoji").innerHTML = "&#128562;";
        }
        if(results[0].label == "confused"){
            document.getElementById("update_emoji").innerHTML = "&#128533;";
        }
        if(results[0].label == "crying"){
            document.getElementById("update_emoji").innerHTML = "&#128557;";
        }
        //second one
        if(results[1].label == "Happy"){
            document.getElementById("update_emoji2").innerHTML = "&#128512;";
        }
        if(results[1].label == "sad"){
            document.getElementById("update_emoji2").innerHTML = "&#128532;";
        }
        if(results[1].label == "angry"){
            document.getElementById("update_emoji2").innerHTML = "&#128548;";
        }
        if(results[1].label == "suprised"){
            document.getElementById("update_emoji2").innerHTML = "&#128562;";
        }
        if(results[1].label == "confused"){
            document.getElementById("update_emoji2").innerHTML = "&#128533;";
        }
        if(results[1].label == "crying"){
            document.getElementById("update_emoji2").innerHTML = "&#128557;";
        }
    }
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "the first prediction is" + prediction1;
    speak_data_2 = ", the second prediction is" + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

examples = ["&#128562;  suprised", "&#128533;  confused", "&#128557;  crying"]