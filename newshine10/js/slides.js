const slider = document.querySelector('.slider-container'),
    slides = Array.from(document.querySelectorAll('.slide'))

let isDragging = false,
 startPos = 0,
 currentTranslate = 0,
 prevTranslate = 0,
 animationID = 0,
 currentIndex = 0,
 i = 0;

slides.forEach((slide, index) => {
    const slideImage = slide.querySelector('img')
    slideImage.addEventListener('dragstart', (e) => e.
    preventDefault())
    //Touch events
slide.addEventListener('touchstart', touchStart(index))
slide.addEventListener('touchend', touchEnd)
slide.addEventListener('touchmove', touchMove)
    //Mouse events
    slide.addEventListener('mousedown', touchStart(index))
    slide.addEventListener('mouseup', touchEnd)
    slide.addEventListener('mouseleave', touchEnd)
    slide.addEventListener('mousemove', touchMove)
})

// Disable context menu
// window.oncontextmenu = function(event){
//     event.preventDefault();
//     event.stopPropagation();
//     return false
// }
//functions

let time = setInterval(timefunction, 6000)

function touchStart(index) {
    return function(event) {
        console.log("Start");
        currentIndex = index
        startPos = getPositionX(event)
        isDragging = true

        animationID = requestAnimationFrame(animation)
        slider.classList.add('grabbing')
    }
}
function check(){
    if(window.innerWidth <= 1000){
        return i = window.innerWidth;
    }
    else {
        return i = 1000
    }
}

function touchEnd(){
    isDragging = false
    cancelAnimationFrame(animationID)

    const movedBy = currentTranslate - prevTranslate
    check();
    if(movedBy < -i/3 && currentIndex < slides.length - 1) currentIndex = currentIndex + 1;
    if(movedBy > i/3 && currentIndex > 0)  currentIndex = currentIndex - 1;

    setPositionByIndex()
    slider.classList.remove('grabbing')  
}

function getPositionX(event) {
    return event.type.includes('mouse') 
    ? event.pageX 
    : event.touches[0].clientX
}

function touchMove(event){
    if(isDragging){
        const currentPosition = getPositionX(event)
        currentTranslate = prevTranslate + currentPosition - startPos
        clearInterval(time)
        time = setInterval(timefunction, 6000)
    }
}


function setSliderPosition(){
    slider.style.transform = `translateX(${currentTranslate}px)`
}

function animation(){
    setSliderPosition()
    if(isDragging) requestAnimationFrame(animation)
}

function setPositionByIndex() {
    check();
    currentTranslate = currentIndex * -i
    prevTranslate = currentTranslate
    setSliderPosition()
    
    switch (currentIndex){
        case 0:
        document.querySelector("#s1").style.backgroundColor = "#5ad36486"
        document.querySelector("#s2").style.backgroundColor = "rgba(0, 0, 0, 0.705)"
        document.querySelector("#s3").style.backgroundColor = "rgba(0, 0, 0, 0.705)"
        document.querySelector("#s4").style.backgroundColor = "rgba(0, 0, 0, 0.705)"
        document.querySelector("#s5").style.backgroundColor = "rgba(0, 0, 0, 0.705)"
        break;
        case 1:
            document.querySelector("#s2").style.backgroundColor = "#d3cb5a86"
            document.querySelector("#s1").style.backgroundColor = "rgba(0, 0, 0, 0.705)"
            document.querySelector("#s3").style.backgroundColor = "rgba(0, 0, 0, 0.705)"
            document.querySelector("#s4").style.backgroundColor = "rgba(0, 0, 0, 0.705)"
            document.querySelector("#s5").style.backgroundColor = "rgba(0, 0, 0, 0.705)"
        break;
        case 2:
            document.querySelector("#s3").style.backgroundColor = "#5aa7d386"
            document.querySelector("#s1").style.backgroundColor = "rgba(0, 0, 0, 0.705)"
            document.querySelector("#s2").style.backgroundColor = "rgba(0, 0, 0, 0.705)"
            document.querySelector("#s4").style.backgroundColor = "rgba(0, 0, 0, 0.705)"
            document.querySelector("#s5").style.backgroundColor = "rgba(0, 0, 0, 0.705)"
        break;
        case 3:
            document.querySelector("#s4").style.backgroundColor = "#e568e986"
            document.querySelector("#s1").style.backgroundColor = "rgba(0, 0, 0, 0.705)"
            document.querySelector("#s2").style.backgroundColor = "rgba(0, 0, 0, 0.705)"
            document.querySelector("#s3").style.backgroundColor = "rgba(0, 0, 0, 0.705)"
            document.querySelector("#s5").style.backgroundColor = "rgba(0, 0, 0, 0.705)"
        break;
        case 4:
            document.querySelector("#s5").style.backgroundColor = "rgba(255, 99, 71, 0.52)"
            document.querySelector("#s1").style.backgroundColor = "rgba(0, 0, 0, 0.705)"
            document.querySelector("#s2").style.backgroundColor = "rgba(0, 0, 0, 0.705)"
            document.querySelector("#s3").style.backgroundColor = "rgba(0, 0, 0, 0.705)"
            document.querySelector("#s4").style.backgroundColor = "rgba(0, 0, 0, 0.705)"
        break;
    }
}

function timefunction(){
    if(currentIndex !=4) {
        ++currentIndex;
    }
    else if(currentIndex == 4){
        currentIndex = 0;
    }
    setPositionByIndex()
}

//SLIDES BTNS

const btns = Array.from(document.querySelectorAll(".slidenav"));
let x = 0;

btns.forEach((btn, index) => {
    btn.addEventListener("click", ()=>{
        currentIndex = index;
        setPositionByIndex()
        clearInterval(time)
        time = setInterval(timefunction, 6000)
    })
})
