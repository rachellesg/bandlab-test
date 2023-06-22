const ctx = new AudioContext();

let audio;
let playSound;
let audioTitle;

const body = document.body;

fetch('audio/synth-organ.ogg')
  .then(response => {
    const url = response.url.split('/');
    audioTitle = url.at(-1).toString()
    const audioTitleText = document.createElement('p');
    audioTitleText.textContent = audioTitle;
    body.appendChild(audioTitleText);
    return response.arrayBuffer()
  })
  .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
  .then(decodedAudio => {
    audio = decodedAudio;
  });

function playBack() {
  playSound = ctx.createBufferSource();
  playSound.buffer = audio;
  playSound.connect(ctx.destination);
  playSound.start(0);
}

function stopPlayback() {
  if (playSound) {
    playSound.stop();
  }
}

const playButton = document.createElement('button');
playButton.textContent = 'Play';
playButton.addEventListener('click', playBack);

const stopButton = document.createElement('button');
stopButton.textContent = 'Stop';
stopButton.addEventListener('click', stopPlayback);

body.appendChild(playButton);
body.appendChild(stopButton);
