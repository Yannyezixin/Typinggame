$(document).ready( function()
{
    var width = screen.width - 100,
        height = screen.height - 200,
        code = 0,
        gameSpeed = 550;

    var $start = $('#start'),
        $timeUp = $('#timeUp'),
        $body = $('body'),
        $background = $('#Backgound'),
        $time = $('#time'),
        $score = $('#score'),
        $speed = $('#speed'),
        $gameSpeed = $('#gameSpeed');

    // the button site of start
    $start.css({
        "top" : (height/2) + 'px',
        "left" : (width/2) + 'px'
    });

    // Begin the game after click the start
    $('#start').click(function() {
        $(this).fadeOut('slow');
        $score.show();
        $time.show();
        $speed.show();
        getTimeChange();
        getLetter();
    });

    //restart the game
    $timeUp.click( function() {
        location.reload();
    });

    //Dealing the keyEvents and fadeout the bubble
    $(document).keydown(function (event) {
        var keyCode = event.keyCode;
        if ($time.html() > 0) {
            if($('.bubb'+keyCode).length == 0) {
                $time.html($time.html() - 1);
             } else {
			    $('.bubb'+keyCode).animate({
		            "top": height+"px","opacity" : 0
		        }, 200 );

		        $('.bubb'+keyCode).fadeOut('slow').hide( 'slow', function() {
		            code += 20;
		            $('#score').html(code);
		            $(this).remove();
                    // speed Up the game speed
                    if ($score.html() % 400 == 0 ) {
                        if (gameSpeed >= 300) {
                            gameSpeed -= 50;
                            number = parseInt($gameSpeed.html()) + 1;
                            $gameSpeed.html(number);
                        }
                    }
		        });

                    // add time
		            if ($score.html() % 60 == 0 && $score.html != 0) {
                        timeAdd = parseInt($time.html()) + 1;
		                $time.html( timeAdd );
		            }

            }
        }
    });

    // Generating a random alphabet between A-Z
    function getLetter()
    {
        var color = randomColor();
        // Generating a random number between 65-90 A-Z
        var k = Math.floor(Math.random() * ( 90 - 65 + 1 )) + 65;
        // charge the int to char
        var ch = String.fromCharCode(k);
        //  get the random site at the screen
        var top = Math.floor(Math.random() * height/6 ),
            left = Math.floor(Math.random() * width/2 ) + width/4,
            html = '<span class="bubb bubb'+ k +' " style="left:'+ left +'; top: '+ top +'; background-color: '+ color + '">'+ ch +'</span>' ;

        $body.append(html);
        slowdown(k);

        if($time.html() <= 0) {
            return;
        }
        setTimeout(getLetter,gameSpeed);
    }

    // make the bubble slowdown when it generated
    function slowdown(k) {
        $('.bubb' + k).animate({
            "top": height + "px","opacity" : 1
        },{
            duration:4000,
            queue:false,
            complete: function() {
		                 $('.bubb'+k).fadeOut('slow').hide('slow',function(){
		                      $(this).remove();
                         });
                      }
        });
    }

    // Count time
    function getTimeChange() {
        if ($time.html() <= 0) {
            $background.fadeIn('slow');
            $timeUp.fadeIn('slow');
            $timeUp.css({
                "top": (height/2)+'px',
                "left" : (width/2) - 50 +'px',
                "z-index": 100
            });
            return;
        }

        $time.html() - 1;
        $time.html($time.html() - 1);
        setTimeout(getTimeChange, 1000);
    }

    // Generating a random color
    function randomColor() {
        var color = '';
        var value = ['a', 'b', 'c', 'd', 'e', 'f', '1', '2', '3',
                     '4', '5', '6', '7', '8', '9', '0'];
        for (c = 0; c < 6; c++) {
            no = Math.floor( Math.random() * 15 );
            color += value[no];
        }
        return color;
    }

});
