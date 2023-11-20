import { GAME } from './Game.js';
import { Operations } from './Operations.js';

const NEWGAME = new GAME.game();
const STARTNEWGAME = document.getElementById("play");
const TRYNUMBER = document.getElementById('tryNumber');
const TRYNUMBER_INPUT = document.getElementById('tryNumberInput');
const DISPLAY1= document.getElementById('display1');
const DISPLAY2= document.getElementById('display2');
const DISPLAY3= document.getElementById('display3');
const GORILA = document.getElementById('gorila');
const CHARACTER = document.getElementById('character');
const TITLE = document.getElementById('title')
let operation1 = new Operations();
let operation2 = new Operations();
var time = 5000;

STARTNEWGAME.addEventListener('click', () => {
    
    TITLE.innerHTML = "Good Luck"
    DISPLAY1.innerHTML = operation1.getNumber();
    DISPLAY2.innerHTML = operation2.getNumber();
    let gorilaX = GORILA.getBoundingClientRect().x + GORILA.getBoundingClientRect().width / 2;
    let characterX = CHARACTER.getBoundingClientRect().x + CHARACTER.getBoundingClientRect().width / 2;
    let steps = 7; 
    let distance = characterX - gorilaX;
    let stepSize = distance / steps;
    let currentStep = 0;

    setTimeout(function moveStep() {
        time = 5000;
        if (currentStep < steps) {
            generateNumbers();
            gorila.style.transform = `translateX(${gorilaX + stepSize * currentStep}px)`;
            currentStep++;
            setTimeout(moveStep, time); 
        } else if (currentStep === steps) {
            CHARACTER.style.transition = 'transform 1s'; 
            CHARACTER.style.transform = 'rotate(3600deg) translateY(-500px)';
            setTimeout(() =>{
                TITLE.innerHTML = '!!YOU LOSE!!'
            }, 500);
        }
    }, time); 
    
});

TRYNUMBER.addEventListener('click', () => {
    
    let userInput = parseInt(TRYNUMBER_INPUT.value);
    
    if (operation1.getNumber() + operation2.getNumber() == userInput){
        NEWGAME.player.points += 1; 
        DISPLAY3.innerHTML = NEWGAME.player.points;
        generateNumbers();
        time +=1000;
    } else {
        time -=2000;
        //no logro conseguir el efecto deseado
    }
});

function generateNumbers(){
    operation1.generateRandomNumber();
    DISPLAY1.innerHTML = operation1.getNumber();
    operation2.generateRandomNumber();
    DISPLAY2.innerHTML = operation2.getNumber();
}