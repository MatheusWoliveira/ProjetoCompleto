import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import logo from '../../assets/logo2.jpg'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Login bem-sucedido');
                navigate('/logado/pgLogado'); 
            } else {
                setMensagem(data.msg || 'Erro ao fazer login.');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            setMensagem('Erro na conexão com o servidor.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.box1}>
                <div className={styles.formContainer}>
                    <div className={styles.logo}>
                        <img src={logo} alt="Logo" />
                    </div>
                    <div className={styles.textos}>
                        <h1 className={styles.bemVindo}>Bem-vindo</h1>
                        <p>Preencha os dados para login</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <label className={styles.label}>Insira o e-mail:</label>
                        <div className={styles.formInp}>
                            <input
                                type="email"
                                className={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <label className={styles.label}>Insira a senha:</label>
                        <div className={styles.formInp}>
                            <input
                                type="password"
                                className={styles.input}
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                        </div>
                        {mensagem && <div>{mensagem}</div>}
                        <button type="submit" className={styles.submitLogin}>Entrar</button>
                        <div className={styles.link}>
                            <p>Não tem conta? <a href="/cadastro">Cadastre-se</a></p>
                        </div>
                    </form>
                </div>
            </div>
            <div className={styles.box2}>
                <div className={styles.caixa}>
                    <h1>Conecte-se e apresente sua música!</h1>
                    <p>Descubra oportunidades infinitas com sua música. Entre nessa com a gente</p>
                </div>
            </div>
        </div>

    );
};

export default Login;