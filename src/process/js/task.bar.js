export class TaskBar {
    constructor() {
        const centerTaskEl = document.querySelector('#center-task');
        const rightTaskEl = document.querySelector('#right-task');

        for (const item of centerTaskEl.children) {
            if(item.nodeName === 'BUTTON'){
                new TaskButton(item);
            }
        }

        for (const item of rightTaskEl.children) {
            if(item.nodeName === 'BUTTON'){
                new TaskButton(item);
            }
        }

    }
}

class TaskButton {
    constructor(element){
        element.addEventListener('click', (e)=>{
            console.log(element.classList)
        })
    }
}