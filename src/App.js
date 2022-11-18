import React from "react";
import NavBar from "./components/NavBar/NavBar.js";
import { Route, Routes } from 'react-router-dom'
import Footer from "./components/Footer/Footer.js";
import './app.css'
import Home from "./pages/Home/Home.js";
import Games from "./pages/Games/Games.js";
import Developers from "./pages/Developers/Developers.js";
import Content_detail_games from "./pages/Content_detail_game/Content_detail_games.js";
import Content_detail_developer from "./pages/Content_detail_developer/Content_detail_developer.js";
import Platforms from "./pages/Platforms/Platforms.js";
import Content_detail_platform from "./pages/Content_detail_platform/Content_detail_platform.js";
import Stores from "./pages/Stores/Stores.js";
import Content_detail_store from "./pages/Content_detail_store/Content_detail_store.js";
import NotFound from './components/NotFound/NotFound'

function App() {


  return (
    <>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games/*" element={<Games />} />
          <Route path="/game/:id" element={<Content_detail_games />} />
          <Route path="/developers/*" element={<Developers />} />
          <Route path="/developer/:id" element={<Content_detail_developer />} />
          <Route path="/platforms/*" element={<Platforms />} />
          <Route path="/platform/:id" element={<Content_detail_platform />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/store/:id" element={<Content_detail_store />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
