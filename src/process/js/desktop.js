export class Desktop extends EventTarget {

    constructor() {
        super();

        const icons = document.querySelector('#dsk-icons');
        this.mainMenu = document.querySelector('#dsk-main-menu');
        this.mainMenu.setAttribute('tabindex', -1);

        this.mainMenu.addEventListener('focus', (e)=>{
            console.log('On Main Menu Focus');
        },{ preventScroll: true });

        this.mainMenu.addEventListener('blur', (e)=>{
            const dataset = e.explicitOriginalTarget.dataset.name;
            if(!dataset || (dataset && !dataset.includes('main-menu'))){
                this.closeMainMenu();
            }
        });

        // console.dir(icons.children);
        // console.dir(this.mainMenu);
    }

    toggleMainMenu() {
        if(this.mainMenu.classList.toggle('open')){
            this.mainMenu.classList.add('open');
            this.mainMenu.focus();
        }
    }

    launchMainMenu(){
        this.mainMenu.classList.add('open');
        this.mainMenu.focus();
    }

    closeMainMenu(){
        this.mainMenu.classList.remove('open');
    }


}