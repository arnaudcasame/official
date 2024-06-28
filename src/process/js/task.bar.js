export class TaskBar extends EventTarget {
    constructor() {
        super();
        const centerTaskEl = document.querySelector('#center-task');
        const rightTaskEl = document.querySelector('#right-task');

        for (const item of centerTaskEl.children) {
            if(item.nodeName === 'BUTTON'){
                item.addEventListener('click', (e)=>{
                    e.preventDefault();
                    this.emitItemClick(item.dataset.name);
                },{ preventScroll: true });

                item.addEventListener('focus', (e)=>{

                },{ preventScroll: true });
            }
        }

        for (const item of rightTaskEl.children) {
            if(item.nodeName === 'BUTTON'){
                item.addEventListener('click', (e)=>{
                    this.emitItemClick(item.dataset.name);
                });
            }
        }

    }

    emitItemClick(btnName){
        this.dispatchEvent(new CustomEvent('itemClick', { detail: btnName}))
    }
}
