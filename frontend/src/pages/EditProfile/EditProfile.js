import "./EditProfile.css";

import { uploads } from "../../utils/config";

// hooks 
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// redux
import { Profiler, profile, resetMessage } from "../../slices/userSlice";

// compenents
import Message from "../../components/Message";


const EditProfile = () => {

  const dispatch = useDispatch();

  const { user, message, error, loading } = useSelector((state) => state.user);

  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState("");
  const [bio, setBio] = useState("");
  const [previewImage, setPreviewImage] = useState("");

 // Carregando dados do usuário
  useEffect(() => {
    dispatch(profile());

  }, [dispatch]);


  console.log(user);
  const handleSubmit = (e) => {

    e.preventDefault();

  }

  return (
    <div id= "edit-profile">
      <h2>Edite seus dados</h2>
      <p className="subtitle">
        Adicione uma imagem de perfil e conte mais sobre você...
        {/* preview da imagem */}
        <form onSubmit={handleSubmit}>

          <input type="text" 
            placeholder="Nome" 
            onChange={(e) => setName(e.target.value)}
            value={name || ""}/>

          <input type="email" 
            placeholder="E-mail" 
            disabled value={email || ""} />
          
          <label>

            <span>Imagem do Perfil:</span>
            <input type="file" />

          </label>
          <label>

            <span>Bio:</span>
            <input type="text" placeholder = "Descrição do perfil" />

          </label>
          <label>

            <span>Quer alterar sua senha?</span>
            <input type="password" placeholder="Digite sua nova senha" />

          </label>
          <input type="submit" value="Atualizar" />

        </form>
      </p>

    </div>
  );
};

export default EditProfile