import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
import * as React from "https://cdn.skypack.dev/react@17.0.1";

const App = () => {
  const [breakLength, setBreakLength] = React.useState(5);
  const [sessionLength, setSessionLength] = React.useState(25);
  const [timeLeft, seTtimeLeft] = React.useState(1500);
  const [timingType, setTimingtype] = React.useState("SESSION");
  
  const [play, setPlay] = React.useState(false);
  
  const timeout = setTimeout(() => {
    if(timeLeft && play){
      seTtimeLeft(timeLeft - 1)
    }
  }, 1000);
  
  const handleBreakIncrease = () => {
    if(breakLength < 60){
      setBreakLength(breakLength + 1)
    }
  }
  
  const handleBreakDecrease = () => {
    if(breakLength > 1){
      setBreakLength(breakLength - 1)
    }
  }
  
   const handleSessionIncrease = () => {
    if(sessionLength < 60){
      setSessionLength(sessionLength + 1)
      seTtimeLeft(timeLeft + 60)
    }
  }
  
  const handleSessionDecrease = () => {
    if(sessionLength > 1){
      setSessionLength(sessionLength - 1)
      seTtimeLeft(timeLeft - 60)
    }
  }
  
  const handleReset = () => {
    clearTimeout(timeout);
    setPlay(false);
    seTtimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimingtype("SESSION");
    const audio = document.getElementById("beep");
    audio.pause()
    audio.currentTime = 0;
  }
  
  const handlePlay = () => {
    clearTimeout(timeout);
    setPlay(!play);
  }
  
  const resetTimer = () => {
    const audio = document.getElementById("beep");
    if(!timeLeft && timingType === "SESSION"){
      seTtimeLeft(breakLength * 60)
      setTimingtype("BREAK")
      audio.play()
    }
    if(!timeLeft && timingType === "BREAK"){
      seTtimeLeft(sessionLength * 60)
      setTimingtype("SESSION")
      audio.pause()
      audio.currentTime = 0;
    }
  }
  
  const clock = () => {
    if(play){
      timeout
      resetTimer()
    }else {
      clearTimeout(timeout)
    }
  }
  
  React.useEffect(() => {
    clock()
  }, [play, timeLeft, timeout])
 
  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  }
  
  const title = timingType === "SESSION" ? "Session" : "Break";

  return (
   <div>
    <div className="wrapper">
      
      {/* HEADING */}
      <h2>25 + 5 Clock</h2>
      
      {/* SECTION 1A */}
      <div className="break-session-length">
         <div>
           <h3 id="session-label">Session</h3>
           <div>
            <button disabled={play} onClick={handleSessionIncrease} id="session-increment">+</button>
              <strong id="session-length">{sessionLength}</strong>
            <button disabled={play} onClick={handleSessionDecrease} id="session-decrement">-</button>
          </div>
         </div>
      {/* SECTION 2A */}
        <div>
          <h3 id="break-label">Break</h3>
          <div>
            <button disabled={play} onClick={handleBreakIncrease} id="break-increment">+</button>
              <strong id="break-length">{breakLength}</strong>
            <button disabled={play} onClick={handleBreakDecrease} id="break-decrement">-</button>
          </div>
         </div>
      </div>
      
      {/* SECTION 2 */}
      <div className="timer-wrapper">
        <div className="timer">
           <h2 id="timer-label">{title}</h2>
           <h3 id="time-left">{timeFormatter()}</h3>
        </div>
        
      {/* SECTION 2 */}
        <button onClick={handlePlay} id="start_stop"> {play ? "||" : "▶"} </button>
        <button onClick={handleReset} id="reset">O
        </button>
      </div>
    </div>
    <audio
      id="beep" 
      preload="auto"
      src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
    />
    </div>);
}

ReactDOM.render(<App />, document.getElementById("app"))
