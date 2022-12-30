import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import Confetti from "react-confetti"



function App() {
  const [tiempo, setTiempo] = useState({});
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  // const [year, setMostrarMensaje] = useState(false);
  let year = new Date().getFullYear()

  const getRemainTime = (deadline) => {
    let now = new Date(),
      remainTime = (new Date(deadline) - now + 1000) / 1000,
      remainSeconds = ("0" + Math.floor(remainTime % 60)).slice(-2),
      remainMinutes = ("0" + Math.floor((remainTime / 60) % 60)).slice(-2),
      remainHours = ("0" + Math.floor((remainTime / 3600) % 24)).slice(-2),
      remainDays = Math.floor(remainTime / (3600 * 24));

    return {
      remainTime,
      remainSeconds,
      remainMinutes,
      remainHours,
      remainDays,
    };
  };

  const countDown = (deadline) => {
    const timeUpdate = setInterval(() => {
      let time = getRemainTime(deadline);
      setTiempo(time);
      
      // Finalizar el contador
      if (time.remainTime <= 1) {
        clearInterval(timeUpdate);
        setMostrarMensaje(true);
        setTiempo({
          remainTime: 0,
          remainSeconds: 0,
          remainMinutes: 0,
          remainHours: 0,
          remainDays: 0,
        });
      }
    }, 1000);

  };

  useEffect(() => {
    countDown("Jan 01 2023 00:00:00 GMT-0500");
    // countDown("Dec 28 2022 00:00:00 GMT-0500");
  }, []);

  // console.log(getRemainTime(""));
  return (
    <>
    <div className="App">
      {mostrarMensaje && <Confetti style={{ magin: 0, padding: 0, width: "99%", height: "100vh"}}/>}
      <header className="App-header">
        <h4>NEW YEAR 2023</h4>
      </header>
      <main>
        <div className="dias">
          <div className="contenido-fecha">{tiempo?.remainDays}</div>
          <span>DÍAS</span>
        </div>
        <span className="dos-puntos">:</span>

        <div className="horas">
          <div className="contenido-fecha">{tiempo?.remainHours}</div>
          <span>HORAS</span>
        </div>
        <span className="dos-puntos">:</span>

        <div className="minutos">
          <div className="contenido-fecha">{tiempo?.remainMinutes}</div>
          <span>MINUTOS</span>
        </div>
        <span className="dos-puntos">:</span>
        <div className="segundos">
          <div className="contenido-fecha">{tiempo?.remainSeconds}</div>
          <span>SEGUNDOS</span>
        </div>
      </main>
      {mostrarMensaje &&

        <div className="mensaje">
          <button onClick={() => setMostrarMensaje(false)}>
            X
          </button>
          <h1>¡Happy New Year 2023!</h1>
          <span>&#127882;</span>
        </div>
      }
    </div>
    <footer>
      <p><span id="desarrollador">Desarrollado por Jean Rodriguez - </span> &copy; Todos los derechos reservados {year} </p>
      
    </footer>
    </>
  );
}

export default App;
