import "./Register.css";

// Components
import { Link } from 'react-router-dom';
import Message from "../../components/Message";


// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { register, reset } from "../../slices/authSlice";

const Register = () => {
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");

  // Dispach libera o uso do REDUX
  const dispatch = useDispatch();

  // Pega qualquer state do Redux (nesse caso do auth)
  const { loading, error } = useSelector((state) => state.auth);

  // Previnido o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    const user = { 
      name, 
      email,
      password,
      confirmPassword,

    };

    console.log(user);

    // recebendo os Dados do usuário e aguardando resposta
    dispatch(register(user));

  };
  
  // Limpando todo States do auth
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div id="register">
      <h2>Reactgram</h2>
      <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos.</p>
      <form onSubmit={handleSubmit}>
        <input type="text" 
        placeholder="Nome" 
        onChange={(e) => setName(e.target.value)}
        value={name || ""} 
        /> 
        <input type="text" 
        placeholder="E-mail" 
        onChange={(e) => setEmail(e.target.value)}
        value={email || ""} 
        /> 
        <input type="text" 
        placeholder="Senha" 
        onChange={(e) => setPassword(e.target.value)}
        value={password || ""}
        />
        <input type="text" 
        placeholder="Confirme a Senha" 
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword || ""}
        />
        {!loading && <input type="submit" value="Cadastrar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {error && <Message msg={error} type= "error"/>}
      </form>
      <p>
        Já tem conta? <Link to="/login"> Clique aqui</Link>
      </p>
    </div>
  )
}

export default Register