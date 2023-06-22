function initAudioPlayer(audioURL) {
  const ctx = new AudioContext();

  let audio;
  let playSound;
  let audioTitle;

  const container = document.createElement('div');
  const body = document.body;
  body.appendChild(container);

  fetch(audioURL)
    .then(response => {
      const url = response.url.split('/');
      audioTitle = url.at(-1).toString();
      const audioTitleText = document.createElement('p');
      audioTitleText.textContent = audioTitle;
      container.appendChild(audioTitleText);
      return response.arrayBuffer();
    })
    .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
    .then(decodedAudio => {
      audio = decodedAudio;
    });

  function playBack() {
    playSound = ctx.createBufferSource();
    playSound.buffer = audio;
    playSound.connect(ctx.destination);
    playSound.addEventListener('ended', () => {
      playButton.disabled = false;
    });
    playSound.start(0);
    playButton.disabled = true;
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

  container.appendChild(playButton);
  container.appendChild(stopButton);
}

initAudioPlayer('audio/synth-organ.ogg');
initAudioPlayer('audio/new-wave-kit.ogg');
