$(document).ready( function()
{
   // var keycode = event.keyCode;
    var width = screen.width - 100;
    var height = screen.height - 200;
    var code = 0;
    var time = $('#time').html();

    $('#start').css(
    {
        "top" : (height/2) + 'px',
        "left" : (width/2) + 'px'
    });

    // Begin th game after click the start
    $('#start').click( function()
    {
        $(this).fadeOut('slow');
        $('#score').show();
        $('#time').show();
        getTimeChange();
        getLetter();
    });

    //restart the game
    $('#timeUp').click( function() {
        location.reload();
    });

    //Dealing the keyEvents and fadeout the bubble
    $(document).keydown( function(event)
    {
        var keyCode = event.keyCode;
        if(time != 0 ) {

            if($('.bubb'+keyCode).length == 0) {
                $('#time').html(time - 1);
             } else {

			    $('.bubb'+keyCode).animate(
		        {
		            "top": height+"px","opacity" : 0
		        },'slow');

		        $('.bubb'+keyCode).fadeOut('slow').hide('slow',function(){
		            code += 20;
		            $('#score').html(code);
		            $(this).remove();
		        });

		        if ($('#score').html() % 40 == 0 && ('#score').html != 0){
		            $('#time').html(time+1);
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
        var top = Math.floor(Math.random() * height );
        var left = Math.floor(Math.random() * width );
        $('body').append('<span class="bubb bubb'+ k +' " style="left:'+ left +'; top: '+ top +'; background-color: '+ color + '">'+ ch +'</span>');
        if(time == 0) return;
        setTimeout(getLetter,400);
    }
    function getTimeChange()
    {
        if (time == 0) {
            $('#Backgound').fadeIn('slow');
            $('#timeUp').fadeIn('slow');
            $('#timeUp').css(
            {
                "top": (height/2)+'px',
                "left" : (width/2) - 50 +'px',
                "z-index": 100
            });
            return;
        }
        time = $('#time').html() -1;
        $('#time').html(time);
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
