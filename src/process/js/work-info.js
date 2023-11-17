export class WorkCard {
    constructor(el, data){
        const container = document.querySelector('.'+el);
        const workCard = document.createElement('div');
        workCard.setAttribute('class', 'work');

        const workWrapper = document.createElement('div');
        workWrapper.setAttribute('class', 'work-wrapper');

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

        workWrapper.appendChild(frame);
        workWrapper.appendChild(infos);

        workCard.appendChild(workWrapper);

        container.appendChild(workCard);
    }
}
