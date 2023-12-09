export class Certification {
    constructor(el, data){
        const certs = document.querySelector('.'+el);

        const cert = document.createElement('div');
        cert.setAttribute('class', 'cert');

        if(!data.school.includes('University') && !data.school.includes('Grass')){
            const img = document.createElement('img');
            img.setAttribute('src', data.url);
            cert.appendChild(img);
        }else{
            cert.style.backgroundImage = `url(${data.url})`;
            cert.style.backgroundRepeat = 'no-repeat';
            cert.style.backgroundSize = 'cover';
        }
        
        this.timeStamp = Date.parse(data.date);

        certs.appendChild(cert);

        cert.addEventListener('click', function(e){

            if(!navigator.userAgent.includes('iPhone') && !navigator.userAgent.includes('Android')){
                const modalContainer = document.createElement('div');
                modalContainer.setAttribute('class', 'modal-container');
    
                certs.parentElement.appendChild(modalContainer);
    
                const frame = document.createElement('div');
                frame.setAttribute('class', 'modal-frame');
    
                const header = document.createElement('div');
                header.setAttribute('class', 'frame-header');
                
                const title = document.createElement('h3');
                title.textContent = data.school;
                header.appendChild(title);
    
                const closeIcon = document.createElement('i');
                closeIcon.setAttribute('class', 'fa fa-window-close close-btn');
                header.appendChild(closeIcon);
    
    
                frame.appendChild(header);
                
                const body = document.createElement('div');
                body.setAttribute('class', 'frame-body');
                frame.appendChild(body);
    
                
                const image = document.createElement('img');
                image.setAttribute('class', 'cert-img');
                image.setAttribute('src', data.url);
    
                const imgContainer = document.createElement('div');
                imgContainer.appendChild(image);
                body.appendChild(imgContainer)
    
                modalContainer.appendChild(frame);
    
                closeIcon.addEventListener('click', function(){
                    certs.parentElement.removeChild(modalContainer);
                });
            }
        });
    }

    getTimeStamp(){
        return this.timeStamp;
    }
}