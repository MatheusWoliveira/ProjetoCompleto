import React, { useState, useEffect, useRef } from 'react';
import songs from '../database/songs'; // [{ name: 'Música 1', src: 'path/to/music.mp3' }, ...]

const MusicPlayer = () => {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(new Audio(songs[0].src));
  const intervalRef = useRef(null);

  const loadSong = (src) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const newAudio = new Audio(src);
    audioRef.current = newAudio;

    newAudio.addEventListener('loadedmetadata', () => {
      setDuration(newAudio.duration);
      setCurrentTime(0);
      if (isPlaying) {
        newAudio.play();
      }
    });

    newAudio.addEventListener('ended', nextMusic);
  };

  const playMusic = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pauseMusic = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const playPause = () => {
    isPlaying ? pauseMusic() : playMusic();
  };

  const nextMusic = () => {
    setIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const prevMusic = () => {
    setIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
  };

  useEffect(() => {
    loadSong(songs[index].src);
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeAttribute('src');
      }
    };
  }, [index]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (audioRef.current && isPlaying) {
        setCurrentTime(audioRef.current.currentTime);
      }
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [isPlaying]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{songs[index].name}</h2>

      <div style={styles.progressBar}>
        <div style={{ ...styles.progress, width: `${progressPercent}%` }} />
      </div>

      <div style={styles.timeContainer}>
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div style={styles.controls}>
        <button onClick={prevMusic} style={styles.controlButton}>⏮️</button>
        <button onClick={playPause} style={styles.controlButton}>
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        <button onClick={nextMusic} style={styles.controlButton}>⏭️</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 400,
    margin: '30px auto',
    padding: 20,
    border: '1px solid #ccc',
    borderRadius: 10,
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  title: {
    marginBottom: 20,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progress: {
    height: '100%',
    backgroundColor: '#007bff',
    transition: 'width 0.3s',
  },
  timeContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 14,
    marginBottom: 20,
  },
  controls: {
    display: 'flex',
    justifyContent: 'center',
    gap: 20,
  },
  controlButton: {
    fontSize: 24,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
};

export default MusicPlayer;
