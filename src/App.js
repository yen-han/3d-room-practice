import "./App.css";
import * as THREE from "three";
import Experience from "./Experience/Experience";
import { useEffect } from "react";
function App() {
  useEffect(() => {
    const canvas = document.querySelector(".experience-canvas");
    const experience = new Experience(canvas);
  }, []);
  return (
    <div className="experience">
      <canvas className="experience-canvas"></canvas>
    </div>
  );
}

export default App;

// 2:15:46
// Why copy draco foloder   to public folder?
