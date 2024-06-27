export class Explorer {

    constructor(){
        this.explorerEl = document.querySelector('#window-explorer');
        this.explorerEl.classList.add('open');
        console.dir(this.explorerEl);
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
}