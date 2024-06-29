import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
const Home = () => {
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find Real Estate & Get Your Draem Place</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            fugit dolorum cumque odit, cum ab quidem nesciunt dicta esse nam
            blanditiis facere.
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years Of Experince</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
};

export default Home;
