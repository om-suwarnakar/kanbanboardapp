/// src/App.js
import React from 'react';
import Board from './components/Board';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1></h1>
      </header>
      <main className="app-content">
        <Board />
      </main>
    </div>
  );
}

export default App;

