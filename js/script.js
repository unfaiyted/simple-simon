

var userArray = [];
var simonArray = [];
var currentRound = 0;
var roundActive = false;

$('.semi-circle').hover(function () {
    if(roundActive === true) { $(this).addClass('light'); }
}, function () {
    if(roundActive === true) {  $(this).removeClass('light'); }
});


$('.semi-circle').click(function () {


    $(this).removeClass('light');
    $(this).addClass('dark');

    setTimeout(function() {
        $('.semi-circle').removeClass('dark');
    }, 150);


    if(roundActive === true) {
        userArray.push($(this).prop('id'));
    }

    if (userArray.length ===  simonArray.length && roundActive === true) {
        console.log('compare arrays');

        (userArray.toString() === simonArray.toString()) ? nextLevel() : gameOver() ;
    }

});

// Starts game
$('#start-btn').click(function () {

    $('#start-btn').prop('disabled', true);
    $('#start-btn').css('background-color','red');

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

    currentRound++;
    roundActive = false;
    userArray = [];

    var intervalCount = 0;

    $('#simon-counter').text(currentRound);

    var timer = setInterval(function() {

        var randomInt = getRandomInt(1,4);
        if(intervalCount <= currentRound) {

            if(simonArray.length < intervalCount) {
                switch (randomInt) {
                    case 1:
                        simonArray.push('red');
                        $('#red').addClass('light');

                        break;
                    case 2:
                        simonArray.push('green');
                        $('#green').addClass('light');
                        break;
                    case 3:
                        simonArray.push('blue');
                        $('#blue').addClass('light');
                        break;
                    case 4:
                        simonArray.push('yellow');
                        $('#yellow').addClass('light');
                        break;
                }
            } else {
                $('#' + simonArray[intervalCount]).addClass('light');
            }

            setTimeout(function() {
                $('.semi-circle').removeClass('light');
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
    $('#simon-counter').text("0")
    $('#gameOver').addClass('hide');

});

// reset game settings, display GAME OVER TEXT
// high score screen ?? eventually (local storage)
function gameOver() {

    $('#go-score').text($('#simon-counter').text());


    roundActive = false;
    userArray = [];
    simonArray = [];
    currentRound = 0;
    $('#gameOver').removeClass('hide');
}



