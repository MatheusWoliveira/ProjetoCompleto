// musicas/Musicas.jsx
import styles from './Musicas.module.css';
import { Link, useNavigate } from 'react-router-dom';
import logo1 from '../../assets/logo1.jpg';
import passardefoguetao from '../../assets/passardefoguetao.jpg';
import songs from "../../database/songs";
import React from "react";
import MusicPlayer from "../../components/MusicController";


export default function Musicas() {
  const navigate = useNavigate();

  const videos = [
    {
      src: 'https://www.youtube.com/embed/84IgwzZ7Rmo?si=MoCUdc0MQy8djgB8',
      title: 'MC Don Juan, MC Kevin e MC Ryan SP - Passar de Foguetão',
    },
    {
      src: 'https://www.youtube.com/embed/7DV9SZgxegA?si=4-qBztkQWd20Vcj-',
      title: 'MC Brinquedo, Tuto, Laranjinha, Cebezinho - The Box Funk 2',
    },
    // Repete os mesmos vídeos apenas para exemplo
    {
      src: 'https://www.youtube.com/embed/7DV9SZgxegA?si=4-qBztkQWd20Vcj-',
      title: 'MC Brinquedo, Tuto, Laranjinha, Cebezinho - The Box Funk 2',
    },
    {
      src: 'https://www.youtube.com/embed/7DV9SZgxegA?si=4-qBztkQWd20Vcj-',
      title: 'MC Brinquedo, Tuto, Laranjinha, Cebezinho - The Box Funk 2',
    },
    {
      src: 'https://www.youtube.com/embed/7DV9SZgxegA?si=4-qBztkQWd20Vcj-',
      title: 'MC Brinquedo, Tuto, Laranjinha, Cebezinho - The Box Funk 2',
    }
  ];
  


        
  return (
    
    <div>
      
      <link rel="shortcut icon" href="/imagens/spotify.ico" type="image/x-icon" />
      <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <header style={{ borderRadius: "50px" }}>
        <nav className={styles.top}>
          <ul>
            <li>
              <img src={logo1} alt="Logo Spotify" className={styles.logo} />
            </li>

            <div className={styles.Paginas}>
              <li>
                <Link to="/logado/pgLogado" className={styles.navLink}>
                  <i className="fas fa-home"></i> Home
                </Link>
              </li>
              <li>
                <a href="#" className={styles['nav-link']}>
                  <i className="fas fa-music"></i> Músicas
                </a>
              </li>
            </div>

            <div className={styles.icons}>
              <a><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fas fa-cog"></i></a>
              <div className={styles['perfil-usuario']}>
                <li>
                  <Link to="/perfil" className={styles.spanOne} onClick={() => navigate('/perfil')}>
                    <img src={passardefoguetao} alt="Usuário" /> Matheus Wilson
                  </Link>
                </li>
              </div>
            </div>
          </ul>
        </nav>
      </header>

      <div className={styles['container-buttons']}>
        <button className={styles.Adicionar}>
          Lançar Música <i className="bx bx-plus"></i>
        </button>
        <button className={styles.Apagar}>
          Apagar <i className="bx bx-x"></i>
        </button>
      </div>

      <div className={styles.container}>
        <main id="items" className={styles['grid-container']}>
          <div className={styles.box}>
            <div className={styles.album}>
              <i className="bx bx-music"></i>
            </div>

            <audio id="player"></audio>

            <div className={styles.controls}>
              <button id="prevButton"><i className="fas fa-angle-double-left"></i></button>
              <button id="playPauseButton"><i className="bx bx-caret-right"></i></button>
              <button id="nextButton"><i className="fas fa-angle-double-right"></i></button>
            </div>

            <div className={styles.musicInfo}>
              <p><span className={styles.musicName}></span></p>
              <button className={styles.iconsheart}><i className="fas fa-heart"></i></button>
            </div>

            <div className={styles.time}>
              <span id="currentTime">0:00</span>
              <div className={styles.footer}>
                <div className={styles.progressBar}>
                  <div className={styles.progress}></div>
                </div>
              </div>
              <span id="duration">0:00</span>
              <button className={styles.iconsshare}><i className="fas fa-share"></i></button>
            </div>
          </div>

          {videos.map((video, index) => (
            <div className={styles.box} key={index}>
              <iframe
                src={video.src}
                title={video.title}
                allowFullScreen
              ></iframe>
              <h2 className={styles.texto}>{video.title}</h2>
            </div>
          ))}
        </main>
      </div>

      
      
    </div>
  );
};



