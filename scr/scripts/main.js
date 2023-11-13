const state = {
    view: {
        square: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        resetf: document.querySelector("#reset")
    },
    values:  {
        timerId: null,
        countDownTimerId: setInterval(countDown, 800),
        hitPosition: 0,
        result: 0,
        curretTime: 20000,
    },
};

function randomSquare() {
    state.view.square.forEach((square) => {
        square.classList.remove("enemy");
    });
    
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.square[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, 1000);
}

function countDown() {
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;
    
    if (state.values.curretTime <= 0) {
        clearInterval(state.values.countDownTimerId)
        clearInterval(state.values.timerId)
        playSound("death.m4a", 1)
        alert('Gamer over, o seu resultado foi: ' + state.values.result)
        
    }
}

function playSound(soundName, volume) {
    let audio = new Audio(`./scr/sounds/${soundName}`)
    audio.volume = volume;
    audio.play();

}
function addListerHitBox() {
    state.view.square.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit.m4a", 0.08);
            }
            
        })
    });
}


function initialize() {
    playSound("stageSound.m4a", 1)
    randomSquare();
    moveEnemy()
    addListerHitBox()
}

state.view.resetf.addEventListener('click', function() {
    window.location.reload()


})
initialize();
