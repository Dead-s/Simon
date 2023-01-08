var colors = ["red", "blue", "yellow", "green"];
var randomseq = [];
var userSelectedcolors = [];
var level = 0;
var taps = 0;
$(document).ready(() => {
    $("#start").click(() => {
        $("#start").css({
            "visibility": "hidden"
        });
        $(".mode-div").css("visibility", "hidden");
        nextSequence();
    });

    $(".btn").click((e) => {
        var userChosenColour = $(e.target).attr("id");
//        console.log(userChosenColour);
        userSelectedcolors.push(userChosenColour);
        playAudio(userChosenColour);
        $(userChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        pressed(userChosenColour);
        taps--;
        $("#taps-count").text("Taps remaining : " + taps);
        check(userSelectedcolors.length - 1);

    });

    function nextSequence() {
        level++;
        taps = level;
        $("#level-title").text("Level " + level);
        var random = Math.floor(Math.random() * 4);
        $(".btn").css("pointer-events", "none");
        $("#taps-count").text("Wait for your turn!");
        let audioforcolor = colors[random];
        randomseq.push(audioforcolor);
        if ($("#easy-mode").prop('checked') === true) {
//            alert("Easy mode!");
            randomseq.forEach((color, index) => {
                setTimeout(() => {
                    $("#" + color + "").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
                    playAudio(color);
                    if (index === randomseq.length - 1) {
                        $("#taps-count").text("Your turn!");
                        setTimeout(() => {
                            $(".btn").css("pointer-events", "auto");
                            $("#taps-count").text("Taps remaining : " + taps);
                        }, 1000);
                    }
                }, (index + 1) * 600);
            });
        }
        if ($("#hard-mode").prop('checked') === true) {
//            alert("Hard mode!");
            $("#" + audioforcolor + "").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
            playAudio(audioforcolor);
            $("#taps-count").text("Your turn!");
            setTimeout(() => {
                $(".btn").css("pointer-events", "auto");
                $("#taps-count").text("Taps remaining : " + taps);
            }, 1000);
        }
    }

    function playAudio(name) {
        var audio = new Audio(name + '.mp3');
        audio.play();
    }

    function check(userChoice) {
        let users = userSelectedcolors, random = randomseq, valid = false;
//        console.log("random : " + randomseq);
//        console.log("users color : " + userSelectedcolors);

        if (random[userChoice] === users[userChoice]) {
            if (users.length === random.length) {
                setTimeout(() => {
                    // console.log("nextseq");
                    // console.log("users color length : " + userSelectedcolors.length);
                    userSelectedcolors = [];
                    // console.log("users color length after clear : " + userSelectedcolors.length);
                    nextSequence();
                }, 800);
            }
        } else {
            $("body").css("background-color", "red");
            setTimeout(() => {
                $("body").css("background-color", "#011F3F");
            }, 500);
            playAudio("wrong");
            $("#level-title").text("Game over !");
            $("#start").css("visibility", "visible").text("Restart");
            $(".mode-div").css("visibility", "visible");
            $("#taps-count").text(";-;");
            level = 0;
            randomseq = [];
            userSelectedcolors = [];
        }
    }

    function pressed(currentColor) {
        $("#" + currentColor).addClass("pressed");
        setTimeout(function () {
            $("#" + currentColor).removeClass("pressed");
        }, 100);
    }
});
