import './process/sass/style.scss';

import me from './process/sass/images/me.jpg';
import { CardBoard } from "./process/js/myscript";
import { WorkCard } from "./process/js/work-info";

// Adds my picture to the first page
const mainHero = document.querySelector('#main-hero');
mainHero.src = me;



const dataUrl = 'https://gist.githubusercontent.com/arnaudcasame/18db83b6e6791c728bd992f70f1b7d4d/raw/3fb194126d259dbafd7721fc9344623f288b459b/portfolio.json'
fetch(dataUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        for (const project of data.projects) {
            new WorkCard('projects', project)
        }

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
    });
