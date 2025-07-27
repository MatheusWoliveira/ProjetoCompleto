import React from 'react';
import styles from './PaginaLogado.module.css';
import logo from '../../assets/logo1.jpg';
import racionais from '../../assets/racionais.jpg';
import thebox from '../../assets/thebox.jpg';
import perfilImg from '../../assets/passardefoguetao.jpg';
import { useNavigate, Link } from 'react-router-dom';

const PaginaLogado = () => {
  const navigate = useNavigate();

  const irParaLogin = () => {
    navigate('/');
  };

  const irParaPerfil = () => {
    navigate('/perfil');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoGroup}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
            className={styles.svg}
            onClick={irParaLogin}
          >
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
          </svg>
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>

        <nav>
          <ul className={styles.navLinks}>
            <li className={styles.active}>Home</li>
            <li><Link to="/musicas">Minhas Músicas</Link></li>
          </ul>
        </nav>

        <div className={styles.perfil}>
          <img src={perfilImg} alt="Foto de perfil" />
          <span className={styles.spanOne} onClick={irParaPerfil}>Matheus Wilson</span>
        </div>
      </header>

      <section className={styles.searchContainer}>
        <input type="text" placeholder="Type your search here" />
        <button>🔍</button>
      </section>

      <main className={styles.mainContent}>
        <div className={styles.topArtists}>
          <h2>Top Artists <span>Ver tudo</span></h2>
          <div className={styles.artistGrid}>
            <div className={styles.artistCard}>
              <img src={thebox} alt="The Box" />
              <p>The Box</p>
              <small>8.5M Plays</small>
            </div>
          </div>
        </div>

        <div className={styles.billboard}>
          <h2>Billboard Topchart <span>Ver tudo</span></h2>
          <div className={styles.albumGrid}>
            <div className={styles.albumCard}>
              <img src={racionais} alt="Racionais" />
              <p>Racionais</p>
              <small>A vida é um desafio</small>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.musicPlayer}>
        <div className={styles.trackInfo}>
          <img src={racionais} alt="Racionais" />
          <div>
            <p>Racionais</p>
            <small>A vida é um desafio</small>
          </div>
        </div>
        <div className={styles.controls}>
          <button>⏮</button>
          <button>▶️</button>
          <button>⏭</button>
        </div>
        <div className={styles.trackInfo}>
          <img src={racionais} alt="Racionais" />
          <div>
            <p>Racionais</p>
            <small>A vida é um desafio</small>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PaginaLogado;
