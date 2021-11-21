import { slide as Menu } from "react-burger-menu";
import "./SideBar.css";
import { Link } from "react-router-dom";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  limit,
  orderBy,
  onSnapshot,
  startAfter,
} from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
function SideBar() {
  const auth = getAuth();
  const navigate = useNavigate();
  function logout() {
    signOut(auth)
      .then(() => {
        navigate("../home", { replace: true });
      })
      .catch(error => {
        console.log(error.message);
      });
  }

  return (
    <Menu left disableAutoFocus>
      <Link to="/user"> Profile </Link>

      <Link to="/upload"> Upload </Link>
      <Link to="/search"> Search </Link>

      <button className="chat__logout" onClick={logout}>
        LOGOUT
      </button>
    </Menu>
  );
}

export default SideBar;
