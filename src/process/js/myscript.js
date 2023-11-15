// $(".nav").localScroll();
const dataUrl = 'https://gist.githubusercontent.com/arnaudcasame/18db83b6e6791c728bd992f70f1b7d4d/raw/ce5101dbfea51f2f4dfdf6516a81539e96664963/portfolio.json'
const skills = document.querySelector('.skills-container');

fetch(dataUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        const board = new CardBoard(skills, data);
        skills.addEventListener('click', function (e) {
            board.animate();
        });

        skills.addEventListener('mouseenter', function(){
            board.scaleCards();
        })

        skills.addEventListener('mouseleave', function(){
            board.unscaleCards();
        })

    })
    .catch(function (error) {
        console.warn(error)
    })


class CardBoard {
    constructor(el, data){
        const num = document.querySelector('#num-skills');
        num.textContent = data.length;

        const fragment = document.createDocumentFragment();
        this.x = 10;
        this.y = 5;
        this.rotate = 0.1;
        this.vx = 2;
        this.vy = 1;
        this.cards = []
        const skills = [];

        for (const skill of data) {
            const skillE = document.createElement('div');
            skillE.setAttribute('class', 'skill');

            skillE.style['-webkit-transition'] = ".3s ease-in-out";
            skillE.style['-moz-transition'] = ".3s ease-in-out";
            skillE.style['-o-transition'] = ".3s ease-in-out";
            skillE.style['transition'] = ".3s ease-in-out";

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

            fragment.appendChild(skillE);
            skills.push(skillE)
        }
        el.appendChild(fragment);
        for (const skill of skills) {
            this.cards.push(new SkillCard(skill, this.x, this.y, this.vx, this.vy));
        }
    }

    animate() {
        for (const card of this.cards) {
            card.transform();
        }
        requestAnimationFrame(this.animate.bind(this))
    }

    scaleCards () {
        for (const card of this.cards) {
            card.scale(1.2, 1.2);
        }
    }

    unscaleCards() {
        for (const card of this.cards) {
            card.scale(1, 1);
        }
    }
}

class SkillCard {
    constructor(el, x, y, vx, vy){
        this.el = el;
        this.parent = el.parentElement;
        this.pPosition = this.getPosition(el.parentElement);
        this.position = this.getPosition(el);
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.rotate =  0.1;
    }

    moveHor(){
        this.position = this.getPosition(this.el);
        if (this.position.right > this.pPosition.right - 20) {
            this.vx = this.vx < 0 ? this.vx : -this.vx;
        } else if (this.position.left < this.pPosition.left + 20) {
            this.vx = this.vx < 0 ? -this.vx : this.vx;
        }
    }

    moveVer(){
        this.position = this.getPosition(this.el);
        if (this.position.top < this.pPosition.top + 20) {
            this.vy = this.vy < 0 ? -this.vy : this.vy;
        } else if (this.position.bottom > this.pPosition.bottom - 20) {
            this.vy = this.vy < 0 ? this.vy : -this.vy;
        }
    }

    transform(){
        this.el.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotate}turn)`;
        this.moveHor();
        this.moveVer();
        this.x += this.vx;
        this.y += this.vy;
        this.rotate += 0.01;
    }

    scale(x, y){
        this.el.style.transform = `scale(${x}, ${y})`;
    }

    /**
     * Returns the parent position
     * @param {HTMLElement} el 
     */
    getPosition(el) {
        return el ? el.getBoundingClientRect() : undefined;
    }
}