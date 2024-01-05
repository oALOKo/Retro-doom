///background setup

const canvas = document.querySelector('canvas');
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



class Weapon { }



///setting up main player
class MainPlayer {
    contructor(health) {
        this.health = health;
    }
}



///setting up enemy Class
class enemy {
    constructor(health, speed, position, imgHeight, imgWidth) {
        this.health = health;
        this.speed = speed;
        this.position = position;
        this.imgHeight = imgHeight;
        this.imgWidth = imgWidth;
        this.hit = false;
    }

    ///setting up a function to determine whether we are clicking at enemy or not
    collison(event) {
        if ((this.position.x < event.clientX
            && this.position.y < event.clientY
            && (this.position.y + this.imgHeight) > event.clientY
            && (this.position.x + this.imgWidth > event.clientX))
            || ((this.position.x - (2 * this.speed)) < event.clientX
                && (this.position.y - (2 * this.speed)) < event.clientY
                && (this.position.y - (2 * this.speed) + this.imgHeight) > event.clientY
                && (this.position.x - (2 * this.speed) + this.imgWidth > event.clientX))) {
            this.hit = true;
            console.log('inside me uwu', this.hit);
            //fruits.splice(1, 2);
        };
    }

    positionChanging() {
        this.position.x = this.position.x + this.speed;
        this.position.y = this.position.y + this.speed;
    }
    drawSprite() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, 100, 100);
    }

}



let time = 1;
const enemyArray = [];


///Animating
function animate() {
    draw()
    for (let i = 0; i < (enemyArray.length); i++) {
        enemyArray[i].positionChanging()
        enemyArray[i].drawSprite()
    }

    ///spawner
    if (307 % (1 + Math.floor(Math.random() * 307)) === 0) {
        enemyArray.push(new enemy(100, 10, { x: 100 * (Math.floor(Math.random() * (Math.floor(window.innerWidth / 100)))), y: 100 * (Math.floor(Math.random() * (Math.floor(window.innerHeight / 100)))) }, 100, 100))
    }

    requestAnimationFrame(animate);
}




///updating
function update() { }




///shooting mechanics


function shoot(event) {
    let info = event.target;
    let type = event.type;
    console.log(event.clientX, event.clientY);
    console.log(type);
    console.log(info);
    console.log(event);
    for (let i = 0; i < (enemyArray.length); i++) {
        enemyArray[i].collison(event)
        if (enemyArray[i].hit) {
            console.log('I ded :(')
            enemyArray.splice(i, 1);
        }
    }
    window.removeEventListener('click',shoot);
    setTimeout(() => window.addEventListener('click', shoot), 2000);

}

window.addEventListener('click', shoot );




///drawing something

function draw() {
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
}

animate()
