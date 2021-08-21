import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavigationBar, {Button} from './Navigation';

let buttons = [
    new Button("Home", "/"),
    new Button("Sign Up", "/signup"),
    new Button("Minecraft", "/minecraft"),
    new Button("Call of Duty", "/cod"),
    new Button("Pokemon", "/pokemon")
]

function App() {
  return (
    <div className="App">
      <NavigationBar content={buttons}/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
