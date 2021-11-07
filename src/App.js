import { useState, useEffect, useRef } from 'react';
import ReactDOM from "react-dom";
import video from './videoplayback.mp4';
import './App.css';

function App() {
  const vidRef = useRef(null);

  //Height given in assignment document as defined below.
  const videoHeight = 300, videoWidth = 200;

  const [diffX, setDiffX] = useState(0)
  const [diffY, setDiffY] = useState(0)
  const [left, setLeft] = useState(320)
  const [top, setTop] = useState(450)
  const [isDragging, setIsDragging] = useState(false)
  const [styles, setStyles] = useState({})

  // useEffect(() => {
  //   vidRef.current.pause();
  // }, [isDragging])

  const detectDrag = (event) => {
    console.log("screenX: ", event);
    console.log("screenX: ", event.screenX, "screenY: ", event.screenY);
    console.log("BoundX: ", event.currentTarget.getBoundingClientRect().left, "screenY: ", event.currentTarget.getBoundingClientRect().top);
    console.log("innerWidth: ", window.innerWidth, "innerHeight: ", window.innerHeight);
    setDiffX((event.screenX || event.touches[0].screenX) - event.currentTarget.getBoundingClientRect().left);
    setDiffY((event.screenY || event.touches[0].screenY) - event.currentTarget.getBoundingClientRect().top)
    setIsDragging(true);
  }

  const continueDrag = (event) => {
    if(isDragging) {
      setLeft((event.screenX || event.touches[0].screenX) - diffX);
      setTop((event.screenY || event.touches[0].screenY)- diffY);
      //console.log("Dragging ScreenX: ", event.screenX, " ScreenY: ", event.screenY);
      setStyles({
                left: alignLeft(left),
                top: alignTop(top)
      });
      vidRef.current.pause();
    }
    //vidRef.current.pause();
  }    

  const endDrag = (event) => {
    if(!(event && event.touches)){
      if(isDragging){
        vidRef.current.play();
      }
      vidRef.current.play();
    }
    setIsDragging(false);
  }

  const endDrag2 = (event) => {
    // if(isDragging){
    //   vidRef.current.play();
    // }
    // if(!(event && event.touches)){
    //   vidRef.current.play();
    // }
    setIsDragging(false);
  }

  //added to detech clicks outside of window while dragging.
//   document.addEventListener("mouseup", (event) => {
//     const flyoutElement = ReactDOM.findDOMNode(document.getElementById("App"));
//     let targetElement = event.target; // clicked element
//     console.log("targetElement: ",targetElement, " app element: ",  flyoutElement);
//     // do {
//     //     if (targetElement == flyoutElement) {
//     //         // This is a click inside. Do nothing, just return.
//     //         document.getElementById("flyout-debug").textContent = "Clicked inside!";
//     //         return;
//     //     }
//     //     // Go up the DOM
//     //     targetElement = targetElement.parentNode;
//     // } while (targetElement);

//     // // This is a click outside.
//     // document.getElementById("flyout-debug").textContent = "Clicked outside!";
// }, false);

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
          <video ref={vidRef} width={videoWidth} height={videoHeight} controls>
            <source src={video} type="video/mp4"/>
          </video>    
        </div>
      </header>
    </div>
  );
}

export default App;
