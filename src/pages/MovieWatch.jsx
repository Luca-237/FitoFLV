import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X, Square, Minus, Film } from 'lucide-react';
import api from '../api/axios';

export default function MovieDetails() {
  // Capturamos toda la ruta después de /movies/watch/
  const { '*': idSlug } = useParams(); 
  const navigate = useNavigate();

  const [servers, setServers] = useState([]);
  const [selectedServer, setSelectedServer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // Llamada al backend que hicimos en el paso anterior
    api.get(`/movies/see/${idSlug}`)
      .then(res => {
        setServers(res.data);
        if (res.data.length > 0) {
          setSelectedServer(res.data[0]); // Auto-selecciona el primer servidor
        }
      })
      .catch(err => {
        console.error(err);
        setError('No se pudieron encontrar servidores de video para este archivo.');
      })
      .finally(() => setLoading(false));
  }, [idSlug]);

  return (
    <div className="container mx-auto max-w-5xl h-[calc(100vh-6rem)] flex flex-col">
      
      {/* Ventana Estilo Windows XP */}
      <div className="flex flex-col h-full bg-[#ece9d8] border border-[#0054e3] shadow-[2px_2px_5px_rgba(0,0,0,0.5)] rounded-t-md overflow-hidden">
        
        {/* Barra de Título */}
        <div className="bg-gradient-to-r from-[#0058e6] via-[#3a93ff] to-[#0058e6] px-2 py-1 flex justify-between items-center select-none">
          <div className="flex items-center gap-1 overflow-hidden">
            <Film size={16} className="text-white drop-shadow-md flex-shrink-0" />
            <span className="text-white font-bold text-[12px] truncate drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]">
              Windows Media Player - {idSlug.split('/').pop().replace(/-/g, ' ')}.avi
            </span>
          </div>
          <div className="flex gap-[2px]">
            <button className="bg-[#e3e3e3] w-5 h-5 rounded-[2px] flex justify-center items-center shadow-[inset_1px_1px_1px_#fff,inset_-1px_-1px_1px_#888,1px_1px_1px_#000] active:shadow-[inset_1px_1px_1px_#888]"><Minus size={14} color="black" /></button>
            <button className="bg-[#e3e3e3] w-5 h-5 rounded-[2px] flex justify-center items-center shadow-[inset_1px_1px_1px_#fff,inset_-1px_-1px_1px_#888,1px_1px_1px_#000] active:shadow-[inset_1px_1px_1px_#888]"><Square size={12} color="black" /></button>
            <button onClick={() => navigate(-1)} className="bg-[#e81123] hover:bg-[#f1707a] w-5 h-5 rounded-[2px] flex justify-center items-center shadow-[inset_1px_1px_1px_#ff8c94,inset_-1px_-1px_1px_#8a0a14,1px_1px_1px_#000] active:shadow-[inset_1px_1px_1px_#8a0a14]"><X size={14} color="white" strokeWidth={3} /></button>
          </div>
        </div>

        {/* Barra de Menú */}
        <div className="bg-[#ece9d8] text-[11px] flex gap-4 px-2 py-1 border-b border-white shadow-[0_1px_2px_rgba(0,0,0,0.1)]">
          <span className="hover:bg-[#316ac5] hover:text-white px-1 cursor-default">Archivo</span>
          <span className="hover:bg-[#316ac5] hover:text-white px-1 cursor-default">Ver</span>
          <span className="hover:bg-[#316ac5] hover:text-white px-1 cursor-default">Reproducir</span>
          <span className="hover:bg-[#316ac5] hover:text-white px-1 cursor-default">Herramientas</span>
          <span className="hover:bg-[#316ac5] hover:text-white px-1 cursor-default">Ayuda</span>
        </div>

        {/* Cuerpo de la Ventana */}
        <div className="flex flex-1 overflow-hidden bg-black p-1">
          
          {/* Panel Lateral: Lista de Servidores */}
          <div className="w-56 bg-[#ece9d8] border border-gray-400 m-1 flex flex-col shadow-inner overflow-y-auto">
            <div className="bg-gradient-to-r from-[#1d2b82] to-[#2542a6] text-white text-[11px] font-bold p-1 border-b border-white">
              Servidores Disponibles
            </div>
            
            <div className="p-1 flex flex-col gap-1">
              {loading ? (
                <div className="p-4 text-center text-[11px] flex flex-col items-center gap-2">
                  <img src="https://win98icons.alexmeub.com/icons/png/search_computer-2.png" alt="Buscando" className="animate-pulse" />
                  <span>Buscando códecs...</span>
                </div>
              ) : error ? (
                <div className="p-2 text-red-600 text-[11px] font-bold flex items-center gap-2">
                  <img src="https://win98icons.alexmeub.com/icons/png/msg_error-0.png" alt="Error" />
                  {error}
                </div>
              ) : (
                servers.map((srv, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedServer(srv)}
                    className={`text-[11px] text-left px-2 py-1 border transition-all truncate flex items-center gap-2
                      ${selectedServer?.link === srv.link 
                        ? 'bg-[#316ac5] text-white border-transparent' 
                        : 'bg-white border-gray-300 hover:bg-[#d3e5fa] text-black hover:border-[#316ac5]'}`}
                  >
                    <img src="https://win98icons.alexmeub.com/icons/png/cd_audio_cd_a-2.png" className="w-4 h-4" alt="cd" />
                    <span className="truncate">{srv.server}</span>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Área Principal: Reproductor */}
          <div className="flex-1 bg-black m-1 border-2 border-[#555] shadow-inner relative flex justify-center items-center">
            {selectedServer ? (
              <iframe
                src={selectedServer.link}
                className="w-full h-full"
                allowFullScreen
                frameBorder="0"
              ></iframe>
            ) : (
              <div className="text-[#00ff00] font-mono text-xs opacity-50 flex flex-col items-center">
                <Film size={48} className="mb-2 opacity-50" />
                <span>Esperando conexión de red...</span>
              </div>
            )}
          </div>

        </div>

        {/* Barra de Estado Inferior */}
        <div className="bg-[#ece9d8] border-t border-gray-400 flex text-[10px] text-gray-700 shadow-[inset_0_1px_0_#fff]">
          <div className="border-r border-gray-400 px-2 py-[2px] flex-1 shadow-[inset_-1px_0_0_#fff]">
            {loading ? 'Conectando con Cuevana.bi...' : 'Listo'}
          </div>
          <div className="border-r border-gray-400 px-2 py-[2px] w-32 shadow-[inset_-1px_0_0_#fff] flex items-center gap-1">
             <img src="https://win98icons.alexmeub.com/icons/png/network_internet_pcs_installer-2.png" className="w-3 h-3" alt="net" />
             En línea
          </div>
        </div>

      </div>
    </div>
  );
}