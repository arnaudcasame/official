import './process/sass/style.scss';

import me from './process/sass/images/me.jpg';
// import { Bio } from "./process/js/bio";
// import { ToolsBoard } from "./process/js/myscript";
// import { Certification } from "./process/js/certifications";
// import { ProjectCard } from "./process/js/projects";

// DeskTop
import { Desktop } from "./process/js/desktop";

// TaskBar
import { TaskBar } from "./process/js/task.bar";

import { Explorer } from "./process/js/explorer";

// Adds my picture to the first page
const mainHero = document.querySelector('#main-hero');
mainHero.src = me;

let explorer = null;

const dataUrl = 'https://gist.githubusercontent.com/arnaudcasame/18db83b6e6791c728bd992f70f1b7d4d/raw/90c3c791c023b9017a2517cdb6505ed093bded7a/portfolio.json'
fetch(dataUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        const desktop = new Desktop();
        const taskBar = new TaskBar();
        taskBar.addEventListener('itemClick', (event)=> {
            console.log(event.detail)
            switch(event.detail){
                case 'main-menu':
                    desktop.toggleMainMenu();
                    break;
                case 'window-explorer':
                    console.log(event.detail);
                    if (explorer) {
                        explorer.toggleExplorer();
                    } else {
                        explorer = new Explorer();
                    }
                    break;
                default:
                    console.log('Unknown button');
                    break;
            }
        });
    })
    .catch(function (error) {
        console.warn(error)
    });
