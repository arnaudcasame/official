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
    }

    getTimeStamp(){
        return this.timeStamp;
    }
}