import { faHome, faMusic } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import logo from '../../assets/logo1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Header.module.css';
import passardefoguetao from '../../assets/passardefoguetao.jpg';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
const navigate = useNavigate();
const irParaLogin = () => {
    navigate('/');
  };

  const irParaPerfil = () => {
    navigate('/perfil');
  };
    return(
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
                      
                          <Link to="/perfil" className={styles.spanOne} onClick={() => navigate(irParaPerfil)}>
                            <img src={passardefoguetao} alt="Usuário" /> Matheus Wilson
                          </Link>
                     
                      </div>
                    </div>
                </nav>
              </header>
    )


}