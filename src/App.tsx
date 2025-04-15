import {
  Routes,
  Route,
} from "react-router-dom";

import './App.css'
import Navbar from './components/Navbar/Navbar'
import CreatorPage from './pages/CreatorPage/CreatorPage';
import ExtensionPage from './pages/ExtensionPage/ExtensionPage';



function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/tree" element={<CreatorPage />} />
        <Route path="/extensions" element={<ExtensionPage />} />
      </Routes>
    </>
  )
}

export default App
