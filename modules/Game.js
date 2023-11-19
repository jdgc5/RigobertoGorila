import { Player } from "./Player.js";

var GAME = GAME || {};
GAME.game = class {

    constructor () {

        this.player = new Player();
    }


    playRestartGame() {
        
        this.player.restartLife();
        this.player.restartPoints();
    }

}

export { GAME };