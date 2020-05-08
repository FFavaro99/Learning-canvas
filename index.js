const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
    x: undefined,
    y: undefined
}


class Circle {
    constructor(x, y, dx, dy, radius, color, width){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
        this.width = width;
        this.originalRadius = radius;
        this.filled = Math.random();
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        ctx.lineWidth = this.width;
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.fillStyle = this.color;
        if (this.filled >= 0.55){
            ctx.fill();
        }
    }

    update() {
        if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        }
        if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        if (Math.sqrt(Math.abs(this.x - mouse.x)*Math.abs(this.x - mouse.x) + Math.abs(this.y - mouse.y)*Math.abs(this.y - mouse.y)) < this.originalRadius && this.radius > 10){
            this.radius = this.radius-10;
        }
        else if (this.radius < this.originalRadius){
            this.radius++;
        }

        this.draw();
    }
}



let circleArray = [];






function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (circle of circleArray){
        circle.update();
    }
}

function init(){
    circleArray = [];
    let amount = Math.random() *  Math.floor(((window.innerWidth/10)+(window.innerHeight/7))/2);
    for (let i = 0; i < amount; i++){
        let radius = Math.random() * 150;
        let x = Math.random() * (innerWidth - 2*radius) + radius;
        let y = Math.random() * (innerHeight - 2*radius) + radius;
        let dx = (Math.random() - .5)*.5;
        let dy = (Math.random() - .5)*.5;
        let color = `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, ${Math.random() + 0.2})`;
        let width = Math.random() * 30;
    
        circleArray.push(new Circle(x, y, dx, dy, radius, color, width));
    }
}


init();
animate();
window.addEventListener('mousemove', (e)=>{mouse.x = e.x; mouse.y = e.y;});
window.addEventListener('resize', ()=>{canvas.width = innerWidth; canvas.height = innerHeight; init();});