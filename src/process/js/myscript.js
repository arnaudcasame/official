// $(".nav").localScroll();






export class ToolsBoard {
    constructor(el, data){
        const num = document.querySelector('#num-tools');
        num.textContent = data.length;

        const fragment = document.createDocumentFragment();
        this.x = 10;
        this.y = 5;
        this.rotate = 0.1;
        this.vx = 2;
        this.vy = 1;
        this.cards = []
        const tools = [];

        for (const tool of data) {
            const toolE = document.createElement('div');
            toolE.setAttribute('class', 'tool');

            toolE.style['-webkit-transition'] = ".15s linear";
            toolE.style['-moz-transition'] = ".15s linear";
            toolE.style['-o-transition'] = ".15s linear";
            toolE.style['transition'] = ".15s linear";

            const toolH = document.createElement('div');
            toolH.setAttribute('class', 'tool-heading');
            toolE.appendChild(toolH);

            const toolD = document.createElement('div');
            toolD.setAttribute('class', 'tool-details');
            // toolE.appendChild(toolD);

            const img = document.createElement('img');
            img.setAttribute('src', tool.url);
            img.setAttribute('alt', tool.name);
            img.setAttribute('title', tool.name);
            toolH.appendChild(img);

            const h4 = document.createElement('h4');
            h4.innerText = tool.name;
            // toolD.appendChild(h4)

            fragment.appendChild(toolE);
            tools.push(toolE)
        }
        el.appendChild(fragment);

        this.cards = tools.map((tool, i)=> new ToolCard(tool, this.x, this.y, this.vx, this.vy, i))
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

    identifyCard(x, y){
        for (const card of this.cards) {
            if(card.isMyArea(x, y)){
                card.scale(0.8, 0.8);
            } else {
                card.scale(1.3, 1.3);
            }
            if(card.isMyNeighborhood(x, y)){
                card.scale(0.95, 0.95);
            }
        }
    }
}

export class ToolCard {
    constructor(el, x, y, vx, vy, id){
        this.el = el;
        this.parent = el.parentElement;
        this.pPosition = this.getPosition(el.parentElement);
        this.position = this.getPosition(el);
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.rotate =  0.1;
        this.id = id;
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

    isMyArea(x, y){
        const pos = this.getPosition(this.el);
        if(x > pos.left && x < pos.right && y > pos.top && y < pos.bottom){
            return true;
        }
        return false;
    }

    isMyNeighborhood(x, y){
        const pos = this.getPosition(this.el);
        // 
        if(((x + 90) > pos.left && (x + 90) < pos.right && (y + 90) > pos.top && (y + 90) < pos.bottom) || 
        ((x - 90) > pos.left && (x - 90) < pos.right && (y - 90) > pos.top && (y - 90) < pos.bottom) || 
        ((x - 90) > pos.left && (x - 90) < pos.right && y  > pos.top && y  < pos.bottom) ||
        ((x + 90) > pos.left && (x + 90) < pos.right && y  > pos.top && y  < pos.bottom) ||
        (x > pos.left && x < pos.right && (y + 90) > pos.top && (y + 90)  < pos.bottom) ||
        (x > pos.left && x < pos.right && (y - 90) > pos.top && (y - 90)  < pos.bottom) || 
        ((x + 90) > pos.left && (x + 90) < pos.right && (y - 90) > pos.top && (y - 90) < pos.bottom) || 
        ((x - 90) > pos.left && (x - 90) < pos.right && (y + 90) > pos.top && (y + 90) < pos.bottom)){
            return true;
        }
        return false;
    }
}