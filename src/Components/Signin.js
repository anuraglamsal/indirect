import NavBar from "./NavBar";
import SideBar from "./SideBar";
import "./Signin.css";
import ChatPage from "./ChatPage";
import { Link } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  browserSessionPersistence,
  setPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [loggedin, setLoggedin] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setLoggedin(true);
      }
    });
  }, []);

  function onsubmit(event) {
    signInWithEmailAndPassword(auth, event.target[0].value, event.target[1].value)
      .then(userCredential => {
        setLoggedin(true);
      })
      .catch(error => {
        console.log(error.message);
      });
    event.preventDefault();
  }

  if (loggedin) {
    navigate("../search", { replace: true });
    return <div></div>;
  }

  return (
    <div>
      <div className="have_already">
        Don't Have An Account?
        <Link to={"/signup"}>
          <button class="login__submit">Sign Up</button>
        </Link>
      </div>
      <div className="login__form__container">
        <div>
          <form className="login__form" onSubmit={onsubmit}>
            <h1 className="login__head">Sign In to Continue </h1>
            <div className="login__label">EMAIL</div>
            <input className="login__field" type="email" />
            <div className="login__label">PASSWORD</div>
            <input className="login__field" type="password" />
            <input className="login__submit" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;
