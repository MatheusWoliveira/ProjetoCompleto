// FRONT/views/src/pages/musicas/Musicas.jsx
import styles from './Musicas.module.css';
import { Link, useNavigate } from 'react-router-dom';
import passardefoguetao from '../../assets/passardefoguetao.jpg';
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMusic } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import logo from '../../assets/logo1.jpg';
import { FaRedoAlt, FaStepBackward, FaPlay, FaPause, FaStepForward, FaRandom, FaSearch } from 'react-icons/fa';
import racionais from '../../assets/racionais.jpg';
export default function Musicas() {
  const navigate = useNavigate();

  function Search(formdata){
    const query = formdata.get ('query');
    alert (`You search for '${query}'`);
  }


  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    artista: '',
    capa: null,
    arquivo: null
  });

  const [musicas, setMusicas] = useState([]);

  const token = localStorage.getItem('token'); // token salvo no login

  const fetchMusics = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/music', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      console.log("Músicas recebidas do backend:", data); // DEBUG

      // Garante que cada música tenha _id mesmo que o backend mande outro nome
      const normalizadas = data.map(m => ({
        ...m,
        _id: m._id || m.id || m.musicId
      }));

      setMusicas(normalizadas);
    } catch (err) {
      console.error('Erro ao buscar músicas:', err);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/Musicas');
      return;
    }
    fetchMusics();
  }, []);

  const handleChange = (e) => {
    const { name, files, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!formData.titulo || !formData.artista || !formData.capa || !formData.arquivo) {
      alert("Preencha todos os campos e selecione os arquivos.");
      return;
    }

    const token = localStorage.getItem("token"); // recupera o token salvo no login
    if (!token) {
      alert("Você precisa estar logado para enviar música.");
      return;
    }

    const data = new FormData();
    data.append('titulo', formData.titulo);
    data.append('artista', formData.artista);
    data.append('capa', formData.capa);
    data.append('arquivo', formData.arquivo);

    try {
      const response = await fetch('http://localhost:3000/api/music/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data
      });

      const result = await response.json();
      console.log('Resposta do servidor:', result);

      if (response.ok) {
        alert("Música enviada com sucesso!");
        setShowModal(false);
        setFormData({ titulo: '', artista: '', capa: null, arquivo: null });
        fetchMusics();
      } else {
        alert(result.error || result.msg || "Erro ao enviar música.");
      }
    } catch (err) {
      console.error('Erro no envio:', err);
      alert("Erro na comunicação com o servidor.");
    }
  };


  const handleDelete = async (id) => {
    if (!id) {
      console.error("ID da música não fornecido!");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/music/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert("Música deletada com sucesso!");
        setMusicas(musicas.filter((musica) => musica._id !== id));
      } else {
        alert(data.msg || "Erro ao deletar música.");
      }
    } catch (error) {
      console.error("Erro ao deletar música:", error);
    }
  };

   const irParaLogin = () => {
    navigate('/');
  };
 const [isPlaying, setIsPlaying] = useState(false);
    const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  return (
    <div>
      {/* Header */}
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

      <form action={Search} method="GET" className={styles.searchContainer}>
        <div className={styles.inputWrapper}>
        <input className='search' name="query" placeholder="Procure sua música" />
        <FaSearch />
        </div>
        </form>

      {/* Botão adicionar */}
      <div className={styles['container-buttons']}>
        <button className={styles.Adicionar} onClick={() => setShowModal(true)}>Lançar Música</button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Lançar Nova Música</h2>
            <form onSubmit={handleUpload} className={styles.uploadForm}>
              <input type="text" name="titulo" placeholder="Título" value={formData.titulo} onChange={handleChange} required />
              <input type="text" name="artista" placeholder="Artista" value={formData.artista} onChange={handleChange} required />
              <input type="file" name="capa" accept="image/*" onChange={handleChange} required />
              <input type="file" name="arquivo" accept="audio/*" onChange={handleChange} required />
              <button type="submit">Enviar</button>
              <button type="button" onClick={() => setShowModal(false)}>Cancelar</button>
            </form>
          </div>
        </div>
      )}

      {/* Grid de músicas */}
      <div className={styles.container}>
        <main id="items" className={styles['grid-container']}>
          {musicas.map((musica, index) => (
            <div className={styles.box} key={musica._id || index}>
              <img
                src={musica.capaUrl || '/fallback-capa.jpg'}
                alt={musica.titulo}
                style={{ width: '100%', borderRadius: '10px' }}
              />
              <h2 className={styles.texto}>{musica.titulo} - {musica.artista}</h2>
              <audio controls style={{ width: '100%' }}>
                <source src={musica.arquivoUrl} type="audio/mpeg" />
                Seu navegador não suporta o elemento de áudio.
              </audio>
              <button
                className={styles.Apagar}
                onClick={() => handleDelete(musica._id)}
                style={{ marginTop: '8px' }}
              >
                Apagar
              </button>

            </div>
          ))}
        </main>
      </div>
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