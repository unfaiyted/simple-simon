

var userArray = [];
var simonArray = []
var currentRound = 0;
var roundActive = false;

$('.semi-circle').hover(function () {
    $(this).addClass('light');
}, function () {
    $(this).removeClass('light');
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

    currentRound = 1;

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


// begin next round
function nextLevel() {

    $('#simon-counter').text(currentRound);

    var timer = setInterval(function() {



    })



}

// reset game settings, display GAME OVER TEXT
// high score screen ?? eventually (local storage)
function gameOver() {

}
