import styles from './Musicas.module.css';
import { Link, useNavigate } from 'react-router-dom';
import logo1 from '../../assets/logo1.jpg';
import passardefoguetao from '../../assets/passardefoguetao.jpg';

export default function Musicas() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src={logo1} alt="Logo Spotify" className={styles.logo} />

        <nav className={styles.top}>
          <ul>
            <li><Link to="/logado/pgLogado" className={styles.navLink}>Home</Link></li>
            <li><span className={styles.navLink}>Músicas</span></li>
          </ul>
        </nav>

        <div className={styles.perfil}>
          <img src={passardefoguetao} alt="Foto de perfil" />
          <span className={styles.spanOne} onClick={() => navigate('/perfil')}>Matheus Wilson</span>
        </div>
      </header>

      <main className={styles.gridContainer}>
        <div className={styles.box}>
          <iframe
            src="https://www.youtube.com/embed/52NT9cSWC_8?si=PyhQCnFZrlHZSp1N"
            title="YouTube video player"
            allowFullScreen
          ></iframe>
          <h2 className={styles.texto}>Racionais Mc's - A Vida é Desafio</h2>
        </div>

        <div className={styles.box}>
          <iframe
            src="https://www.youtube.com/embed/84IgwzZ7Rmo?si=MoCUdc0MQy8djgB8"
            title="YouTube video player"
            allowFullScreen
          ></iframe>
          <h2 className={styles.texto}>MC Don Juan, MC Kevin e MC Ryan SP - Passar de Foguetão</h2>
        </div>

        <div className={styles.box}>
          <iframe
            src="https://www.youtube.com/embed/7DV9SZgxegA?si=4-qBztkQWd20Vcj-"
            title="YouTube video player"
            allowFullScreen
          ></iframe>
          <h2 className={styles.texto}>MC Brinquedo, Tuto, Laranjinha, Cebezinho - The Box Funk 2</h2>
        </div>
      </main>
    </div>
  );
}
