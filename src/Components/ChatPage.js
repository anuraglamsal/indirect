import "./Chatpage.css";
import { FaComments } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi"; //Boxicons
import { IconContext } from "react-icons";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
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
import SideBar from "./SideBar";
import { useNavigate } from "react-router-dom";
import Slide from "react-reveal/Slide";
import Indo_image from "../assets/Indo.png";

var test = "MnkBcSRLz8afMaDnJHw10YXQI812 niNXZMkSnKNaqDO791FbmyoowXN2";

function ChatPage() {
  const [message, setMessage] = useState(" ");
  const [messages, setMessages] = useState([]);
  const est = useRef([]);
  const settest = data => {
    est.current = data;
    setMessages(data);
  };
  const [last_document, setdoc] = useState();
  const db = getFirestore();
  const Ref = collection(db, "chats", test, "messages");
  const auth = getAuth();
  const navigate = useNavigate();
  var realtime_messages;

  useLayoutEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    const q = query(Ref, orderBy("time", "desc"), limit(10));
    const snapshot = await getDocs(q);
    var arr = [];
    snapshot.forEach(doc => {
      arr.push(doc);
    });
    settest(arr);
    setdoc(est.current[est.current.length - 1]);
    const q_2 = query(Ref, orderBy("time", "desc"), limit(1));
    realtime_messages = onSnapshot(q_2, querySnapshot => {
      querySnapshot.forEach(doc => {
        if (est.current.length == 0) {
          settest([doc, ...est.current]);
        } else if (doc.id != est.current[0].id) {
          settest([doc, ...est.current]);
        }
      });
    });
  }

  function handleChange(event) {
    event.preventDefault();
    setMessage(event.target.value);
  }

  function isBlank(str) {
    return !str || /^\s*$/.test(str);
  }

  async function storeMessage(event) {
    event.preventDefault();
    var _message = message;
    setMessage(" ");
    console.log(_message.length);
    if (isBlank(_message)) {
      return;
    }
    try {
      await addDoc(Ref, {
        message: _message,
        time: Date.now(),
        uid: getAuth().currentUser.uid,
      });
    } catch (e) {
      console.error(e);
    }
  }

  async function OldMessages() {
    const q = query(Ref, orderBy("time", "desc"), limit(10), startAfter(last_document));
    const snapshot = await getDocs(q);
    snapshot.forEach(doc => {
      settest([...est.current, doc]);
    });
    setdoc(est.current[est.current.length - 1]);
  }

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
    <div>
      <SideBar />

      <Slide up>
        <input className="chat_box_open" id="cb1" type="checkbox" />

        <div className="form__container__dad">
          <div className="form-container">
            {[...messages].reverse().map(messages => (
              <div>
                {messages.data().uid == getAuth().currentUser.uid ? (
                  <div className="chat__sent">
                    {" "}
                    <div>{messages.data().message} </div>
                  </div>
                ) : (
                  <div className="chat__received">
                    {" "}
                    <div>{messages.data().message} </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <form className="form__child" onSubmit={storeMessage}>
            <textarea className="textarea" value={message} onChange={handleChange} />
            <div className="form__child__buttons">
              <input className="chat__submit" type="submit" value="Send" />
            </div>
          </form>
          <button className="chat__old" onClick={OldMessages}>
            {" "}
            Show Old Messages{" "}
          </button>
        </div>
      </Slide>
      <div className="indo_image_chat">
        <Slide right>
          <img src={Indo_image} alt="Logo" />
        </Slide>
      </div>
    </div>
  );
}

export default ChatPage;
