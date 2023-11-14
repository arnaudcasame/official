// $(".nav").localScroll();
const dataUrl = 'https://gist.githubusercontent.com/arnaudcasame/18db83b6e6791c728bd992f70f1b7d4d/raw/ce5101dbfea51f2f4dfdf6516a81539e96664963/portfolio.json'
fetch(dataUrl)
.then(function(response){
    return response.json();
})
.then(function(data){
    const skills = document.querySelector('.skills-container');
    const num = document.querySelector('#num-skills');
    num.innerText = data.length;
    
    for (const skill of data) {
        const skillE = document.createElement('div');
        skillE.setAttribute('class', 'skill');

        const skillH = document.createElement('div');
        skillH.setAttribute('class', 'skill-heading');
        skillE.appendChild(skillH);

        const skillD = document.createElement('div');
        skillD.setAttribute('class', 'skill-details');
        // skillE.appendChild(skillD);

        const img = document.createElement('img');
        img.setAttribute('src', skill.url);
        img.setAttribute('alt', skill.name);
        img.setAttribute('title', skill.name);
        skillH.appendChild(img);

        const h4 = document.createElement('h4');
        h4.innerText = skill.name;
        // skillD.appendChild(h4)

        skills.appendChild(skillE)
    }
})
.catch(function(error){
    console.warn(error)
})