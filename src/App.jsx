import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import AnimeDetails from './pages/AnimeDetails';
import Watch from './pages/Watch';
import Favorites from './pages/Favorites';
import History from './pages/History';
import GenreResults from './pages/GenreResults';

import MovieDetails from './pages/MovieDetails';
import MovieWatch from './pages/MovieWatch';
import MovieSearchResults from './pages/MovieSearchResults'; 
import MoviesHome from './pages/MoviesHome'; 

function App() {
  const [activeApp, setActiveApp] = useState('movies');

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#008080] flex flex-col relative overflow-hidden font-sans select-none">
        
        <Navbar activeApp={activeApp} setActiveApp={setActiveApp} />

        <main className="flex-grow pt-10 p-4 overflow-y-auto custom-scrollbar">
          <Routes>
            <Route path="/" element={<MoviesHome />} />
            <Route path="/anime" element={<Home />} /> 
            <Route path="/search" element={<SearchResults />} />
            <Route path="/anime/:id" element={<AnimeDetails />} />
            <Route path="/watch/:id/:episode" element={<Watch />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/history" element={<History />} />
            <Route path="/genre/:genre" element={<GenreResults />} />
            <Route path="/movies/search" element={<MovieSearchResults />} /> 
            <Route path="/movies/details/*" element={<MovieDetails />} /> 
            <Route path="/movies/watch/*" element={<MovieWatch />} />
          </Routes>
        </main>

        <div className="fixed bottom-4 right-6 text-white/20 text-[11px] pointer-events-none font-mono text-right uppercase tracking-tighter">
          AnimeStream Build 2600.xpclient.010817-1148 <br />
          Para propósitos de evaluación solamente.
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;