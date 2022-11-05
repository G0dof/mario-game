/* Variables */
const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const cloud = document.querySelector(".cloud");

const score = document.querySelector(".score");
const gameover = document.querySelector(".game-over");
const restart = document.querySelector(".btn");

const gameBoard = document.querySelector(".game-board");
const ground = document.querySelector(".ground");

/* Jump and Score features */
const jump = () => {
    mario.classList.add("jump");

    setTimeout(() => {
        mario.classList.remove("jump");
        score.innerHTML = ++score.innerHTML;
    }, 500);
};

/* Loop to run the game */
const loop = setInterval(() => {
    /* Get the position of Mario, Pipe and Cloud*/
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window
        .getComputedStyle(mario)
        .bottom.replace("px", "");
    const cloudPosition = +window
        .getComputedStyle(cloud)
        .right.replace("px", "");

    /* Phase 2 */
    if (+score.innerHTML == 15) {
        gameBoard.classList.add("phase2");
        document.getElementsByTagName("embed")[0].src =
            "assets/audio/sad-mario.mp3";

        /* Changing clouds into bats */
        cloud.src = "assets/img/bats.gif";
        cloud.style.width = "500px";
        cloud.style.height = "150px";

        /* Inverting the color of theses items */
        [ground, restart, gameover, cloud].forEach((el) => {
            el.style.filter = "invert(1)";
        });
    }

    /* If you hit a pipe, the game stops */
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        /* Stopping animation and freezing them the moment you died*/
        cloud.style.animation = "none";
        cloud.style.right = `${cloudPosition}px`;

        pipe.style.animation = "none";
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = "none";
        mario.style.bottom = `${marioPosition}px`;
        mario.src = "assets/img/game-over.png";
        mario.style.width = "75px";
        mario.style.marginLeft = "50px";

        ground.style.animation = "none";

        /* Game over message */
        gameover.style.visibility = "visible";

        /* Stop the loop and restart a new one */
        restart.style.visibility = "visible";
        restart.addEventListener("click", () => {
            location.reload();
        });

        clearInterval(loop);
    }
}, 10);

/* Jumping on key press and clicking */
document.addEventListener("keydown", jump);
document.addEventListener("click", jump);
