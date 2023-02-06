import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { useState } from "react";
// import { GeneralAuthContext } from "../../context/GeneralContext";
import "./login.scss";
import { GeneralFirebaseContext } from "../../context/GeneralFirabesContext";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const { loginWithEmail, user } = useContext(GeneralFirebaseContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    loginWithEmail(loginInfo.email, loginInfo.password);
    console.log(user);
  };
  return (
    <div>
      {!user ? (
        <div className="login">
          <div className="container">
            <div className="login__inner">
              <h1>Авторизация</h1>
              <form action="" className="form">
                <input
                  value={loginInfo.email}
                  onChange={(e) =>
                    setLoginInfo({ ...loginInfo, email: e.target.value })
                  }
                  type="email"
                  placeholder="Type your email"
                />
                <input
                  value={loginInfo.password}
                  onChange={(e) =>
                    setLoginInfo({ ...loginInfo, password: e.target.value })
                  }
                  type="password"
                  placeholder="Type your password"
                />
                <button onClick={(e) => handleSubmit(e)} type="submit">
                  Войти
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to={"/"} />
      )}
    </div>
  );
}

export default Login;
