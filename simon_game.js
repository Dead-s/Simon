
$(document).ready(() => {
    var colors = ["red", "blue", "yellow", "green"];
    var randomseq = [];
    var userSelectedcolors = [];
    var level = 0;
    $("#start").click(() => {
        $("#start").css({
            "visibility": "hidden"
        });
        nextSequence();
    });
    $(".btn").click((e) => {
        var userChosenColour = $(e.target).attr("id");
        console.log(userChosenColour);
        userSelectedcolors.push(userChosenColour);
        playAudio(userChosenColour);
        $(userChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        pressed(userChosenColour);
        check(userSelectedcolors.length - 1);
    });
    function nextSequence() {
        var random = Math.floor(Math.random() * 4);
        console.log(random);
        let audioforcolor = colors[random];
        $("#" + audioforcolor + "").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        playAudio(audioforcolor);
        randomseq.push(audioforcolor);

    }
    function playAudio(name) {
        var audio = new Audio(name + '.mp3');
        audio.play();
        console.log("outside : " + randomseq);
    }
    function check(userChoice) {
        let users = userSelectedcolors, random = randomseq, valid = false;

        console.log("random : " + randomseq);
        console.log("users color : " + userSelectedcolors);

        if (random[userChoice] === users[userChoice]) {
            if (users.length === random.length) {
                setTimeout(() => {
                    console.log("nextseq");
                    console.log("users color length : " + userSelectedcolors.length);
                    userSelectedcolors = [];
                    console.log("users color length after clear : " + userSelectedcolors.length);
                    nextSequence();
                }, 800);
            }
        } else {
            console.log("wrong");
            $("body").css("background-color", "red");
            setTimeout(() => {
                $("body").css("background-color", "#011F3F");
            }, 500);
            playAudio("wrong");
            $("#level-title").text("Game over !");
            $("#start").css("visibility", "visible").text("Restart");
        }
    }

    function pressed(currentColor) {
        $("#" + currentColor).addClass("pressed");
        setTimeout(function () {
            $("#" + currentColor).removeClass("pressed");
        }, 100);
    }
});
