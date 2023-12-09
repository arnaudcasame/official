export class Bio {
    constructor(el, data){
        const bio = document.querySelector('#'+el);
        const container = document.createElement('article');

        const title = document.createElement('h1');
        title.textContent = data.header.title;
        
        container.appendChild(title);

        for (const paragraph of data.body) {
            const p = document.createElement('p');
            p.textContent = paragraph.paragraph;
            container.appendChild(p);
        }

        const arrow = document.createElement('p');
        
        arrow.setAttribute('class', 'nav down');

        const link = document.createElement('a');
        link.setAttribute('href', '#my-projects');
        link.innerHTML = `<i class="fa fa-angle-down"></i>`;

        arrow.appendChild(link);

        
        bio.appendChild(container)
        bio.appendChild(arrow);
    }
}