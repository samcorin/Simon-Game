/**

User Story: As a user, I hear a sound that corresponds to each button both when the series of button presses plays, and when I personally press a button.

User Story: As a user, if I press the wrong button, I am notified that I have done so, and that series of button presses starts again to remind me of the pattern so I can try again.

User Story: As a user, I can see how many steps are in the current series of button presses.

Bonus User Story: As a user, if I want to restart, I can hit a button to do so, and the game will return to a single step.

Bonus User Story: As a user, I can play in strict mode where if I get a button press wrong, it notifies me that I have done so, and the game restarts at a new random series of button presses.

Bonus User Story: As a user, the tempo of the game speeds up incrementally on the 5th, 9th and 13th step.

Bonus User Story: As a user, I can win the game by getting a series of 20 steps correct. I am notified of my victory, then the game starts over.

 *
 */



$(document).ready(function() {


    var patterns = ['tl', 'tr', 'bl', 'br'],
    	game = [],
    	player = [],
    	player_moves = 0,
        i,
        running = true,
        timeout = 600;

    $('.buttons').addClass('unclickable');
    
    function rand() {
    	game.push(patterns[Math.floor(Math.random() * 4)]);
        return game;
    }

    // Button press animations
    $('.buttons').on('click', function() {

	    console.log("Game array: " + game);
	    console.log("player array: " + player);
	    
	    if(!running) {
		    player.push(this.id);
	    	player_moves++;
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
    	
	    	for(var move = 0; move < player_moves; move++) {
	    		if(game[move] == player[move]) {
	    			console.log('OK!');
	    			
	    			// All moves correct ? proceed
	    			if(move+1 == game.length) {
	    				setTimeout(function() {
	    					console.log("ALL CORRECT!!!!!");
		    				console.log("NEXT LEVEL!!!!!");
		    				$('.score').text('Level: ' + (move+1));
		    				$('.start').trigger('click');
		    			},600);
	    			}

	    		} else {
	    			console.log('START AGAIN FUCKER!');
		    		console.log('WRONG MOVE!');
		    		$('.score').text('Level: 1');
		    		game = [];
			    	player_moves = 0;
			    	setTimeout(function(){
		    			// $('.start').trigger('click');
		    			$('.buttons').addClass('unclickable');
		    		},1200);
		    	}
    	}
    }

    // Alternative: index()
    $('.buttons').on('click', function() {
    	var idx = $(this).index();
    	// returns DOM element
    	$('#'+idx)[0].play();
    })


    // Automatic animations
	$('.start').on('click', function() {
		// DISABLE PLAYER CLICK    
		player = [];
		running = true;
		$('.buttons').addClass('unclickable');
		$('.start').addClass('unclickable');

		// Pushes a random move to game array
		rand();

		// Counter is reset so the game replays the pattern from the beginning
		var counter = 0,
			// time increment
			i = 600;
		
		// Start a timed loop
		var timer = setInterval(function(){

			// Triggers 'click' for the correspoding button in the array
		    $('#'+game[counter]).trigger('click');
		    counter++;

		    // Once game array reaches the end, we stop the timer, re-enable player moves, set running to false
		    if(game[counter] == undefined){
		    	clearInterval(timer);
		    	// player_move(counter);
		    	
		    	// ENABLE PLAYER CLICK
		    	$('.buttons').removeClass('unclickable');
		    	player_moves = 0;
				running = false;
		    }
		}, i+=i);
	})
})
