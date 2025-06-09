/**
 * @fileoverview Initializes the game canvas, handles keyboard input and audio playback.
 */
let canvas;
let world;
let keyboard = new Keyboard();
let isShowing = false;

const startScreen = document.getElementById('startScreen');
const winScreen = document.getElementById('winScreen');
const lostScreen = document.getElementById('lostScreen');

/**
 * Initializes the canvas and game world, and gets the drawing context.
 * Called when the game starts.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    ctx = canvas.getContext('2d');
    showStartScreen();
    hideWinScreen();
    hideLostScreen();
}

function startGame() {
    hideStartScreen();
    world = new World(canvas, keyboard);
    AudioHub.playSound(AudioHub.backgroundMusic);
}

function restartGame() {
    initLevel();
    world = new World(canvas, keyboard);
    hideWinScreen();
    hideLostScreen();
}

function hideStartScreen() {
    startScreen.classList.add('hide');
    startScreen.classList.remove('show');
    startScreen.style.zIndex = -10;
}

function hideWinScreen() {
    winScreen.classList.add('hide');
    winScreen.classList.remove('show');
    winScreen.style.zIndex = -15;
}

function showStartScreen() {
    startScreen.classList.remove('hide');
    startScreen.classList.add('show');
    startScreen.style.zIndex = 10;
}

function showLostScreen() {
    lostScreen.classList.add('show');
    lostScreen.classList.remove('hide');
    lostScreen.style.zIndex = 15;
    IntervalHub.stopEveryInterval();
    AudioHub.playSound(AudioHub.loose);
}

/**
 * Hides the lose screen.
 */
function hideLostScreen() {
    lostScreen.classList.add('hide');
    lostScreen.classList.remove('show');
    lostScreen.style.zIndex = -15;
}

/**
 * Background music audio element.
 * @type {HTMLAudioElement}
 */
const bgMusic = new Audio(AudioHub.backgroundMusic.AUDIO_BACKGROUND[0]);
bgMusic.loop = true;

AudioHub.applySettingsTo(bgMusic); // Lautstärke & Mute anwenden
bgMusic.play();

// Optional global speichern, z. B.:
window.bgMusic = bgMusic;

window.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('volumeSlider');
    const muteBtn = document.getElementById('muteBtn');

    const audioSettings = AudioHub.getSettings();
    slider.value = audioSettings.volume;
    updateMuteButton(audioSettings.muted);

    // Volume ändern
    slider.addEventListener('input', (e) => {
        const newVolume = parseFloat(e.target.value);
        AudioHub.setVolume(newVolume);
        if (window.bgMusic) {
            window.bgMusic.volume = newVolume;
        }
    });

    // Mute umschalten
    muteBtn.addEventListener('click', () => {
        AudioHub.toggleMute();
        const newMuted = AudioHub.getSettings().muted;
        updateMuteButton(newMuted);
        if (window.bgMusic) {
            window.bgMusic.muted = newMuted;
        }
    });

    /**
     * Updates the mute button icon based on mute state.
     * @param {boolean} muted - Whether audio is muted.
     */
    function updateMuteButton(muted) {
        const btn = document.getElementById('muteBtn');
        btn.textContent = muted ? '🔊' : '🔇';
        btn.style.opacity = 0.7;
        setTimeout(() => (btn.style.opacity = 1), 100);
    }
});

/**
 * Keyboard key down event listener for controlling the character.
 * Sets the corresponding key state in the keyboard object.
 * @param {KeyboardEvent} event
 */
window.addEventListener('keydown', (event) => {
    if (event.code == 'KeyD') {
        keyboard.RIGHT = true;
    }

    if (event.code == 'KeyA') {
        keyboard.LEFT = true;
    }

    if (event.code == 'KeyW') {
        keyboard.UP = true;
    }

    if (event.code == 'KeyS') {
        keyboard.DOWN = true;
    }

    if (event.code == 'Space') {
        keyboard.SPACE = true;
    }

    if (event.code == 'KeyF') {
        keyboard.THROW = true;
    }
    console.log(event);
});

/**
 * Keyboard key up event listener for controlling the character.
 * Resets the corresponding key state in the keyboard object.
 * @param {KeyboardEvent} event
 */
window.addEventListener('keyup', (event) => {
    if (event.code == 'KeyD') {
        keyboard.RIGHT = false;
    }

    if (event.code == 'KeyA') {
        keyboard.LEFT = false;
    }

    if (event.code == 'KeyW') {
        keyboard.UP = false;
    }

    if (event.code == 'KeyS') {
        keyboard.DOWN = false;
    }

    if (event.code == 'Space') {
        keyboard.SPACE = false;
    }

    if (event.code == 'KeyF') {
        keyboard.THROW = false;
    }
    console.log(event);
});
