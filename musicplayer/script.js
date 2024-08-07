document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playBtn = document.getElementById('play');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const progress = document.getElementById('progress');
    const progressContainer = document.querySelector('.progress-container');
    const title = document.getElementById('title');
    const artist = document.getElementById('artist');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');

    const songs = [
        {
            name: 'song1',
            title: 'Song Title 1',
            artist: 'Artist 1'
        },
        {
            name: 'song2',
            title: 'Song Title 2',
            artist: 'Artist 2'
        },
        {
            name: 'song3',
            title: 'Song Title 3',
            artist: 'Artist 3'
        }
    ];

    let songIndex = 0;

    function loadSong(song) {
        title.innerText = song.title;
        artist.innerText = song.artist;
        audio.src = `${song.name}.mp3`;
    }

    const playIcon = document.getElementById('play-icon'); // Get the img element inside the play button

    function playSong() {
        playIcon.src = 'https://img.icons8.com/ios-filled/50/000000/pause.png'; // Switch to pause icon
        audio.play();
    }

    function pauseSong() {
        playIcon.src = 'https://img.icons8.com/ios-filled/50/000000/play.png'; // Switch back to play icon
        audio.pause();
    }

    playBtn.addEventListener('click', () => {
        const isPlaying = playIcon.src.includes('pause'); // Check if the icon src contains 'pause'

        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    });

    function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        const currentMinutes = Math.floor(currentTime / 60);
        const currentSeconds = Math.floor(currentTime % 60);
        const durationMinutes = Math.floor(duration / 60);
        const durationSeconds = Math.floor(duration % 60);

        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;
        durationEl.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' + durationSeconds : durationSeconds}`;
    }

    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;

        audio.currentTime = (clickX / width) * duration;
    }

    function prevSong() {
        songIndex--;

        if (songIndex < 0) {
            songIndex = songs.length - 1;
        }

        loadSong(songs[songIndex]);
        playSong();
    }

    function nextSong() {
        songIndex++;

        if (songIndex > songs.length - 1) {
            songIndex = 0;
        }

        loadSong(songs[songIndex]);
        playSong();
    }

    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    audio.addEventListener('timeupdate', updateProgress);
    progressContainer.addEventListener('click', setProgress);
    audio.addEventListener('ended', nextSong);

    loadSong(songs[songIndex]);
});
