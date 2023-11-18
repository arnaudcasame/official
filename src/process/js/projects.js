export class ProjectCard {
    constructor(el, data){
        const container = document.querySelector('.'+el);
        const projectCard = document.createElement('div');
        projectCard.setAttribute('class', 'project');

        const projectWrapper = document.createElement('div');
        projectWrapper.setAttribute('class', 'project-wrapper');

        const frame = document.createElement('iframe');
        frame.setAttribute("src", data.address);

        const infos = document.createElement('div');
        infos.setAttribute('class', 'info');

        for (const info of data.tools) {
            const img = document.createElement('img');
            img.setAttribute('src', info.url);
            img.setAttribute('title', info.name);
            infos.appendChild(img);
        }

        projectWrapper.appendChild(frame);
        projectWrapper.appendChild(infos);

        projectCard.appendChild(projectWrapper);

        container.appendChild(projectCard);
    }
}
