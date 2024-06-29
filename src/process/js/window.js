// Explorer
import { Explorer } from "./explorer";

export class OSWindow {

    constructor(){
        this.osWindow = document.querySelector('#os-window');
        this.osWindow.classList.add('open');

        this.windowMoveHandler = this.onWindowMove.bind(this);
        this.mouseDownHandler = this.onMouseDown.bind(this);
        this.mouseUpHandler = this.onMouseUp.bind(this);

        this.header = this.osWindow.children[0];
        this.startX = 0;
        this.startY = 0;
        this.header.addEventListener('mousedown', this.mouseDownHandler);
        this.header.addEventListener('touchstart', this.mouseDownHandler);


        console.dir(this.osWindow)
        this.explorer = new Explorer();
    }

    show() {
        this.osWindow.classList.add('open');
    }

    hide() {
        this.osWindow.classList.remove('open');
    }

    toggle() {
        this.osWindow.classList.toggle('open');;
    }

    onWindowMove(event){
        const newX = this.startX - event.clientX;
        const newY = this.startY - event.clientY;

        this.startX = event.clientX;
        this.startY = event.clientY;

        this.osWindow.style.top = (this.osWindow.offsetTop - newY) + 'px';
        this.osWindow.style.left = (this.osWindow.offsetLeft - newX) + 'px';
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