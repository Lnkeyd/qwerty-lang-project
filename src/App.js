import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import About from "./pages/about/About";
import Home from "./pages/home/Home";
import StudySets from "./pages/studySets/StudySets";
import WordOfTheDay from "./pages/wordOfTheDay/WordOfTheDay";
import './styles/general.css'

function App() {
  return (
    <BrowserRouter>
        <div className="App-content">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/word-of-the-day" element={<WordOfTheDay/>}/>
          <Route path="/sets" element={<StudySets/>}/>
        </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
