import { useState } from "react";
import { query, where, collection, getFirestore, getDocs } from "firebase/firestore";
import "./Search.scss";
import SideBar from "./SideBar";
import Carousel from "./Carousel";
import logo from "./logo1.png"; // with import

import { FaSearch } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
function Search() {
  const [value, setValue] = useState("");
  const [urls, setURLs] = useState([]);
  const [progress, setProg] = useState(false);
  const [load_counter, setCounter] = useState(0);
  const [image_amount, setAmount] = useState(0);

  async function search_tags(event) {
    event.preventDefault();
    setProg(true);
    setURLs([]);
    const db = getFirestore();
    const q = query(collection(db, "photos"), where("tags", "array-contains", value));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size == 0) {
      alert("No results to show.");
      setProg(false);
    } else {
      var arr = [];
      setAmount(querySnapshot.size);
      setCounter(0);
      querySnapshot.forEach(doc => {
        arr.push(doc.data().url);
      });
      setURLs(arr);
    }
  }

  function handleChange(event) {
    event.preventDefault();
    console.log(event.target.value);
    setValue(event.target.value);
  }

  function imageLoaded() {
    if (load_counter + 1 == image_amount) {
      setProg(false);
    } else {
      setCounter(load_counter + 1);
    }
  }

  return (
    <div>
      <SideBar />
      <div className="search__container">
        <form onSubmit={search_tags}>
          <input className=" search__field" type="text" value={value} onChange={handleChange} />
          <input className=" search__submit" type="submit" value="Search" />
        </form>
      </div>

      <div className="grid-container">
        <div
          class="    card__container
"
        >
          {urls.map(url => (
            <div class="card">
              <div class="card__title">
                <div class="icon"></div>
                <h3>TAG HOLDER</h3>
              </div>
              <div class="card__body">
                <div class="half">
                  <div class="featured_text">
                    <h1>Product Name</h1>

                    <p class="price">$210.00</p>
                  </div>
                  <div class="image">
                    <div>
                      {" "}
                      <div>
                        <img src={url} onLoad={imageLoaded} />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="half">
                  <div class="description">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptatem nam
                      pariatur voluptate perferendis, asperiores aspernatur! Porro similique
                      consequatur, nobis soluta minima, quasi laboriosam hic cupiditate perferendis
                      esse numquam magni.
                    </p>
                  </div>

                  <div class="reviews"></div>
                </div>
              </div>
              <div class="card__footer">
                <div class="action">
                  <Link to={"/try"}>
                    <button type="button">Contact Seller</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        class="    ad__card__container
"
      >
        <Carousel />
      </div>

      {progress && <progress> searching </progress>}
    </div>
  );
}

export default Search;
