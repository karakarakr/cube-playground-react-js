import { Canvas } from '@react-three/fiber';
import { useState, useEffect } from 'react';

const generateRandomInt = (min, max) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
};

function App() {
  const [xAxis, setXAxis] = useState(0);
  const [yAxis, setYAxis] = useState(0);
  const [zAxis, setZAxis] = useState(0);
  const [scale, setScale] = useState(1);
  const generateColor = () => generateRandomInt(0, 255) / 255;
  const [colorPallete, setColorPallete] = useState({
    r: generateColor(),
    g: generateColor(),
    b: generateColor(),
  });

  const changeColor = () => {
    setColorPallete({
      r: generateColor(),
      g: generateColor(),
      b: generateColor(),
    });
  };

  useEffect(() => {
    const controlCube = (e) => {
      if (e.key === 'ArrowUp') {
        setScale((prev) => prev + 0.1);
      }
      if (e.key === 'ArrowDown') {
        setScale((prev) => prev - 0.1);
      }
    };

    const controlMouseCube = (e) => {
      setXAxis(e.clientY * 0.002);
      setYAxis(e.clientX * 0.002);
    };

    const spinWheelCube = (e) => {
      if (e.deltaX > 0) setYAxis((prev) => prev + 0.025);
      if (e.deltaX < 0) setYAxis((prev) => prev - 0.025);
      if (e.deltaY > 0) setXAxis((prev) => prev + 0.025);
      if (e.deltaY < 0) setXAxis((prev) => prev - 0.025);
    };

    window.addEventListener('keydown', controlCube);
    window.addEventListener('mousemove', controlMouseCube);
    window.addEventListener('wheel', spinWheelCube);
    console.log('Added event');
  }, []);

  return (
    <div id="canvas-container">
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight color={'yellow'} position={[0, 2, 5]} />
        <mesh
          position={[0, 0, 0]}
          rotation={[xAxis, yAxis, zAxis]}
          scale={[scale, scale, scale]}
          onClick={changeColor}
        >
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial
            color={[colorPallete.r, colorPallete.g, colorPallete.b]}
          />
        </mesh>
      </Canvas>
    </div>
  );
}

export default App;
