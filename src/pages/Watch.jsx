import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Play, SkipBack, SkipForward, Square, Volume2 } from 'lucide-react';

export default function Watch() {
  const { id, episode } = useParams();
  const navigate = useNavigate();
  
  const [servers, setServers] = useState([]);
  const [activeServer, setActiveServer] = useState(null);
  const [loading, setLoading] = useState(true);

  // Convertimos el episodio actual a número para poder sumar o restar
  const currentEpisode = parseInt(episode, 10) || 1;

  
  useEffect(() => {
    setLoading(true);
    let history = JSON.parse(localStorage.getItem('animeHistory')) || [];
    history = history.filter(h => h.id !== id); // Evita duplicados del mismo anime
    history.unshift({ 
      id, 
      episode, 
      title: id.replace(/-/g, ' ').toUpperCase(),
      date: new Date().toLocaleString() 
    });
    localStorage.setItem('animeHistory', JSON.stringify(history.slice(0, 50)));
    api.get(`/see/${id}/${episode}`)
      .then(res => {
        setServers(res.data);
        if (res.data.length > 0) setActiveServer(res.data[0].link);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id, episode]);

  // Funciones para navegar entre episodios
  const handlePrevEpisode = () => {
    if (currentEpisode > 1) {
      navigate(`/watch/${id}/${currentEpisode - 1}`);
    }
  };

  const handleNextEpisode = () => {
    navigate(`/watch/${id}/${currentEpisode + 1}`);
  };

  return (
    <div className="container mx-auto px-4 py-4 max-w-6xl">
      <Link to={`/anime/${id}`} className="bg-winLight shadow-win-out active:shadow-win-in px-4 py-1 inline-flex items-center gap-2 font-bold mb-4 focus:outline-none border border-transparent active:border-black text-sm">
        <img src="https://win98icons.alexmeub.com/icons/png/directory_open_cabinet_fc-2.png" alt="back" className="w-4 h-4" />
        <span>Subir un nivel</span>
      </Link>
      
      <div className="bg-winLight shadow-win-out p-[2px]">
        {/* Barra de Título */}
        <div className="bg-winBlue text-white px-2 py-1 flex justify-between items-center font-bold shadow-[inset_1px_1px_0px_rgba(255,255,255,0.3)]">
          <div className="flex items-center gap-2">
            <img src="https://win98icons.alexmeub.com/icons/png/wm-2.png" alt="player" className="w-4 h-4" />
            <span className="text-xs sm:text-sm">Windows Media Player - {id.replace(/-/g, ' ')} (Ep. {episode})</span>
          </div>
          <div className="flex gap-1">
            <button className="bg-winLight text-black w-5 h-5 flex items-center justify-center shadow-win-btn hover:active:shadow-win-btn-active font-bold text-xs leading-none">_</button>
            <button className="bg-winLight text-black w-5 h-5 flex items-center justify-center shadow-win-btn hover:active:shadow-win-btn-active font-bold text-xs leading-none">□</button>
            <button className="bg-winLight text-black w-5 h-5 flex items-center justify-center shadow-win-btn hover:active:shadow-win-btn-active font-bold text-xs leading-none">X</button>
          </div>
        </div>

        {/* ... (Barra de menú se mantiene igual) ... */}
        <div className="flex gap-3 p-1 text-[11px] border-b border-winDarkGray shadow-[0_1px_0_#ffffff] mb-1 bg-winLight">
          {['File', 'Edit', 'View', 'Play', 'Favorites', 'Go', 'Help'].map(item => (
            <span key={item} className="hover:bg-winBlue hover:text-white px-1 cursor-default">{item}</span>
          ))}
        </div>

        <div className="p-1 flex flex-col lg:flex-row gap-1 bg-winLight">
          
          <div className="flex-1 flex flex-col gap-1">
            <div className="bg-black p-1 shadow-win-in flex items-center justify-center min-h-[450px] relative border border-winDarkGray">
              {loading ? (
                <div className="flex flex-col items-center justify-center text-[#00ff00] font-mono text-sm">
                  <img src="https://win98icons.alexmeub.com/icons/png/accessibility_stopwatch.png" alt="loading" className="mb-4 animate-bounce" />
                  <span>BUSCANDO SECTOR...</span>
                </div>
              ) : activeServer ? (
                <iframe 
                  key={activeServer} // Forzamos recarga al cambiar de server
                  src={activeServer} 
                  className="w-full h-full min-h-[450px]" 
                  allowFullScreen
                  frameBorder="0"
                ></iframe>
              ) : (
                <div className="flex flex-col items-center gap-2 text-red-500 font-mono text-xs text-center p-4">
                  <img src="https://win98icons.alexmeub.com/icons/png/msg_error-0.png" alt="error" className="w-8 h-8" />
                  <span>ERROR 404: EL ARCHIVO DE RED NO RESPONDE</span>
                </div>
              )}
            </div>

            {/* Panel de Controles Plateado */}
            <div className="bg-[#d4d0c8] p-2 border border-winDarkGray shadow-[inset_1px_1px_#fff]">
              <div className="flex items-center justify-between gap-4">
                
                {/* BOTONES FUNCIONALES */}
                <div className="flex gap-1">
                  <button 
                    onClick={handlePrevEpisode}
                    disabled={currentEpisode <= 1}
                    className="p-1 bg-winLight border border-black shadow-win-btn active:shadow-win-btn-active disabled:opacity-50 disabled:active:shadow-win-btn"
                    title="Capítulo Anterior"
                  >
                    <SkipBack size={14} fill="black" />
                  </button>
                  <button className="p-1 bg-winLight border border-black shadow-win-btn active:shadow-win-btn-active" title="Play (Simulado)"><Play size={14} fill="black" /></button>
                  <button className="p-1 bg-winLight border border-black shadow-win-btn active:shadow-win-btn-active" title="Stop (Simulado)"><Square size={14} fill="black" /></button>
                  <button 
                    onClick={handleNextEpisode}
                    className="p-1 bg-winLight border border-black shadow-win-btn active:shadow-win-btn-active"
                    title="Siguiente Capítulo"
                  >
                    <SkipForward size={14} fill="black" />
                  </button>
                </div>

                {/* Barra de progreso simulada (Se mueve usando una clase de Tailwind customizada) */}
                <div className="flex-grow h-4 bg-black border border-winDarkGray shadow-win-in relative overflow-hidden">
                  <div className="absolute left-0 top-0 h-full bg-blue-800 w-1/3 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] animate-[slide_10s_ease-in-out_infinite]" />
                </div>

                <div className="flex items-center gap-2 bg-black px-2 py-1 border border-winDarkGray text-[#00ff00] font-mono text-[10px] min-w-[60px] justify-center">
                  LIVE
                </div>
                
                <div className="hidden sm:flex items-center gap-1">
                   <Volume2 size={14} />
                   <div className="w-16 h-2 bg-winDarkGray shadow-win-in relative">
                     <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-4 bg-winLight border border-black shadow-win-btn" />
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* ... (La lista de servidores se mantiene igual) ... */}
          <div className="w-full lg:w-64 flex flex-col">
            <div className="bg-winLight border-2 border-white shadow-win-out p-1 h-full">
              <div className="text-[11px] font-bold mb-1 px-1 flex items-center gap-1 uppercase">
                <img src="https://win98icons.alexmeub.com/icons/png/network_drive-2.png" className="w-4 h-4" alt="" />
                Servidores disponibles
              </div>
              <div className="bg-white border-2 border-winDarkGray shadow-win-in p-1 h-full min-h-[200px] flex flex-col gap-1 overflow-y-auto custom-scrollbar">
                {servers.map((server, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveServer(server.link)}
                    className={`text-left px-2 py-1 flex items-center gap-2 text-[11px] transition-colors ${
                      activeServer === server.link 
                      ? 'bg-winBlue text-white' 
                      : 'bg-white text-black hover:bg-[#ffeb9c]'
                    }`}
                  >
                    <img 
                      src={activeServer === server.link 
                        ? "https://win98icons.alexmeub.com/icons/png/conn_pcs_on_on.png"
                        : "https://win98icons.alexmeub.com/icons/png/conn_pcs_off_off.png"
                      } 
                      alt="drive" className="w-4 h-4" 
                    />
                    <span className="truncate">Unidad {String.fromCharCode(68 + idx)}: ({server.link.includes('mega') ? 'MEGA' : 'STREAM'})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Barra de Estado inferior */}
        <div className="mt-1 flex gap-1 text-[10px] p-[1px] bg-winLight">
            <div className="shadow-win-in px-2 py-[2px] bg-winLight flex-grow flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_2px_#00ff00]" />
              Transmitiendo paquete de red...
            </div>
            <div className="shadow-win-in px-4 py-[2px] bg-winLight whitespace-nowrap">Audio: On</div>
            <div className="shadow-win-in px-4 py-[2px] bg-winLight whitespace-nowrap font-bold">128.0 Kbps</div>
            <div className="shadow-win-in px-2 py-[2px] bg-winLight w-16 text-center">HQ</div>
        </div>
      </div>
    </div>
  );
}