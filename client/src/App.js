import './App.css';
import Main from "./Main.js"
import Edit from "./edit.js"
import Add from "./Add.js"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path="/Edit/:id" element={<Edit />}></Route>
          <Route path="/Add" element={<Add />}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
