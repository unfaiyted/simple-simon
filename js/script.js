(function() {
"use strict";

var userArray = [];
var simonArray = [];
var currentRound = 0;
var roundActive = false;
var gameStart = false;
var lastRound  = 0;

$('.semi-circle').hover(function () {
    if(roundActive === true || gameStart === false) { $(this).addClass('light'); }
}, function () {
    if(roundActive === true || gameStart === false) {  $(this).removeClass('light'); }
});


$('.semi-circle').click(function () {

    $(this).removeClass('light');
    $(this).addClass('dark');
    $.playSound("se/button-press1.mp3");


    setTimeout(function() {
        $('.semi-circle').removeClass('dark');
    }, 150);

    if(roundActive === true) {
        userArray.push($(this).prop('id'));
    }

    if (userArray.length ===  simonArray.length && roundActive === true) {
        (userArray.toString() === simonArray.toString()) ? nextLevel() : gameOver() ;
    }

});


$('#addScore').click(function () {
    $(this).hide();
    //check if localstorage exists
    //if yes -> add entry
    var score = {
        initials: $('#initials').val(),
        score:  lastRound
    };

    if(localStorage.getItem('scores') === null) {
       localStorage.setItem('scores', JSON.stringify([score]));
    } else {
       var scores = JSON.parse(localStorage.getItem('scores'));
       scores.push(score);
       localStorage.setItem('scores', JSON.stringify(scores));

    }

    refreshScores();
    //if no create and add entry

});

// Starts game
$('#start-btn').click(function () {

    $('#start-btn').prop('disabled', true);
    $('#start-btn').css('background-color','red');
    gameStart = true;

    var timer = setInterval(function(){
        $('#cdTimer').removeClass('hide');
        $("#cdTimer").html(function(i,html){
            if(parseInt(html)>0)
            {

                if (parseInt(html) === 1) {
                    return "START";
                }
                return parseInt(html)-1;
            }
            else {

                $('#cdTimer').addClass('hide');
                clearTimeout(timer);
                nextLevel();

                // display random round user timer
                return "4";
            }
        });
    },1000);

});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// begin next round
function nextLevel() {

    $.playSound("se/round-up.mp3");

    currentRound++;
    roundActive = false;
    userArray = [];

    var intervalCount = 0;

    $('#simon-counter').text(currentRound);

    var timer = setInterval(function() {

        var randomInt = getRandomInt(1,4);
        if(intervalCount <= currentRound) {

            if(simonArray.length <= intervalCount) {
                switch (randomInt) {
                    case 1:
                        simonArray.push('red');
                        $('#red').addClass('light');
                        $.playSound("se/button-press1.mp3");

                        break;
                    case 2:
                        simonArray.push('green');
                        $('#green').addClass('light');
                        $.playSound("se/button-press1.mp3");
                        break;
                    case 3:
                        simonArray.push('blue');
                        $('#blue').addClass('light');
                        $.playSound("se/button-press1.mp3");
                        break;
                    case 4:
                        simonArray.push('yellow');
                        $('#yellow').addClass('light');
                        $.playSound("se/button-press1.mp3");
                        break;
                }
            } else {
                $('#' + simonArray[intervalCount]).addClass('light');
                $.playSound("se/button-press1.mp3");
            }


            var lightTimer = setTimeout(function() {
                $('.semi-circle').removeClass('light');
                clearTimeout(lightTimer);
            }, 400);

            intervalCount++;
        } else {
            roundActive = true;
            clearTimeout(timer);
        }
    }, 1250);

}

$('#retry').click(function () {
    $('#start-btn').prop('disabled', false);
    $('#start-btn').css('background-color','green');
    $('#simon-counter').text("0");
    $('#gameOver').addClass('hide');

});

function refreshScores() {


    if(localStorage.getItem('scores') !== null) {
        var data = JSON.parse(localStorage.getItem('scores'));

        console.log(data);

            data.sort(function (a, b) {
                return a.score < b.score ? 1 : -1;
            });

        $("tr:has(td)").remove();

        $.each(data, function (i, score) {

            if(i < 5) {
                $('<tr>').append(
                    $('<td>').text(score.initials),
                    $('<td>').text(score.score)
                ).appendTo('#scoresList');
            }

        });

    }

}

// reset game settings, display GAME OVER TEXT
// high score screen ?? eventually (local storage)
function gameOver() {

    refreshScores();

    $.playSound("se/fail.mp3");

    $('#addScore').show();
    $('#go-score').text($('#simon-counter').text());

    // resetting values
    roundActive = false;
    userArray = [];
    simonArray = [];
    lastRound = currentRound;
    currentRound = 0;
    gameStart = false;
    $('#gameOver').removeClass('hide');
};







})();