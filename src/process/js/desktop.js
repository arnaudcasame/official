export class Desktop extends EventTarget {

    constructor() {
        super();

        const icons = document.querySelector('#dsk-icons');
        this.mainMenu = document.querySelector('#dsk-main-menu');

        console.dir(icons.children);
    }

    toggleMainMenu() {
        this.mainMenu.classList.toggle('open');
    }
}