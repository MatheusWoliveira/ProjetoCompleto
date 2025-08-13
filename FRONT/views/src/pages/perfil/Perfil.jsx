import styles from './Perfil.module.css';
import { Link, useNavigate } from 'react-router-dom';
import passardefoguetao from '../../assets/passardefoguetao.jpg';
import racionais from '../../assets/racionais.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMusic } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import logo from '../../assets/logo1.jpg';
import React, { useState} from "react";
import { FaRedoAlt, FaStepBackward, FaPlay, FaPause, FaStepForward, FaRandom } from 'react-icons/fa';


export default function Perfil() {
 
   const [isPlaying, setIsPlaying] = useState(false);
       const handlePlayPause = () => {
       setIsPlaying(!isPlaying);
     };
     const navigate = useNavigate();
   
     const irParaLogin = () => {
       navigate('/');
     };
   
   

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
                      <a href="#" className={styles['nav-link']}>
                       <FontAwesomeIcon icon={faMusic} />Minhas Músicas
                      </a>
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

      <main className={styles.mainContent}>
        <div className={styles.profileBox}>
          <div className={styles.avatar}>
            <img src={passardefoguetao} alt="Avatar" />
          </div>

          <div className={styles.stats}>
            <div className={`${styles.card} ${styles.positive}`}>
              <h3>❤️ Curtidas</h3>
              <p className={styles.number}>150 <span>⬆ 150%</span></p>
              <p>Acima do normal</p>
            </div>

            <div className={`${styles.card} ${styles.negative}`}>
              <h3>👎 Unfollow's</h3>
              <p className={styles.number}>31 <span>⬇ 12%</span></p>
              <p>Abaixo do normal</p>
            </div>

            <div className={`${styles.card} ${styles.neutral}`}>
              <h3>👁️ Visitas</h3>
              <p className={styles.number}>62 <span>⬆ 4%</span></p>
              <p>Um pouco acima da média</p>
            </div>

            <div className={`${styles.card} ${styles.chart}`}>
              <h3>Resultado</h3>
              <div className={styles.circle}></div>
              <ul>
                <li>• Curtidas <span>80%</span></li>
                <li>• Unfollow’s <span>28%</span></li>
                <li>• Visitas ao perfil <span>28%</span></li>
              </ul>
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
}
