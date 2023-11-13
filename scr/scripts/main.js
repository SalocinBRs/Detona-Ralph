const state = {
    view: {
        square: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        reset: document.querySelector("#reset"),
        mute: document.querySelector("#mute"),
    },
    values:  {
        timerId: null,
        countDownTimerId: setInterval(countDown, 800),
        hitPosition: 0,
        result: 0,
        currentTime: 20, // Renomeado para currentTime para manter a consistência
        initialInterval: 1000, // Adicionado o intervalo inicial
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
    let audio = new Audio(`./scr/sounds/${soundName}`)
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
                playSound("hit.m4a", 0.08);
                state.values.currentTime += 2;

                // Diminui 25 milissegundos do intervalo a cada clique bem-sucedido
                state.values.initialInterval -= 50;

                // Limpa o intervalo atual
                clearInterval(state.values.timerId);

                // Inicia um novo intervalo com o valor atualizado
                moveEnemy(state.values.initialInterval);
            }
        });
    });
}

function initialize() {
    playSound("stageSound.m4a", 1)
    randomSquare();
    moveEnemy();
    addListerHitBox();
}

state.view.reset.addEventListener('click', function() {
    window.location.reload();
});

initialize();
