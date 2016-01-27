$(document).ready(function() {

    var patterns = ['tl', 'tr', 'bl', 'br'],
        game = [],
        player = [],
        player_moves = 0,
        i,
        counter,
        running = true,
        repeat = false;
        timeout = 600,
        hiscore = 0,
        lives = 1;

    $('.buttons').addClass('unclickable');
    $('.r').text('High Score: ' + hiscore);

    function rand() {
        game.push(patterns[Math.floor(Math.random() * 4)]);
        return game;
    }

    function restart() {
        $('.score').text('Level: 1');
        game = [];
        lives = 1;
        timeout = 600;
        player_moves = 0;
        counter = 0;
        setTimeout(function() {
            $('.buttons').addClass('unclickable');
        }, 1200);
        $('.start').removeClass('unclickable').trigger('click');
        // $('.start').trigger('click');
    }

    $('.restart').on('click', function() {
    	restart();
    });

    // Button press animations
    $('.buttons').on('click', function() {
        
    	// Audio
    	var idx = $(this).index();
        // returns DOM element
        $('#' + idx)[0].play();


        if (!running) {
            player.push(this.id);
            player_moves++;
            $('.progress').text(player_moves + ' / ' + game.length);
            player_move();
        }

        // Lights
        var btn = $(this);
        btn.toggleClass("light");
        var timer2 = setTimeout(function() {
            btn.toggleClass("light");
            clearTimeout(timer2);
        }, timeout);

    });

    // Players turn
    function player_move() {
        console.log("Game array: " + game);
        console.log("player array: " + player);

        for (var move = 0; move < player_moves; move++) {
            if (game[move] == player[move]) {
                console.log('OK!');
                if(move+1 > hiscore) {
                	hiscore = move+1;
                	$('.r').text('High Score: ' + hiscore);
                }

                if (move == 19) {
                    setTimeout(function() {
                        alert('Congratulations! You beat the game!');
                    }, 500);
                    restart();
                }

                // All moves correct ? proceed
                if (move + 1 == game.length) {
                    setTimeout(function() {
                        console.log("ALL CORRECT!!!!!");
                        console.log("NEXT LEVEL!!!!!");
                        $('.score').text('Level: ' + (move + 1));
                        $('.start').trigger('click');
                    }, 600);
                }

            } else {
            	// replay the pattern, player has one more chance
            	if(lives == 1) {
            		lives = 0;
            		alert("last chance");
	                player_moves = 0;
	                // Is there a way to tie this to running? Don't think so
	                repeat = true;
	                setTimeout(function() {
	                	$('.start').trigger('click');
	                },500);
            	} else {
            		// GAME OVER
	                setTimeout(function() {
	                    alert('Time to rethink your strategy.');
	                }, 500);
	                restart();
            	}
            }
        }
    }

    // Automatic animations
    $('.start').on('click', function() {

        // DISABLE PLAYER CLICK    
        player = [];
        running = true;
        $('.buttons').addClass('unclickable');
        $('.start').addClass('unclickable');

        // Pushes a random move to game array
        // Done like this to allow a repeat of a pattern without pushing a new item to the array
        if(!repeat) {
        	rand();
        }
        
        repeat = false;

    	$('.progress').text('0 / ' + game.length);

        // Counter is reset so the game replays the pattern from the beginning
        counter = 0;
        i = 600;

        // Start a timed loop
	    var timer = setInterval(function() {
	        // Triggers 'click' for the correspoding button in the array
	        $('#' + game[counter]).trigger('click');
	        counter++;
	        if(game.length >= 12) {
	        	timeout = 400;
	        	i = 400;
	        } else if(game.length >= 8) {
	        	timeout = 250;
	        	i = 250;
	        } else if(game.length >= 4) {
	        	timeout = 100;
	        	i = 100;
	        }

	        // Once game array reaches the end, we stop the timer, re-enable player moves, set running to false
	        if (game[counter] == undefined) {
	            clearInterval(timer);
	            $('.buttons').removeClass('unclickable');
	            player_moves = 0;
	            running = false;
	        }
	    }, i += i);

    })
})
