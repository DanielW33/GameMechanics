const container = document.querySelector(".Content");
let isDown = false;
let startX;
let scrollLeft;

container.addEventListener("mousedown", (e)=>{
    isDown = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
    container.style.cursor = "grabbing";
});
container.addEventListener('mouseup', () => {
    isDown = false;
    container.classList.remove('active');
    container.style.cursor = "grab";
});
container.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    container.scrollLeft = scrollLeft - walk;
});
