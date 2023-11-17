import './process/sass/style.scss';

import me from './process/sass/images/me.jpg';
import { CardBoard } from "./process/js/myscript";
import {  } from "./process/js/work-info";



const dataUrl = 'https://gist.githubusercontent.com/arnaudcasame/18db83b6e6791c728bd992f70f1b7d4d/raw/dc4a6ee6b1f107efaa08e132f9c73a0a7d784d26/portfolio.json'
fetch(dataUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        const skills = document.querySelector('.skills-container');
        const board = new CardBoard(skills, data.tools);
        skills.addEventListener('click', function (e) {
            board.animate();
        });

        skills.addEventListener('mouseover', function(e){
            board.identifyCard(e.clientX, e.clientY);
        })

        // skills.addEventListener('mouseenter', function(e){})

        skills.addEventListener('mouseleave', function(e){
            board.unscaleCards();
        })

    })
    .catch(function (error) {
        console.warn(error)
    })

const mainHero = document.querySelector('#main-hero');

mainHero.src = me;