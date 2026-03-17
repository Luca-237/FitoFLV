import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import AnimeDetails from './pages/AnimeDetails';
import Watch from './pages/Watch';
import Favorites from './pages/Favorites';
import History from './pages/History';
import GenreResults from './pages/GenreResults'

function App() {
  return (
    <BrowserRouter>
      {/* Desktop de Windows */}
      <div className="min-h-screen bg-[#008080] flex flex-col relative overflow-hidden font-sans select-none">
        
        {/* Taskbar en la parte superior */}
        <Navbar />

        {/* Workspace: pt-10 para dejar espacio a la Navbar de 40px */}
        <main className="flex-grow pt-10 p-4 overflow-y-auto custom-scrollbar">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/anime/:id" element={<AnimeDetails />} />
            <Route path="/watch/:id/:episode" element={<Watch />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/history" element={<History />} />
            <Route path="/genre/:genre" element={<GenreResults />} />
          </Routes>
        </main>

        {/* Marca de agua nostálgica */}
        <div className="fixed bottom-4 right-6 text-white/20 text-[11px] pointer-events-none font-mono text-right uppercase tracking-tighter">
          AnimeStream Build 2600.xpclient.010817-1148 <br />
          Para propósitos de evaluación solamente.
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;