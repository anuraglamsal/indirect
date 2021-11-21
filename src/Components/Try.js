import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Indo_image from "../assets/Indo.png";
import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Slide";
import "./Try.css";
import { Link } from "react-router-dom";
import Rating from "react-rating";
import { useState } from "react";

function Try() {
  const [rating, setRating] = useState(0);

  function _rating(value) {
    setRating(value);
  }

  function store_rating() {
    //todo : store in db
  }

  return (
    <div>
      <SideBar />
      <div class="container__profile">
        <header></header>
        <Rating onClick={_rating} fractions={4} />
        <button className=" rate__submit" onClick={store_rating}>
          {" "}
          Rate{" "}
        </button>
        <div class="main">
          <div class="row">
            <div class="left col-lg-4">
              <div class="photo-left">
                <img
                  class="photo"
                  src="https://indonesiaexpat.id/wp-content/uploads/2018/01/Roving-Toy-Store.jpg"
                />
              </div>
              <h4 class="name">John Goes</h4>
              <p class="info">Krupuk Production</p>
              <p class="info">+123 90954678</p>
            </div>
            <p class="desc">The best krupuks and crackers in town.</p>
          </div>
          <div class="right col-lg-8">
            <Link to={"/user"}>
              <span class="follow">Contact</span>
            </Link>
            <div class="row_gallery">
              <div class="col-md-4">
                <img src="https://images.squarespace-cdn.com/content/v1/5d9aba8504a05a7cc222de1b/1571583123179-AD1S2WTI9WLNUNM3CTDQ/Krupuk-Palembang-Ikan-.jpg" />
              </div>
              <div class="col-md-4">
                <img src="https://cdn.tasteatlas.com/images/dishes/90e92485378347d09d2059bce2f9df66.jpg?w=600&h=450" />
              </div>
              <div class="col-md-4">
                <img src="https://lh3.googleusercontent.com/fife/AAWUweUTO-5SQ2airm2L1SIP2WchFTroRxV6sUb8l6weuSpbrHS6CEjAZtijAnrRon34FhfcCKQ-tybyIwV77blCPElRoy9i6-BtFrVBrGJCh7MyXIHlPee5xESacxXrNJP0HrYfGoyqtGrLZVPaYBQ9BJCr-bK8ypccRqOLwYf7NYmR4PNHfTOQE3wipgTIunNfJq12p66fK-7QUU42SfXe5eKgLzzTdGFZLArXF4sk_I6lRSjCi76Bc_UU8pKOm-x3XxUOGIcIrggr_c5F8ola1UHgDcgbOyzkAWr_tSILizI-y1AluFeqBF3dMwP94bJEXOTqYWrB3VGsPxNUuKkH5flI1rVvn5Nz--l3RxsCeKisce5y2yzoS3ww8j8BVCINLsyhAd4nYvqMZacA2GLBcHKDZikXSAlK3-EgOpPO-kTrKyaKRomRebGkHRzXF159wRdmUiaErysTELLZCmyt4IvLyeumHWEZcNoIiYkSbeE5RQNXHlNiXiNBqR7VzvpXshuEhlQ1xzgVTlxLG9GUHDixrX51wCRYicDXqgNR-vzdu0mE06lkC7ywnqgJ1E_QEsnkRf3BlJEDeo0Y0o3fQn3DMlhzNnrGDC5rsAGF0MDbYW7ed1KvaaZq4O_qAYVzyf9w5-11bWWFXEmRKgSlxhAYnUG80qA2_D3r8ZpQadkUjznbeyfQYBl-0RX-ikDdQ4JMDScuZ1nPNEUgzylRROtjRdpwW6_pKAiB=w700-h471?authuser=1" />
              </div>
              <div class="col-md-4">
                <img src="https://img.jakpost.net/c/2016/05/30/2016_05_30_5444_1464582305._large.jpg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Try;
