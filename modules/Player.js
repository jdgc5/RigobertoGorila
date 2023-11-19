class Player {
    constructor() {
        this.restartPoints();
        this.restartLife();
    }

    getPoints() {
        return this.points;
    }

    getLife() {
        return this.life;
    }

    restartLife() {
        this.life = 7;
    }

    restartPoints() {
        this.points = 0;
    }
}

export { Player };