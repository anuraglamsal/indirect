import { Carousel } from "react-carousel-minimal";

function App() {
  const data = [
    {
      image: "https://imgur.com/rCXiTNa.jpg",
      caption: "Local Art",
    },
    {
      image: "https://imgur.com/gySj9jn.jpg",
      caption: "Vegetables and Fruits",
    },
    {
      image: "https://imgur.com/HBfG0hg.jpg",
      caption: "Handcrafts",
    },
    {
      image: "https://imgur.com/eAlw6u8.jpg",
      caption: "Krepocs",
    },
    {
      image: "https://imgur.com/h62H1V0.jpg",
      caption: "Sweets",
    },
    {
      image: "https://imgur.com/DqVUQvK.jpg",
      caption: "Shoes",
    },
    {
      image: "https://imgur.com/q4FhTFa.jpg",
      caption: "Snacks",
    },
    {
      image: "https://imgur.com/G0gQ35N.jpg",
      caption: "Textile",
    },
  ];

  const captionStyle = {
    fontSize: "2em",
    fontWeight: "bold",
  };
  const slideNumberStyle = {
    fontSize: "20px",
    fontWeight: "bold",
  };
  return (
    <div className="App">
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            padding: "0 20px",
          }}
        >
          <Carousel
            data={data}
            time={2000}
            width="850px"
            height="500px"
            captionStyle={captionStyle}
            radius="10px"
            slideNumberStyle={slideNumberStyle}
            captionPosition="bottom"
            automatic={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            thumbnailWidth="100px"
            style={{
              textAlign: "center",
              maxWidth: "2000px",
              maxHeight: "500px",
              margin: "40px auto",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
