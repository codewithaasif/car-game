//targating div
let score = document.querySelector('.score');
let screen = document.querySelector('.screen');
let area = document.querySelector('.area');
let cargame = document.querySelector('.cargame');
// let enemycarspeed = document.getElementById('target').options;
// console.log(enemycarspeed);


//defined 
let keys = { ArrowUp: false, ArrowDown: false, ArrowRight: false, ArrowLeft: false, }
let player = { speed: 5, score: 0 };



//know user pressing key and event
document.addEventListener('keydown', keydown);
document.addEventListener('keyup', keyup);
screen.addEventListener('click', start);


//OVER SCREEN
let overscreen = document.createElement('div');
overscreen.setAttribute('class', 'hide overscreen')
cargame.appendChild(overscreen)



//function
function keydown(e) {
    e.preventDefault;
    keys[e.key] = true;
    console.log(e.key);
    console.log(keys);
};

function keyup(e) {
    e.preventDefault;
    keys[e.key] = false;

};

function out(car, item) {
    mycar = car.getBoundingClientRect();
    anycar = item.getBoundingClientRect();

    return !((mycar.top > anycar.bottom) || (mycar.bottom < anycar.top) || (mycar.right < anycar.left) || (mycar.left > anycar.right))
}
//my car
function movemycar() {
    let mycar = document.querySelector('.car');
    player.y -= 0.1;
    mycar.style.top = player.y + 'px';
};


function movelines() {
    let lines = document.querySelectorAll('.lines');
    lines.forEach(function (item) {
        item.y += enemycarspeed() * 4;
        item.style.top = item.y + 'px';

        if (item.y >= 700) {
            item.y -= 750;
        }
    });
};
function enemycarspeed() {
    let x = document.getElementById('target').options[target.selectedIndex].value;
    let speed = +x;
    return speed;
    console.log(speed());
}
function movecars(car) {
    let enemycar = document.querySelectorAll('.enemycar');
    enemycar.forEach(function (item) {
        item.y += enemycarspeed() * 2;
        item.style.top = item.y + 'px';

        if (item.y >= 800) {
            item.y = -750;
            item.style.left = Math.floor(Math.random() * 322) + 'px';
        }
        //hit other car
        if (out(car, item)) {
            console.log('boom hit car');
            //area.classList.add('hide');
            gameover();
        }
    });
};

//game over 
function gameover() {
    overscreen.classList.remove('hide');
    overscreen.addEventListener('click', start);
    overscreen.addEventListener('click', restart);
    player.start = false;
}
//restart 
function restart() {
    overscreen.classList.add('hide');
}
//game play function
function play() {
    let car = document.querySelector('.car');
    let road = area.getBoundingClientRect();

    if (player.start) {
        movelines();
        movecars(car);
        movemycar();

        if (keys.ArrowUp && player.y > (road.top + 50)) { player.y -= player.speed }
        if (keys.ArrowDown && player.y < (road.bottom - 70)) { player.y += player.speed }
        if (keys.ArrowLeft && player.x > (0)) { player.x -= player.speed }
        if (keys.ArrowRight && player.x < (road.width - 50)) { player.x += player.speed }

        car.style.left = player.x + 'px';
        car.style.top = player.y + 'px';

        window.requestAnimationFrame(play);
        //score
        player.score++;
        score.innerHTML = "<h3>score</h3>" + player.score;
        overscreen.innerHTML = '!! GAME OVER !! <br> YOUR SCORE IS :-' + player.score + ' <br> ENTER TO RESTART GAME <br> USE ARROWS KEYS <br> **********';
    }
};
function start() {
    //area.classList.remove('hide');
    screen.classList.add('hide');
    area.innerHTML = "";

    window.requestAnimationFrame(play);
    player.start = true;
    player.score = 0;
    //roadlines
    for (x = 0; x < 5; x++) {
        let rodlines = document.createElement('div');
        rodlines.setAttribute('class', 'lines');
        rodlines.y = (x * 150);
        rodlines.style.top = rodlines.y + 'px';
        area.appendChild(rodlines);
    };
    //mycar
    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    area.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    //enemycar
    for (x = 0; x < 5; x++) {
        let enemycar = document.createElement('div');
        enemycar.setAttribute('class', 'enemycar');
        enemycar.y = ((x + 1) * 200) * -1;
        enemycar.style.top = enemycar.y + 'px';
        enemycar.style.backgroundColor = mixclr();
        enemycar.style.left = Math.floor(Math.random() * 350) + 'px';
        console.log(mixclr());
        area.appendChild(enemycar);
    };
}



function mixclr() {
    function c() {
        let nm = Math.floor(Math.random() * 256).toString(16);
        let mt = Math.floor(Math.random() * 350);
        return ('0' + String(nm)).substring(-2);
    }

    return '#' + c() + c();
}




