import styles from './PaginaLogado.module.css';
import logo from '../../assets/logo1.jpg';
import racionais from '../../assets/racionais.jpg';
import thebox from '../../assets/thebox.jpg';
import passardefoguetao from '../../assets/passardefoguetao.jpg';
import { useNavigate, Link } from 'react-router-dom';
import { FaRedoAlt, FaStepBackward, FaPlay, FaPause, FaStepForward, FaRandom,FaSearch } from 'react-icons/fa';
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMusic} from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

const PaginaLogado = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  const navigate = useNavigate();

  const irParaLogin = () => {
    navigate('/');
  };

  function Search(formdata){
    const query = formdata.get ('query');
    alert (`You search for '${query}'`);
  }

  return (
    
    <div className={styles.container}>
      <header>
        <nav className={styles.top}>
         
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
            <div className={styles.Paginas}>
                <Link to="/logado/pgLogado" className={styles.navLink}>
                  <FontAwesomeIcon icon={faHome} /> Home
                </Link>
               <Link to="/musicas"><FontAwesomeIcon icon={faMusic} />Minhas Músicas</Link>
            </div>
          </nav>

            <div className={styles.icons}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                 <FontAwesomeIcon icon={faInstagram} />
                </a>
              <a href="#">
               <FontAwesomeIcon icon={faCog} />
                </a>
              <div className={styles['perfil-usuario']}>
              
                  <Link to="/perfil" className={styles.spanOne} onClick={() => navigate('/perfil')}>
                    <img src={passardefoguetao} alt="Usuário" /> Matheus Wilson
                  </Link>
             
              </div>
            </div>
        </nav>
      </header>

       <form action={Search} method="GET" className={styles.searchContainer}>
        <div className={styles.inputWrapper}>
        <input className='search' name="query" placeholder="Procure sua música" />
        <FaSearch />
        </div>
        </form>
      
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
          <div className={styles.descricao_album_card1}>
            <p>Racionais</p>
            <small>A vida é um desafio</small>
          </div>
        </div >
        <div className={styles.controls}>
          <button><FaRedoAlt style={{ color: "#fff", fontSize: 20, cursor: "pointer" }} /></button>
          <button><FaStepBackward style={{ color: "#fff", fontSize: 20, cursor: "pointer" }} /></button>
          <button><div
        style={{ background: "#28B6D6", borderRadius: "20%", width: 40, height: 40, display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }}
        onClick={handlePlayPause}
      >
        {isPlaying ? <FaPause style={{ color: "#fff", fontSize: 20 }} /> : <FaPlay style={{ color: "#fff", fontSize: 20 }} />}
      </div>
      </button>
          <button><FaStepForward style={{ color: "#fff", fontSize: 20, cursor: "pointer" }} /></button>
           <button><FaRandom style={{ color: "#fff", fontSize: 20, cursor: "pointer" }} /></button>
        </div>
          
            <div className={styles.trackInfo}>
           <div className={styles.descricao_album_card}>
            <p>Racionais</p>
            <small>A vida é um desafio</small>
             </div>
            <img src={racionais} alt="Racionais" />
              
        
      
       
        </div>
      </footer>
    </div>
  );
};

export default PaginaLogado;
