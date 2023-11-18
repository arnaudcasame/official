import './process/sass/style.scss';

import me from './process/sass/images/me.jpg';
import { ToolsBoard } from "./process/js/myscript";
import { Certification } from "./process/js/certifications";
import { ProjectCard } from "./process/js/projects";

// Adds my picture to the first page
const mainHero = document.querySelector('#main-hero');
mainHero.src = me;



const dataUrl = 'https://gist.githubusercontent.com/arnaudcasame/18db83b6e6791c728bd992f70f1b7d4d/raw/767280f97db663f9b4f1a4453c827ab59987d586/portfolio.json'
fetch(dataUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        data.certs.sort((cert1, cert2) => Date.parse(cert1.date) - Date.parse(cert2.date));
        const numCerts = document.querySelector('#num-certs');
        numCerts.textContent = data.certs.length;
        for (const cert of data.certs) {
            new Certification('certs', cert)
        }

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
