// navbar hide when scroll down
var previousScrollposition = window.pageYOffset;

window.onscroll = function(){
    var currentScrollPosition = window.pageYOffset + 10;

    if(previousScrollposition > currentScrollPosition){
        document.getElementById('headerNavbar').style.top = "0";
    }else{
        document.getElementById('headerNavbar').style.top ="-100px";
    }

    previousScrollposition = currentScrollPosition;
}


// parallax on hero
const container = document.querySelector('.animasi-pas-hover');
const SCALE_CONSTANT = -25;

function parallax_yoo(){

    // disable on mobile cause its soo buggy and people would not really notice it
    itsOnMobile = window.innerWidth < 768;
    touchScreenDetected = window.matchMedia("(pointer: coarse)").matches;

    if (itsOnMobile){
        return
    }

    if  (touchScreenDetected) {
        return;
    }

    container.addEventListener('mousemove', (e) => {
        const { width, height,top, right , left, bottom} = container.getBoundingClientRect();
            
            /* 
            1. Calculate cursor position relative to the element (0 to width/height)
            2. Divide by total size to get a 0 to 1 ratio
            3. Subtract 0.5 to get a range of -0.5 to 0.5 (the 'tilt' and 'roll' values)
        */
         const tilt = (e.clientX - left) / width - 0.5;   // Horizontal offset
        const roll = (e.clientY - top) / height - 0.5;   // Vertical offset
    
        container.style.transform = `
        rotateX(${roll * SCALE_CONSTANT}deg) 
        rotateY(${tilt * SCALE_CONSTANT}deg)
        `;
    });

    container.addEventListener('mouseleave', () => {
        container.style.transform = `rotateX(0deg) rotateY(0deg)`;
    });
}

// parallax_yoo();



// let slideIndex = 1;

// function plusSlides(n){
//     showSlides(slideIndex += n);
// }

// function currentSlide(n){
//     showSlides(slideIndex = n);
// }

// function showSlides(n){
//     let i;
//     let slides = document.getElementsByClassName("eventSlides");

//     if(n > slides.length) {slideIndex = 1};
//     if(n < 1) {slideIndex = slides.length};

//     for(i = 0; i < slides.length; i++){
//         slides[i].style.display = "none";
//     }

//     slideIndex++;
//     if(slideIndex > slides.length) {slideIndex = 1}
//     slides[slideIndex-1].style.display = "block";
//     setTimeout(showSlides,2000)
// }



let slideIndex = 0;
let slideTimeout;

showSlides(); // Start the cycle

// Manual controls
function plusSlides(n) {
    clearTimeout(slideTimeout); // Stop the auto-timer so it doesn't "double jump"
    slideIndex += n;
    updateSlides();
}

function showSlides() {
    slideIndex++;
    updateSlides();
    slideTimeout = setTimeout(showSlides, 5000); // Change image every 3 seconds
}

function updateSlides() {
    let i;
    let slides = document.getElementsByClassName("eventSlides");
    
    if (slideIndex > slides.length) {slideIndex = 1}
    if (slideIndex < 1) {slideIndex = slides.length}
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    slides[slideIndex - 1].style.display = "flex";
}


























