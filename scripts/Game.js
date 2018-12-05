/**
 * Game MAIN
 *
 * @copyright: (C) 2016-2017 Kibble Games Inc in cooperation with Vancouver Film School.
 * All Rights Reserved.
 *
 * Based on an original work by XXXXXXXXXXXX.  All due credits to him for the
 * original concept and algorithms
 *
 * @author: Scott Henshaw
 * @link mailto:shenshaw@vfs.com
 * @version: 1.1.0
 * @summary: Framework Singleton Class to contain a web app
 *
 */
//const MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);

// Constants
const SECONDS_AS_MS = 1000;

class Game {

    constructor() {

    	let m = app.private.members( this, {

	    	lastTime: 0,

	    	theMap: null,
            theCharacter: null,
            theControls: null,
            theCamera: null
        });

	    let res = MOBILE ? 768 : 1024;
	    m.theMap =       new Map( 200 );
	    m.theCharacter = new Player( 15.3, -1.2, Math.PI * 0.3 );
	    m.theControls =  new Controls();
        m.theCamera =    new Camera( $('#display').get(0), res, 0.9 );
        
        // Some binding
        this._frame = this._frame.bind(this);

	    $('#start-button').on('click', ( event ) =>{
            $('#start-button').fadeOut( 1 * SECONDS_AS_MS );
	        $('#splash-screen').fadeOut( 3 * SECONDS_AS_MS );
            $('#game-area').fadeIn( 1 * SECONDS_AS_MS );
            $('#hud-overlay').fadeIn( 2 * SECONDS_AS_MS );
	    });
    }

    run() {
        let m = app.private.members( this );
        
		m.theMap.randomize();
        this._start( this._frame );
	}

	_start( callback ) {
        let m = app.private.members( this );
        
        // Fire it once
        window.requestAnimationFrame( callback );
    }

	_frame( time ) {
        let m = app.private.members( this );

        // Delta time
        let seconds = (time - m.lastTime) / SECONDS_AS_MS;
        m.lastTime = time;

        //$('#debug-area').html('Counting to a big number: ' + counter );
        this._update( seconds );
        this._render( seconds );

        window.requestAnimationFrame( this._frame );
    }

	_update( seconds ) {
        let m = app.private.members( this );

    	m.theCharacter.update( m.theControls.states, m.theMap, seconds );
	}

	_render( seconds ) {
	    let m = app.private.members( this );
		m.theCamera.render( m.theCharacter, m.theMap );
	}
}


$(document).ready( () => {

    let game = new Game();
    game.run();
});
