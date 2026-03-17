import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Play, Settings, LogOut, Folder } from 'lucide-react';
import api from '../api/axios'; // Asegúrate de importar tu API

export default function Navbar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const searchRef = useRef(null);

  // Cerrar menús al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setIsMenuOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowSuggestions(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lógica de Predicción en Búsqueda (Autocompletado)
  useEffect(() => {
    if (query.trim().length < 3) {
      setSuggestions([]);
      return;
    }
    const timer = setTimeout(() => {
      api.get(`/search?q=${query}`)
        .then(res => setSuggestions(res.data.slice(0, 6))) // Mostramos máximo 6 coincidencias
        .catch(() => setSuggestions([]));
    }, 400); // 400ms de retraso para no spamear la API
    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
      setIsMenuOpen(false);
      setShowSuggestions(false);
    }
  };

  // Categorías reales apuntando a la nueva ruta de géneros
  const categories = [
    { name: 'Shonen', path: '/genre/Shounen' },
    { name: 'Comedia', path: '/genre/Comedia' },
    { name: 'Romance', path: '/genre/Romance' },
    { name: 'Slice of life', path: '/genre/Recuentos%20de%20la%20vida' },
    { name: 'Fantasía', path: '/genre/Fantasía' },
    { name: 'Escolares', path: '/genre/Escolares' },
    { name: 'Ciencia Ficción', path: '/genre/Ciencia%20Ficción' },
    { name: 'Suspenso', path: '/genre/Suspenso' },
    { name: 'Psicológico', path: '/genre/Psicológico' },
    { name: 'Deportes', path: '/genre/Deportes' }

  ];

  return (
    <nav className="bg-xp-gradient h-10 fixed top-0 w-full z-50 flex items-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_2px_4px_rgba(0,0,0,0.4)] border-b border-xpBlueDark px-[2px]">
      
      <div className="relative h-full" ref={menuRef}>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`h-full px-4 flex items-center gap-2 bg-xp-button rounded-r-2xl italic font-bold text-white shadow-[2px_0_3px_rgba(0,0,0,0.3),inset_1px_1px_1px_rgba(255,255,255,0.4)] hover:brightness-110 active:brightness-90 transition-all ${isMenuOpen ? 'brightness-90 shadow-inner' : ''}`}>
          <Play fill="white" size={18} className="drop-shadow-md" />
          <span className="text-sm shadow-black drop-shadow-[1px_1px_1px_rgba(0,0,0,1)]">Inicio</span>
        </button>

        {isMenuOpen && (
          <div className="absolute top-10 left-0 w-72 bg-white border-2 border-xpBlue shadow-[4px_4px_10px_rgba(0,0,0,0.5)] flex flex-col rounded-t-md overflow-hidden animate-in fade-in zoom-in duration-100 origin-top-left">
            <div className="bg-xp-gradient p-2 flex items-center gap-3 border-b border-xpBlueDark shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
              <div className="w-10 h-10 bg-white border-2 border-white rounded-md overflow-hidden shadow-md">
                <img src="https://win98icons.alexmeub.com/icons/png/user_world-0.png" alt="user" />
              </div>
              <span className="text-white font-bold text-sm shadow-black drop-shadow-sm">Invitado_XP</span>
            </div>

            <div className="flex bg-white h-80">
              <div className="w-1/2 p-2 flex flex-col gap-1 border-r border-[#91b0df]">
                <span className="text-[10px] font-bold text-gray-500 mb-1 px-1">FILTRAR POR</span>
                {categories.map((cat) => (
                  <button key={cat.name} onClick={() => { navigate(cat.path); setIsMenuOpen(false); }} className="flex items-center gap-2 p-1 hover:bg-[#316ac5] hover:text-white group text-[11px] text-left">
                    <Folder size={14} className="text-yellow-500 group-hover:text-white" />
                    <span>{cat.name}.exe</span>
                  </button>
                ))}
              </div>
              <div className="w-1/2 bg-[#d3e5fa] p-2 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[#00156e] font-bold text-[11px] hover:underline cursor-pointer" onClick={() => { navigate('/favorites'); setIsMenuOpen(false); }}>
                  <img src="https://win98icons.alexmeub.com/icons/png/directory_favorites-0.png" className="w-4 h-4" alt="" /> Mis Favoritos
                </div>
                <div className="flex items-center gap-2 text-[#00156e] font-bold text-[11px] hover:underline cursor-pointer" onClick={() => { navigate('/'); setIsMenuOpen(false); }}>
                  <img src="https://win98icons.alexmeub.com/icons/png/computer_explorer-4.png" className="w-4 h-4" alt="" /> Inicio
                </div>
              </div>
            </div>
            <div className="bg-xp-gradient p-2 flex justify-end gap-2 border-t border-xpBlueDark shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
              <button className="flex items-center gap-1 bg-[#eeeeee] border border-gray-400 px-2 py-1 text-[10px] shadow-sm hover:brightness-105 active:shadow-inner">
                <LogOut size={12} className="text-orange-600" /> Cerrar sesión
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="h-full w-[1px] bg-xpBlueDark mx-1 shadow-[1px_0_0_rgba(255,255,255,0.2)]" />

      <div className="flex items-center gap-1 px-1 h-full">
        <button onClick={() => navigate('/favorites')} className="w-7 h-7 flex justify-center items-center hover:bg-white/20 rounded-[2px]" title="Mis Favoritos"><img src="https://win98icons.alexmeub.com/icons/png/star-0.png" className="w-4 h-4" alt="fav" /></button>
        <button onClick={() => navigate('/history')} className="w-7 h-7 flex justify-center items-center hover:bg-white/20 rounded-[2px]" title="Historial"><img src="https://win98icons.alexmeub.com/icons/png/history-0.png" className="w-4 h-4" alt="history" /></button>
      </div>

      <div className="h-full w-[1px] bg-xpBlueDark mx-1 shadow-[1px_0_0_rgba(255,255,255,0.2)]" />

      {/* Buscador con Predicción */}
      <div className="ml-2 relative flex items-center" ref={searchRef}>
        <form onSubmit={handleSearch} className="flex items-center bg-white border border-xpBlueDark p-[1px] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)]">
          <input
            type="text"
            placeholder="Buscar anime..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
            onFocus={() => setShowSuggestions(true)}
            className="bg-white text-black text-[12px] px-2 py-1 w-32 sm:w-64 focus:outline-none font-sans"
          />
          <button type="submit" className="bg-winLight border-l border-xpBlueDark px-2 py-1 hover:bg-[#e1e1e1] active:shadow-inner">
            <Search size={14} className="text-xpBlueDark" strokeWidth={3} />
          </button>
        </form>

        {/* Ventana de predicciones */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-white border border-black shadow-[2px_2px_5px_rgba(0,0,0,0.5)] z-50 flex flex-col mt-[1px]">
            {suggestions.map(s => (
              <div 
                key={s.id} 
                onClick={() => { navigate(`/anime/${s.id}`); setShowSuggestions(false); setQuery(''); }} 
                className="px-2 py-1 text-[11px] hover:bg-[#316ac5] hover:text-white cursor-pointer flex items-center gap-2 truncate text-black"
              >
                <img src="https://win98icons.alexmeub.com/icons/png/search_file-0.png" className="w-3 h-3 flex-shrink-0" alt="" />
                <span className="truncate">{s.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="ml-auto h-full px-4 bg-[#0997ff] border-l border-[#0057e7] flex items-center text-white text-[11px] font-bold">
        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </nav>
  );
}