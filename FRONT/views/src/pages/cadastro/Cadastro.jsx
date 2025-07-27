import React, { useState } from 'react';
import styles from './Cadastro.module.css';
import { useNavigate } from 'react-router-dom';

export default function Cadastro() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    confirmarSenha: ''
  });

  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMensagem('');
  };

  const validar = () => {
    if (form.nome.trim().length <= 7 || /\d/.test(form.nome)) {
      setMensagem('⚠️ Digite seu nome completo sem números');
      return false;
    }

    if (form.telefone.length !== 11) {
      setMensagem('⚠️ O número que você digitou é inválido! Digite corretamente');
      return false;
    }

    if (form.senha.length < 6) {
      setMensagem('⚠️ Sua senha deve conter no mínimo 6 caracteres');
      return false;
    }

    if (form.senha !== form.confirmarSenha) {
      setMensagem('⚠️ As senhas não coincidem');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validar()) return;

    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: form.nome,
          email: form.email,
          senha: form.senha,
          telefone: form.telefone
        })
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.msg);
        navigate('/');
      } else {
        setMensagem(`❌ ${data.msg}`);
      }
    } catch (error) {
      setMensagem(`${error}`);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.topo}>
        <a href="/" className={styles.link}>
          <img src="/imagens/login-de-usuario (1).png" alt="login" className={styles.imgLogin} />
        </a>
        <h1>VillaMusic</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome completo:</label>
        <input type="text" name="nome" value={form.nome} onChange={handleChange} />

        <label htmlFor="email">E-mail:</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />

        <label htmlFor="telefone">Telefone:</label>
        <input type="text" name="telefone" value={form.telefone} onChange={handleChange} required />

        <label htmlFor="senha">Senha:</label>
        <input type="password" name="senha" value={form.senha} onChange={handleChange} required />

        <label htmlFor="confirmarSenha">Confirmação de senha:</label>
        <input type="password" name="confirmarSenha" value={form.confirmarSenha} onChange={handleChange} required />

        <button type="submit">Cadastrar</button>
      </form>

      {mensagem && <div className={styles.msg}>{mensagem}</div>}
    </div>
  );
}
