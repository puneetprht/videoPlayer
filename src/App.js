import { useState, useRef } from 'react';
import ReactDOM from "react-dom";
import './App.css';

function App() {
  const vidRef = useRef(null);

  //Height given in assignment document as defined below.
  const videoHeight = 300, videoWidth = 200;

  const [diffX, setDiffX] = useState(0)
  const [diffY, setDiffY] = useState(0)
  const [left, setLeft] = useState(10)
  const [top, setTop] = useState(window.innerHeight - videoHeight - 10)
  const [isDragging, setIsDragging] = useState(false)
  const [isTouchDragging, setIsTouchDragging] = useState(false)
  const [styles, setStyles] = useState({left: 10,top: window.innerHeight - videoHeight - 10})

  const detectDrag = (event) => {
    // console.log("screenX: ", event);
    // console.log("screenX: ", event.screenX, "screenY: ", event.screenY);
    // console.log("BoundX: ", event.currentTarget.getBoundingClientRect().left, "screenY: ", event.currentTarget.getBoundingClientRect().top);
    // console.log("innerWidth: ", window.innerWidth, "innerHeight: ", window.innerHeight);
    setDiffX((event.screenX || (event.touches ? event.touches[0].screenX : 0)) - event.currentTarget.getBoundingClientRect().left);
    setDiffY((event.screenY || (event.touches ? event.touches[0].screenY : 0)) - event.currentTarget.getBoundingClientRect().top)
    setIsDragging(true);
    setIsTouchDragging(false);
  }

  const continueDrag = (event) => {
    if(isDragging) {
      setLeft((event.screenX || (event.touches ? event.touches[0].screenX : 0)) - diffX);
      setTop((event.screenY || (event.touches ? event.touches[0].screenY : 0))- diffY);
      //console.log("Dragging ScreenX: ", event.screenX, " ScreenY: ", event.screenY);
      setStyles({
                left: alignLeft(left),
                top: alignTop(top)
      });
      vidRef.current.pause();
      setIsTouchDragging(true);
    }
  }    

  const endDrag = (event) => {
    //console.log("Eventtouches: ", !event.touches);
    if(!(event.touches) && isTouchDragging){              // To handle pause in web view.
      vidRef.current.play();
    }
    //console.log("Dragging: ", isTouchDragging);
    if(event.touches && !isTouchDragging){              // To handle play/pause in mobile view.
      const video = ReactDOM.findDOMNode(document.getElementById("VideoPlayer"));
      if(video.paused){
        vidRef.current.play();
      } else {
        vidRef.current.pause();
      }
    }
    if(isTouchDragging){
      cornerTransition();
    }
    setIsDragging(false);
  }

  const cornerTransition = () => {
    let quadrant = 3, leftLocal, topLocal;
    if( (left + videoWidth/2) >  window.innerWidth/2) {
      if((top + videoHeight/2) >  window.innerHeight/2)
        quadrant = 4;
      else
        quadrant = 1;
    } else {
      if((top + videoHeight/2) >  window.innerHeight/2)
      quadrant = 3;
      else
        quadrant = 2;
    }
    console.log("Quadrant: ", quadrant)
    switch(quadrant){
      case 1 : 
              leftLocal = window.innerWidth - 10;
              topLocal = 0;
              break;
      case 2: 
              leftLocal = 10;
              topLocal = 0;
              break;
      case 3: 
              leftLocal = 10;
              topLocal = window.innerHeight - 10;
              break;
      case 4: 
              leftLocal = window.innerWidth - 10;
              topLocal = window.innerHeight - 10;              
              break;
      default: console.log("Confused!")
    }
    console.log("Left: ", leftLocal, " Top: ", topLocal);
    setStyles({
      left: alignLeft(leftLocal),
      top: alignTop(topLocal),
      transition: '0.5s'
    });
    setLeft(leftLocal);
    setTop(topLocal);
    setDiffX(0);
    setDiffY(0);
  }

  const alignTop = (topPointer) => {
    if(topPointer < 0) {
      return 0
    } else if( topPointer > window.innerHeight - videoHeight - 10) {
      return window.innerHeight - videoHeight - 10
    }
    return topPointer
  }

  const alignLeft = (leftPointer) => {
    if(leftPointer < 10) {
      return 10;
    } else if( leftPointer > window.innerWidth - videoWidth - 10) {
      return window.innerWidth - videoWidth - 10
    }
    return leftPointer
  }
  
  return (
    <div id="App" className="App" onMouseMove={(e) => continueDrag(e)}>
      <header className="App-header">
        <div className="videoContainer" style={styles} 
        onTouchStart={(e) => detectDrag(e)} onTouchMove={(e) => continueDrag(e)} onTouchEnd={(e) => endDrag(e)}
        onMouseDown={(e) => detectDrag(e)} onMouseMove={(e) => continueDrag(e)} onMouseUp={(e) => endDrag(e)}>
          <video id="VideoPlayer" className="video" ref={vidRef} width={videoWidth} height={videoHeight} controls>
            <source src="https://knowledge2020box.s3.ap-south-1.amazonaws.com/testObjs/videoplayback.mp4" type="video/mp4"/>
          </video>    
        </div>
      </header>
    </div>
  );
}

export default App;
