import { GAME } from './Game.js';
import { Operations } from './Operations.js';

const ClientWebSocket = require('./client'); 
const NEWGAME = new GAME.game();
const STARTNEWGAME = document.getElementById("play");
const TRYNUMBER = document.getElementById('tryNumber');
const TRYNUMBER_INPUT = document.getElementById('tryNumberInput');
const DISPLAY1 = document.getElementById('display1');
const DISPLAY2 = document.getElementById('display2');
const DISPLAY3 = document.getElementById('display3');
const GORILA = document.getElementById('gorila');
const CHARACTER = document.getElementById('character');
const TITLE = document.getElementById('title');

const clientWebSocket = new ClientWebSocket();

let operation1 = new Operations();
let operation2 = new Operations();
let timeInterval = 5000;

let currentStep = 0;
let move;
let gorilaX = GORILA.getBoundingClientRect().x + GORILA.getBoundingClientRect().width / 2;
let characterX = CHARACTER.getBoundingClientRect().x + CHARACTER.getBoundingClientRect().width / 2;
let steps = 7;
let distance = characterX - gorilaX;
let stepSize = distance / steps;

STARTNEWGAME.addEventListener('click', () => {
    TITLE.innerHTML = "Good Luck";
    DISPLAY1.innerHTML = operation1.getNumber();
    DISPLAY2.innerHTML = operation2.getNumber();

    handleMoveStep();
});

    async function moveStep() {
        return new Promise((resolve, reject) => {
            move = setInterval(() => {
                if (currentStep < steps) {
                    generateNumbers();
                    gorila.style.transform = `translateX(${gorilaX + stepSize * currentStep}px)`;
                    currentStep++;
                } else {
                    reject(clearInterval(move));
                    lose();
                }
            }, timeInterval);
        });
    }

    async function changeInterval() {
        let userInput = parseInt(TRYNUMBER_INPUT.value);
        if (operation1.getNumber() + operation2.getNumber() === userInput) {
            NEWGAME.player.points += 1;
            DISPLAY3.innerHTML = NEWGAME.player.points;
            generateNumbers();
        } 
    }

    async function handleMoveStep() {
        while (currentStep < steps) {
            await moveStep();
        }
    }

    TRYNUMBER.addEventListener('click', async () => {
        await changeInterval(); 
    });

    async function generateNumbers() {
        try {
            const number1 = await clientWebSocket.sendMessage('generateNumber');
            DISPLAY1.innerHTML = number1;
            const number2 = await clientWebSocket.sendMessage('generateNumber');
            DISPLAY2.innerHTML = number2;
        } catch (error) {
            console.log('Error getting data server', error);
        }
    }

    function lose(){
        CHARACTER.style.transition = 'transform 1s'; 
        CHARACTER.style.transform = 'rotate(3600deg) translateY(-500px)';
        TITLE.innerHTML = '!!YOU LOSE!!';
    }

