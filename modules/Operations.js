class Operations {


    constructor(){
        this.number = this.generateRandomNumber();
    }

    getNumber(){
        return this.number;
    }

    generateRandomNumber(){
        this.number = Math.round(Math.random() * 99);
        return this.number;
    }

}

export {Operations};