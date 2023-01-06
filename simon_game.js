/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(() => {
//    var colors = ["red", "blue", "yellow", "green"];
//    var randomseq = [];
//    var userSelectedcolors = [];
//    $("#start").click(() => {
//        $("#start").fadeToggle(300);
//        nextSequence();
//    });
//    $(".btn").click((e) => {
//        var userChosenColour = $(e.target).attr("id");
//        console.log(userChosenColour);
//        userSelectedcolors.push(userChosenColour);
//        playAudio(userChosenColour);
//        $(userChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
//        check();
////        if ($(e.target).hasClass("red")) {
////            userSelectedcolors.push("red");
////            playAudio("red");
//////            if (userSelectedcolors.length === randomseq.length) {
////            check();
//////            }
////        }
////        if ($(e.target).hasClass("green")) {
////            userSelectedcolors.push("green");
////            playAudio("green");
//////            if (userSelectedcolors.length === randomseq.length) {
////            check();
//////            }
////        }
////        if ($(e.target).hasClass("blue")) {
////            userSelectedcolors.push("blue");
////            playAudio("blue");
//////            if (userSelectedcolors.length === randomseq.length) {
////            check();
//////            }
////        }
////        if ($(e.target).hasClass("yellow")) {
////            userSelectedcolors.push("yellow");
////            playAudio("yellow");
//////            if (userSelectedcolors.length === randomseq.length) {
////            check();
//////            }
////        }
//    });
//    function nextSequence() {
//        var random = Math.floor(Math.random() * 4);
//        console.log(random);
//        let audioforcolor = colors[random];
//        $("#" + audioforcolor + "").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
//        playAudio(audioforcolor);
////        var randomChoosencolor = nextSequence();
//        randomseq.push(audioforcolor);
////        return audioforcolor;
//
//    }
//    function playAudio(name) {
//        var audio = new Audio(name + '.mp3');
////        audio.autoplay = true;
//        audio.play();
//        console.log("outside : " + randomseq);
//    }
//    function check() {
//        let users = userSelectedcolors, random = randomseq, valid = false;
//
//        console.log("random : " + randomseq);
//        console.log("users color : " + userSelectedcolors);
//
//        if (users.length === random.length) {
////            for (var i = 0; i < users.length; i++) {
////                if (users[i] === random[i]) {
//            if (users === random) {
//                valid = true;
//            } else {
//                valid = false;
//            }
////            }
//            console.log("valid = " + valid);
//            if (valid === true) {
//                console.log("correct");
//                setTimeout(() => {
//                    console.log("nextseq");
//                    console.log("users color length : " + userSelectedcolors.length);
//                    userSelectedcolors = [];
//                    console.log("users color length after clear : " + userSelectedcolors.length);
//                    nextSequence();
//                }, 800);
//            }
//            if (valid === false) {
//                console.log("wrong");
//                $("body").css("background-color", "red");
//                $("body").css("background-color", "#011F3F");
//                playAudio("wrong");
//            }
//        }
//    }
    var buttonColours = ["red", "blue", "green", "yellow"];

    var gamePattern = [];
    var userClickedPattern = [];

    var started = false;
    var level = 0;

    $("#start").click(function () {
        if (!started) {
            $("#level-title").text("Level " + level);
            $("#start").fadeToggle(300);
            nextSequence();
            started = true;
        }
    });

    $(".btn").click(function () {

        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);

        playSound(userChosenColour);
        animatePress(userChosenColour);

        checkAnswer(userClickedPattern.length - 1);
    });

    function checkAnswer(currentLevel) {

        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            if (userClickedPattern.length === gamePattern.length) {
                setTimeout(function () {
                    nextSequence();
                }, 1000);
            }
        } else {
            playSound("wrong");
            $("body").addClass("game-over");
            $("#level-title").text("Game Over !");
            $("#start").text("Restart").fadeToggle(300);

            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);

            startOver();
        }
    }


    function nextSequence() {
        userClickedPattern = [];
        level++;
        $("#level-title").text("Level " + level);
        var randomNumber = Math.floor(Math.random() * 4);
        var randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);
//        randomChosenColour.forEach((index) => {
//            setTimeout(() => {
                $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
                playSound(randomChosenColour);
//                activateTile(color);
//            }, (index + 1) * 600);
//        });

    }

    function animatePress(currentColor) {
        $("#" + currentColor).addClass("pressed");
        setTimeout(function () {
            $("#" + currentColor).removeClass("pressed");
        }, 100);
    }

    function playSound(name) {
        var audio = new Audio(name + ".mp3");
        audio.play();
    }

    function startOver() {
        level = 0;
        gamePattern = [];
        started = false;
    }
});

    