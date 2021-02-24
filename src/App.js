import React, { useCallback, useRef, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Link, NavLink, Switch } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion';
import { MeshDistortMaterial, MeshWobbleMaterial, OrbitControls, useGLTFLoader } from 'drei';
import { Physics, useBox, usePlane, useSphere } from 'use-cannon';
import { Canvas } from 'react-three-fiber'
import { Sound } from 'react-sound';
import abc from './audio/SuckinOnyaTits.mp3';




const pageVariants = {
  in: {
    opacity: 1
  },
  out: {
    opacity: 0
  }
}

const pageTransitions = {
  type: "tween",
  duration: 1
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Il max è escluso e il min è incluso
}

function Box(props) {
  let size = [50,50,50]
  let pos = [getRandomInt(-500,500),200,0];
  const [ref] = useBox(() => ({ mass: 10, rotation: [Math.floor(Math.random() * 360), Math.floor(Math.random() * 360), Math.random() * 360], position: pos, args: size}))
  return (
    <mesh ref={ref} position={pos}  visible userData={{ test: "hello" }} castShadow >
      <boxBufferGeometry attach="geometry" args={size}></boxBufferGeometry>
      <meshLambertMaterial attach="material" color="green" transparent metalness={1}></meshLambertMaterial> 
    </mesh>
  )
}


function  Plane(props) {
  const size = [1000,1000,10];
  const pos = [0,-190,0]
  const [ref] = usePlane(() => ({ position: pos, rotation: [-Math.PI/2,0,0], args: size}))
  return (
    <mesh ref={ref}  position={pos} rotation={[-Math.PI/2,0,0]}>
      <planeBufferGeometry attach="geometry" args={size}></planeBufferGeometry>
      <meshLambertMaterial attach="material" color="white"></meshLambertMaterial>
    </mesh>
  )
}

function MegaBall(props) {
  const size = [50,50,50];
  const pos = [0, 150, 0 ];
  const [ref] = useSphere(() => ({ position: pos, args: size}))
  
  return(
    <mesh ref={ref} position={pos}>
      <sphereBufferGeometry attach="geometry" args={size}></sphereBufferGeometry>
      <meshLambertMaterial attach="material" color="red"></meshLambertMaterial>
    </mesh>
  )
}

function Wrap(props) {
  const ref = useRef()
  const [items, set] = useState([])
  const handleClick = useCallback(e => set(items => [...items, '']), [])

  return (
    <Canvas className="wrap" camera={{ position: [0,0,-250] }} onClick={handleClick}>
      <ambientLight intensity={.5} angle={90}></ambientLight>
      {/* <OrbitControls></OrbitControls> */}
      <Physics gravity={[0, -300, 0]}>
      {/* <rectAreaLight width={3} height={3} color='white' intensity={5.6} position={[0,10,0]} angle={90} /> */}
      <Plane></Plane>
      {items.map((key, index) => (
        <Box key={index} position />
      ))}
      </Physics>
    </Canvas>
  )
}

class Music extends React.Component {
  constructor(props) {
    super(props);
    this.audio_tag = React.createRef();
  }

  render() {
    return (
      <audio
        id='music'
        ref={this.audio_tag}
        controls>
        <source type="audio/mp3" src={abc} />
      </audio>
    )
  }
}

function Home() {

  return (
    <motion.div className="section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} variants={pageVariants} transition={pageTransitions}>
      <h1>Hi,</h1>
      <h2>I'm Michele and I really like <br /> <Link id="making_music" to="/drum">making music</Link> and hangin' out with <br />friends </h2>

      <p>JK, I have no friends, that's why I code. :D</p>
      <div className="hungry">
        <p><b>U hungry?</b> Click anywhere to get some Erbazzone®</p>
      </div>

    </motion.div>
  )
}

function Drum() {
  return (
    <motion.div className="section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} variants={pageVariants} transition={pageTransitions}>
      <h1>Are</h1>
      <h2>you ready to make some beats ? </h2>
      <Music></Music>
      <p>MPCiki qui</p>
    </motion.div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Wrap></Wrap>
        <AnimatePresence>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/drum" component={Drum} />
          </Switch>
        </AnimatePresence>
      </div>
    </BrowserRouter>
  )
}

export default App;
