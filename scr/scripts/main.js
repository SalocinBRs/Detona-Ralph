const state = {
    view: {
        square: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        reset: document.querySelector("#reset"),
        mute: document.querySelector("#mute"),
        lifes: document.querySelector("#lifes"),
    },
    values:  {
        timerId: null,
        countDownTimerId: setInterval(countDown, 1000),
        hitPosition: 0,
        result: 0,
        currentTime: 20,
        initialInterval: 1000,
        currentLifes: 3,
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

function moveEnemy(intervalo = state.values.initialInterval) {
    state.values.timerId = setInterval(randomSquare, intervalo);
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.values.countDownTimerId);
        clearInterval(state.values.timerId);
        playSound("death.m4a", 1);
        alert('Gamer over, o seu resultado foi: ' + state.values.result);
    }
}

function playSound(soundName, volume) {
    let audio = new Audio(`./scr/sounds/${soundName}`);
    audio.volume = volume;
    audio.play();
}

function addListerHitBox() {
    state.view.square.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit.m4a", 0.68);
                state.values.currentTime += 2;

                state.values.initialInterval -= 12;
                clearInterval(state.values.timerId);
                moveEnemy(state.values.initialInterval);
            } else {

                state.values.currentLifes--;
                playSound("damage.m4a", .11)
                state.view.lifes.textContent = state.values.currentLifes;

                if (state.values.currentLifes <= 0) {
                    clearInterval(state.values.countDownTimerId);
                    clearInterval(state.values.timerId);
                    playSound("death.m4a", 1);
                    alert('Gamer over, o seu resultado foi: ' + state.values.result);
                } else {
                    clearInterval(state.values.timerId);
                    moveEnemy(state.values.initialInterval);
                }
            }
        });
    });
}

function initialize() {
    playSound("stageSound.m4a", .6);
    randomSquare();
    moveEnemy();
    addListerHitBox();
}

state.view.reset.addEventListener('click', function() {
    window.location.reload();
});

initialize();
