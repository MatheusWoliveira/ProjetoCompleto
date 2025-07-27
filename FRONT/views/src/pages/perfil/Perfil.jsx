import styles from './Perfil.module.css';
import { Link } from 'react-router-dom'; // ✅ Importado
import passardefoguetao from '../../assets/passardefoguetao.jpg';
import racionais from '../../assets/racionais.jpg';
import logo1 from '../../assets/logo1.jpg';

export default function Perfil() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src={logo1} alt="Logo" className={styles.logo} />

        <nav>
          {/* ✅ Corrigido para Link */}
          <Link to="/logado/pgLogado">Home</Link>
          <Link to="/musicas">Minhas Músicas</Link>
        </nav>

        <div className={styles.userProfile}>
          <img src={passardefoguetao} alt="Usuário" />
          <span>Matheus Wilson</span>
        </div>
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
        <div className={styles.musicInfo}>
          <img src={racionais} alt="Racionais" />
          <div>
            <strong>Racionais</strong>
            <p>A vida é um desafio</p>
          </div>
        </div>

        <div className={styles.controls}>
          <button>⏮</button>
          <button>⏯</button>
          <button>⏭</button>
        </div>

        <div className={styles.musicInfo}>
          <div>
            <strong></strong>
            <p>A vida é um desafio</p>
          </div>
          <img src={racionais} alt="Música" />
        </div>
      </footer>
    </div>
  );
}
