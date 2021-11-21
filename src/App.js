import "./App.css";
import Signin from "./Components/Signin";
import Home from "./Components/Home";
import Producer from "./Components/Producer";
import Search from "./Components/Search";
import Upload from "./Components/Upload";
import SignUp from "./Components/Signup";
import ChatPage from "./Components/ChatPage";
import Try from "./Components/Try";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [loggedin, setLoggedin] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setLoggedin(true);
      } else {
        setLoggedin(false);
      }
      setLoading(false);
    });
  });

  if (!loading) {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={loggedin ? <Navigate to="/user" /> : <Home />} />
          <Route path="/signin" element={loggedin ? <Navigate to="/search" /> : <Signin />} />
          <Route path="/home" element={loggedin ? <Navigate to="/user" /> : <Home />} />
          <Route path="/producer" element={loggedin ? <Producer /> : <Navigate to="/home" />} />
          <Route path="/search" element={loggedin ? <Search /> : <Navigate to="/home" />} />
          <Route path="/upload" element={loggedin ? <Upload /> : <Navigate to="/home" />} />
          <Route path="/signup" element={loggedin ? <Navigate to="/user" /> : <SignUp />} />
          <Route path="/search" element={<Search />} />
          <Route path="/try" element={<Try />} />
          <Route path="/user" element={loggedin ? <ChatPage /> : <Navigate to="/home" />} />
        </Routes>
      </Router>
    );
  } else {
    return <div></div>;
  }
}

export default App;
