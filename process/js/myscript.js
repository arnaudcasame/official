// $(".nav").localScroll();



var over = document.querySelector('#overall');
var bio = document.querySelector('#bio');

// window.onscroll = function(){
// 	if(this.pageYOffset >= 20 && this.pageYOffset < this.innerHeight){
// 		this.scrollY(this.innerHeight);
// 		console.log('Presentation', this.pageYOffset);
// 	}else if((this.pageYOffset >= this.innerHeight + 20)){
// 		this.scrollY(this.innerHeight * 2);
// 		console.log('myWork', this.pageYOffset);
// 	}else if(this.pageYOffset >= this.innerHeight * 2){
// 		this.scrollY(this.innerHeight * 3);
// 		console.log('Contact', this.pageYOffset);
// 	}
// 	// console.dir(over.offsetTop);
// 	// console.dir(bio.offsetTop);
// 	//console.dir(this.pageYOffset);
// };

function getDistance(wide){
	var raison = 40;
	while((wide%raison)!==0){
		raison++;
	}
	return raison;
}

var sections = document.querySelectorAll('section');
var scrollY = 0;
var distance = 40;
var speed = window.innerHeight / distance;
var bigHeight = null; 
var portPosition = window.innerHeight * 2;
var overallPosition = 0;
var bioPosition = window.innerHeight;
var currentY = null;
var animator = null;

function autoScrollTo(el){
	currentY = window.pageYOffset; //0	
	//console.dir(el);
	animator = setTimeout(function(){
		autoScrollTo(el);
	}, 24);
	if(el.id === 'bio'){
		distance = 40;
		scrollY = currentY+distance;
		window.scrollTo(0, scrollY);
		if(scrollY >= portPosition){
			clearTimeout(animator);
			console.log('window Height', window.innerHeight);
			console.log('pageYOffset', window.pageYOffset);
			return;
		}
	}else if(el.id === "portfolio"){
		distance = - 40;
		scrollY = currentY+distance;
		window.scrollTo(0, scrollY);
		if(scrollY <= overallPosition){
			clearTimeout(animator);
			console.log('window Height', window.innerHeight);
			console.log('pageYOffset', window.pageYOffset);
			return;
		}
	}else if(el.id === 'overall'){
		bigHeight = window.innerHeight;
		distance = 40;
		scrollY = currentY+distance;
		window.scrollTo(0, scrollY);
		if(scrollY >= bioPosition){
			clearTimeout(animator);
			return;
		}
	}
}

for(var i=0; i<sections.length; i++){
	sections[i].addEventListener('click', function(event){
		return autoScrollTo(event.currentTarget);
	}, false);
}
