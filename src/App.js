import { useState, useEffect } from 'react';
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

  const [diffX, setDiffX] = useState(0)
  const [diffY, setDiffY] = useState(0)
  const [left, setLeft] = useState(320)
  const [top, setTop] = useState(450)
  const [isDragging, setIsDragging] = useState(false)
  const [styles, setStyles] = useState({})

  const detectDrag = (event) => {
    console.log("screenX: ", event.screenX, "screenY: ", event.screenY);
    console.log("BoundX: ", event.currentTarget.getBoundingClientRect().left, "screenY: ", event.currentTarget.getBoundingClientRect().top);
    setDiffX(event.screenX - event.currentTarget.getBoundingClientRect().left);
    setDiffY(event.screenY - event.currentTarget.getBoundingClientRect().top)
    setIsDragging(true);
  }

  const continueDrag = (event) => {
    if(isDragging) {
      setLeft(event.screenX - diffX);
      setTop(event.screenY - diffY);
      console.log("Dragging");
      setStyles({
                left: left,
                top: top
            });
    }
  }    

  const endDrag = () => {
    setIsDragging(false);
    console.log("Drag End!");
  }
  
  return (
    <div className="App" onMouseMove={(e) => continueDrag(e)}>
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
        <div className="videoContainer" style={styles} onMouseDown={(e) => detectDrag(e)} onMouseMove={(e) => continueDrag(e)} onMouseUp={() => endDrag()}>
          <video width="300" height="200" autoplay controls>
            <source src={video} type="video/mp4"/>
          </video>    
        </div>
      </header>
    </div>
  );
}

export default App;
