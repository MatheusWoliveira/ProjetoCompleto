// FRONT/views/src/pages/musicas/Musicas.jsx
import styles from './Musicas.module.css';
import { Link, useNavigate } from 'react-router-dom';
import logo1 from '../../assets/logo1.jpg';
import passardefoguetao from '../../assets/passardefoguetao.jpg';
import React, { useState, useEffect } from "react";

export default function Musicas() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    artista: '',
    capa: null,
    arquivo: null
  });

  const [musicas, setMusicas] = useState([]);

  const fetchMusics = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/music');
      const data = await response.json();
      setMusicas(data);
    } catch (err) {
      console.error('Erro ao buscar músicas:', err);
    }
  };

  useEffect(() => {
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

    const data = new FormData();
    data.append('titulo', formData.titulo);
    data.append('artista', formData.artista);
    data.append('capa', formData.capa);
    data.append('arquivo', formData.arquivo);

    try {
      const response = await fetch('http://localhost:3000/api/music/upload', {
        method: 'POST',
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
        alert(result.error || "Erro ao enviar música.");
      }
    } catch (err) {
      console.error('Erro no envio:', err);
      alert("Erro na comunicação com o servidor.");
    }
  };

  return (
    <div>
      {/* Header */}
      <header style={{ borderRadius: "50px" }}>
        <nav className={styles.top}>
          <ul>
            <li><img src={logo1} alt="Logo" className={styles.logo} /></li>
            <div className={styles.Paginas}>
              <li><Link to="/logado/pgLogado" className={styles.navLink}>Home</Link></li>
              <li><a href="#" className={styles['nav-link']}>Músicas</a></li>
            </div>
            <div className={styles.icons}>
              <a><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fas fa-cog"></i></a>
              <div className={styles['perfil-usuario']}>
                <li>
                  <Link to="/perfil" className={styles.spanOne}>
                    <img src={passardefoguetao} alt="Usuário" /> Matheus Wilson
                  </Link>
                </li>
              </div>
            </div>
          </ul>
        </nav>
      </header>

      {/* Botões */}
      <div className={styles['container-buttons']}>
        <button className={styles.Adicionar} onClick={() => setShowModal(true)}>Lançar Música</button>
        <button className={styles.Apagar}>Apagar</button>
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
            <div className={styles.box} key={index}>
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
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}
