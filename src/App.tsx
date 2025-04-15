import {
  Routes,
  Route,
} from "react-router-dom";

import './App.css'
import Navbar from './components/Navbar/Navbar'
import CreatorPage from './pages/CreatorPage/CreatorPage';
import ExtensionPage from './pages/ExtensionPage/ExtensionPage';
import HomePage from "./pages/HomePage/HomePage";



function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tree" element={<CreatorPage />} />
        <Route path="/extensions" element={<ExtensionPage />} />
      </Routes>
    </>
  )
}

export default App
