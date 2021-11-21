import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Indo_image from "../assets/Indo.png";
import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Slide";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="title_container">
        <Fade>
          <Slide top>
            <div className="home_title">
              Welcome to<div className="title_name">IN±DIRECT</div>
            </div>
          </Slide>
        </Fade>
        <div className="info_text_box">
          <Slide left>
            <div className="info_text">
              A platform that brings all involved in a trade at one place. We maintain a direct
              contact between the producer, the couriers and the consumers all indirectly through
              web. Producers can create their niche community, consumers can find local producers of
              their needs, and couriers are there for home-deliveris and carriage. <br /> The more
              you engage through the platform, the more opportunities you will get. <br />
              <br /> Please Sign In to Continue.
              <br />
              <div className="sign_in_up_container">
                <Link to={"/signin"}>
                  <button class="login__submit">Sign In </button>
                </Link>
                <Link to={"/signup"}>
                  <button class="login__submit">Sign Up</button> Up
                </Link>
              </div>
            </div>
          </Slide>
        </div>

        <div className="indo_image">
          <Slide right>
            <img src={Indo_image} alt="Logo" />
          </Slide>
        </div>
      </div>
    </div>
  );
}

export default Home;
