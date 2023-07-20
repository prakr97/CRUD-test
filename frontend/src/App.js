import logo from './logo.svg';
import './App.css';
import FormPage from './component/FormPage';
import NavBar from './component/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AllUser } from './component/AllUser';


function App() {
  return (
    <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/create" element={<FormPage /> } />
      <Route path="/" element={<AllUser /> } />

    </Routes>
  </BrowserRouter>
  );
}

export default App;
