var countdown_audio = new Audio('assets/audio/countdown.wav');
var wrong_audio = new Audio('assets/audio/wrong.wav');
var end_streak_audio = new Audio('assets/audio/end_streak.wav');
var timeLeft = 30;
var correct = 0;
var incorrect = 0;
var current_note;
var precount_time = 3;
var notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

$('#streak_play').click(function() {
    countdown_audio.play();
    precount_time = 3;
    precount();
    pretimer = setInterval(precount, 1000);
    $('#streak_play').addClass('d-none');
    $('#streak_viewer').addClass('d-none');
});

$('#streak_end').click(function() {
    end_streak(0);
});

$('#piano').click(function(e) {
    if(!$('#piano').hasClass('disable_piano')) {
    var piano_note = $(e.target).data('note');
    if(current_note == piano_note) {
        correct++;
        $('.correct').html("correct: " + correct);
        gen_note();
    } else {
        wrong_audio.play();
        incorrect++;
        $('.incorrect').html("Incorrect: " + incorrect);

        if(incorrect >= 3) {
            end_streak(1);
        }
    }
    }
});

function gen_note() {
    current_note = notes[rand_num(0, 11)];
    $('.current_note').html(current_note);
}

function precount() {
    $('.precount').removeClass('d-none').html(precount_time);
    $('.streak_notice').addClass('d-none');
    $('.correct').addClass('d-none');
    $('.incorrect').addClass('d-none');
    precount_time--;
    if(precount_time == -1) {
        $('.precount').empty().addClass('d-none');
        clearTimeout(pretimer);
        $('#streak_viewer').removeClass('d-none');
        $('#streak_end').removeClass('d-none');
        timeLeft = 30;
        countdown();
        timerId = setInterval(countdown, 1000);
        $('.correct').html("Correct: 0");
        $('.incorrect').html("Incorrect: 0");
        $('#piano').removeClass('disable_piano');
        correct = 0;
        incorrect = 0;
        gen_note();
    }
}

function end_streak(id) {

    clearTimeout(timerId);
    $('#streak_end').addClass('d-none');
    $('#streak_play').removeClass('d-none');
    $('.streak_notice').removeClass('d-none');
    $('#piano').addClass('disable_piano');
    $('.timer').empty();
    $('.current_note').html('');
    current_note = null;
    correct = 0;
    incorrect = 0;

    if(id == 1) {
        end_streak_audio.play();
        $('.correct').removeClass('d-none');
        $('.incorrect').removeClass('d-none');
    }
}

function countdown() {
    if(timeLeft == -1) {
        end_streak(1);
    } else {
        if(timeLeft < 10) {
            time_secs = "0" + timeLeft;
        } else {
            time_secs = timeLeft;
        }
        $('.timer').html("00:" +time_secs);
        timeLeft--;
    }
}

function rand_num(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}