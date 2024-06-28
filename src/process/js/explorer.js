export class Explorer {

    constructor(){
        this.explorerEl = document.querySelector('#window-explorer');
        this.explorerEl.classList.add('open');
        console.dir(this.explorerEl);

        this.windowMoveHandler = this.onWindowMove.bind(this);
        this.mouseDownHandler = this.onMouseDown.bind(this);
        this.mouseUpHandler = this.onMouseUp.bind(this);

        this.header = this.explorerEl.children[0];
        this.startX = 0;
        this.startY = 0;
        this.header.addEventListener('mousedown', this.mouseDownHandler);
        this.header.addEventListener('touchstart', this.mouseDownHandler);
    }

    showExplorer() {
        this.explorerEl.classList.add('open');
    }

    hideExplorer() {
        this.explorerEl.classList.remove('open');
    }

    toggleExplorer() {
        this.explorerEl.classList.toggle('open');
    }

    onWindowMove(event){
        const newX = this.startX - event.clientX;
        const newY = this.startY - event.clientY;

        this.startX = event.clientX;
        this.startY = event.clientY;

        this.explorerEl.style.top = (this.explorerEl.offsetTop - newY) + 'px';
        this.explorerEl.style.left = (this.explorerEl.offsetLeft - newX) + 'px';
    }

    onMouseDown(event){
        this.startX = event.clientX;
        this.startY = event.clientY;

        document.addEventListener('mousemove', this.windowMoveHandler);
        document.addEventListener('touchmove', this.windowMoveHandler);

        document.addEventListener('mouseup', this.mouseUpHandler);
        document.addEventListener('touchend', this.mouseUpHandler);
    }

    onMouseUp(event){
        document.removeEventListener('mousemove', this.windowMoveHandler);
        document.removeEventListener('touchmove', this.windowMoveHandler);
    }
}