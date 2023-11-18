import './process/sass/style.scss';

import me from './process/sass/images/me.jpg';
import { ToolsBoard } from "./process/js/myscript";
import { ProjectCard } from "./process/js/projects";

// Adds my picture to the first page
const mainHero = document.querySelector('#main-hero');
mainHero.src = me;



const dataUrl = 'https://gist.githubusercontent.com/arnaudcasame/18db83b6e6791c728bd992f70f1b7d4d/raw/91d40b9f35b10d0453223b2829a668bcb100269b/portfolio.json'
fetch(dataUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        for (const project of data.projects) {
            new ProjectCard('projects', project)
        }

        const skills = document.querySelector('.tools-container');
        const board = new ToolsBoard(skills, data.tools);
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
