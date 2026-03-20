import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function MovieDetails() {
  const { '*': idSlug } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    console.log("Cargando ID:", idSlug); // Log para saber qué estamos pidiendo

    api.get(`/movies/details/${idSlug}`)
      .then(res => {
        console.log("Datos recibidos del servidor:", res.data); // LOG SÚPER IMPORTANTE
        setDetails(res.data);
      })
      .catch(err => console.error("Error al cargar detalles:", err))
      .finally(() => setLoading(false));
  }, [idSlug]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-64 text-white font-bold gap-3">
      <img src="https://win98icons.alexmeub.com/icons/png/search_computer-2.png" className="animate-pulse w-10 h-10" alt="Buscando" />
      Leyendo disco duro...
    </div>
  );

  if (!details) return null;

  return (
    <div className="container mx-auto px-4 py-4 max-w-6xl">
      <div className="bg-[#ece9d8] shadow-win-out p-[2px] mb-4 border border-gray-400">
        <div className="bg-white border border-gray-400 px-2 py-1 text-[11px] flex items-center gap-2">
          <span className="text-gray-500 font-bold">Dirección</span>
          <img src="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png" className="w-4 h-4" alt="dir" />
          <span>C:\Cuevana_XP\{details.title.replace(/\s+/g, '_')}</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 bg-white border-2 border-[#0054e3] shadow-[2px_2px_5px_rgba(0,0,0,0.5)] h-[calc(100vh-12rem)]">
        
        {/* Panel Izquierdo: Información */}
        <div className="w-full md:w-64 bg-gradient-to-b from-[#6b82e4] to-[#3a58ce] p-4 text-white flex flex-col gap-4 overflow-y-auto custom-scrollbar shadow-[inset_-2px_0_4px_rgba(0,0,0,0.2)]">
          <h1 className="font-bold text-lg drop-shadow-md">{details.title}</h1>
          
          <div className="bg-white/10 p-2 border border-white/20 shadow-inner">
            <h3 className="font-bold text-[11px] text-[#ffcc00] mb-1">Sinopsis</h3>
            <p className="text-[11px] leading-tight text-justify drop-shadow-sm">{details.synopsis}</p>
          </div>

          {details.genres?.length > 0 && (
            <div className="bg-white/10 p-2 border border-white/20 shadow-inner">
              <h3 className="font-bold text-[11px] text-[#ffcc00] mb-1">Géneros</h3>
              <div className="flex flex-wrap gap-1">
                {details.genres.map((g, i) => (
                  <span key={i} className="text-[10px] bg-[#1839a8] px-1 border border-white/30">{g}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Panel Derecho: Archivos */}
        <div className="flex-1 p-4 bg-white overflow-y-auto custom-scrollbar">
          <h2 className="text-[#0054e3] font-bold border-b border-[#0054e3] pb-1 mb-4 flex items-center gap-2">
            Contenido de la carpeta
          </h2>

          {details.items && details.items.length === 0 ? (
            <div className="text-gray-500 text-[11px] p-4 text-center">
              La carpeta está vacía. No se pudieron extraer los capítulos.
            </div>
          ) : (
            <div className="flex flex-wrap gap-6">
              {details.isMovie ? (
                <button 
                  onClick={() => navigate(`/movies/watch/${details.id}`)}
                  className="flex flex-col items-center gap-1 w-24 group hover:bg-[#316ac5] hover:text-white p-2 rounded-[2px]"
                >
                  <img src="https://win98icons.alexmeub.com/icons/png/video_file-2.png" className="w-10 h-10 drop-shadow-md" alt="movie" />
                  <span className="text-[11px] text-center leading-tight">Reproducir_Pelicula.avi</span>
                </button>
              ) : (
                details.items.map((item, index) => {
                  // VALIDACIÓN ROBUSTA: Verificamos si la URL O el nombre dicen "episodio"
                  const isEpisode = item.id.includes('episodio') || item.title.toLowerCase().includes('episodio');
                  
                  return (
                    <button 
                      key={index}
                      onClick={() => {
                        if (isEpisode) navigate(`/movies/watch/${item.id}`);
                        else navigate(`/movies/details/${item.id}`); 
                      }}
                      className="flex flex-col items-center gap-1 w-24 group hover:bg-[#316ac5] hover:text-white p-2 border border-transparent hover:border-dotted hover:border-white/50 rounded-[2px]"
                      title={item.title}
                    >
                      {isEpisode ? (
                        <img src="https://win98icons.alexmeub.com/icons/png/wm_file-4.png" className="w-10 h-10 drop-shadow-md" alt="ep" />
                      ) : (
                        <img src="https://win98icons.alexmeub.com/icons/png/directory_closed-4.png" className="w-10 h-10 drop-shadow-md" alt="season" />
                      )}
                      <span className="text-[11px] text-center leading-tight break-words line-clamp-2">
                        {item.title.replace(/\s+/g, '_')}{isEpisode ? '.avi' : ''}
                      </span>
                    </button>
                  )
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}