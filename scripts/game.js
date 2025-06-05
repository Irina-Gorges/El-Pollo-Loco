let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    ctx = canvas.getContext('2d');

    console.log('My Character is', world.character);
}

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

    function updateMuteButton(muted) {
        const btn = document.getElementById('muteBtn');
        btn.textContent = muted ? '🔊' : '🔇';
        btn.style.opacity = 0.7;
        setTimeout(() => (btn.style.opacity = 1), 100);
    }
});

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
