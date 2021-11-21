import NavBar from "./NavBar";
import SideBar from "./SideBar";
import "./Signup.css";
import ChatPage from "./ChatPage";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();

  function onsubmit(event) {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, event.target[2].value, event.target[6].value)
      .then(userCredential => {
        try {
          addDoc(collection(db, "users"), {
            firstname: event.target[0].value,
            lastname: event.target[1].value,
            email: event.target[2].value,
            address: event.target[3].value,
            pincode: event.target[4].value,
            role: event.target[5].value,
            uid: userCredential.user.uid,
          });
        } catch (e) {
          alert(e);
        }
        navigate("../user", { replace: true });
      })
      .catch(error => {
        alert(error.message);
      });
  }

  return (
    <div>
      {" "}
      <div className="have_already">
        Already Have an Account?
        <Link to={"/signin"}>
          <button class="login__submit">Sign In</button>
        </Link>
      </div>
      <div className="signup__form__container">
        <div>
          <form className="signup__form" onSubmit={onsubmit}>
            <h1 className="login__head">Sign Up Below</h1>
            <div className="signup__label">First Name</div>
            <input className="signup__field" type="text" required />
            <div className="signup__label">Last Name</div>
            <input className="signup__field" type="text" required />
            <div className="signup__label">Email</div>
            <input className="signup__field" type="email" required />
            <div className="signup__label">Address</div>
            <input className="signup__field" type="text" required />
            <div className="signup__label">Pincode</div>
            <input className="signup__field" type="text" required />
            <label className="signup__label" for="cars">
              Choose Your Role:
            </label>

            <select className="signup__field" name="cars" id="cars">
              <option value="volvo">Producer</option>
              <option value="saab">Courier</option>
              <option value="mercedes">Consumer</option>
            </select>

            <div className="signup__label">Password</div>
            <input className="signup__field" type="password" required />
            <input className="login__submit" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
