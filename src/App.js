import { useEffect } from 'react';
import ReactDOM from "react-dom";
import video from './videoplayback.mp4';
import './App.css';

function App() {
  // useEffect(() => {
  //   playVideo();
  // }, [vid])
   
  // // var vid = ReactDOM.findDOMNode(document.getElementById("myVideo"));
  // // console.log(vid);
  // // function playVideo() {
  // //   vid.play();
  // // }

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Create new page
        </a> */}
        <div className="videoContainer">
          <video width="300" height="200" autoplay controls>
            <source src={video} type="video/mp4"/>
          </video>    
        </div>
      </header>
    </div>
  );
}

export default App;
