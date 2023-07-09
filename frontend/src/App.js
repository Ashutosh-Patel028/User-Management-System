import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import {BrowserRouter, Routes , Route} from "react-router-dom"
import Home from "./Pages/Home"
import AddEdit from './Pages/AddEdit';
import View from './Pages/View';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className="App">
        <ToastContainer position='top-center'/>
        <Routes>
          <Route exact element={<Home/>} path="/"/>
          <Route element={<AddEdit/>} path="/addUser"/>
          <Route element={<AddEdit/>} path="/update/:id"/>
          <Route element={<View/>} path="/view/:id"/>
        </Routes>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
