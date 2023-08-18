/// src/App.js
import React from 'react';
//import './styles.css'; // Import your custom styles
import Board from './components/Board';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Kanban Board</h1>
      </header>
      <main className="app-content">
        <Board />
      </main>
    </div>
  );
}

export default App;

