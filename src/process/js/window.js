// Explorer
import { Explorer } from "./explorer";

export class OSWindow {

    constructor(id){
        this.osWindow = document.querySelector(id);
        this.osWindow.classList.add('open');

        this.btns = this.osWindow.querySelectorAll('.win-btn');

        for(const btn of this.btns){
            const winBtn = new WindowButton(btn);

            winBtn.addEventListener('winBtnClick', (e)=>{
                console.log(id, winBtn);
                switch(e.detail){
                    case 'min':
                        this.hide();
                        break;
                    case 'max':
                        this.restore();
                        break;
                    case 'med':
                        this.maximize();
                        break;
                    case 'close':
                        this.osWindow.parentElement.removeChild(this.osWindow);
                        break;
                }
            })
        }

        this.windowMoveHandler = this.onWindowMove.bind(this);
        this.mouseDownHandler = this.onMouseDown.bind(this);
        this.mouseUpHandler = this.onMouseUp.bind(this);

        this.header = this.osWindow.children[0];
        this.startX = 0;
        this.startY = 0;
        this.header.addEventListener('mousedown', this.mouseDownHandler);
        this.header.addEventListener('touchstart', this.mouseDownHandler);


        // console.dir(this.btns);
        this.explorer = new Explorer();
    }

    show() {
        this.osWindow.classList.add('open');
    }

    hide() {
        this.osWindow.classList.remove('open');
    }

    toggle() {
        this.osWindow.classList.toggle('open');
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

    restore() {
        this.osWindow.style.width = '70%';
        this.osWindow.style.height = '80%';
        this.osWindow.style.left = 'calc(50% - 35%)';
        this.osWindow.style.bottom = 'calc(50% - 40%)';
        this.osWindow.style.top = 'calc(50% - 40%)';
        this.osWindow.style.borderRadius = '8px';
    }

    maximize() {
        this.osWindow.style.width = '100%';
        this.osWindow.style.height = '100%';
        this.osWindow.style.left = 0;
        this.osWindow.style.bottom = 0;
        this.osWindow.style.top = 0;
        this.osWindow.style.borderRadius = 0;
    }

}


class WindowButton extends EventTarget {
    /**
     * 
     * @param {HTMLButtonElement} button 
     */
    constructor(button) {
        super();
        button.addEventListener('click', (e)=>{
            
            let button = e.target;
            if(button.tagName === 'I'){
                button = e.target.parentElement
            }

            const icon = button.firstElementChild;

            if(button.dataset.name === 'max'){
                icon.classList.replace('fa-window-maximize', 'fa-window-restore');
                button.setAttribute('data-name', 'med');
            }else if(button.dataset.name === 'med'){
                icon.classList.replace('fa-window-restore', 'fa-window-maximize');
                button.setAttribute('data-name', 'max');
            }


            this.emitWindowBtnClick(button.dataset.name);

        }, true);
    }

    emitWindowBtnClick(name){
        this.dispatchEvent(new CustomEvent('winBtnClick', { detail: name}));
    }


}