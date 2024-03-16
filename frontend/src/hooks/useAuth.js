// Hook de Autentificação;

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useAuth = () => {
  const { user } = useSelector((state) => state.auth);

  // verificando se usuário esta logado
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if(user) {
      setAuth(true);
    }
    else {
      setLoading(false);
    }

    setLoading(false);
  }, [user]);

  return {auth,loading};
};