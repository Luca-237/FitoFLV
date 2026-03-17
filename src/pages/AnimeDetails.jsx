import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function AnimeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [showSynopsis, setShowSynopsis] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Cargar detalles
    api.get(`/details/${id}`)
      .then(res => setDetails(res.data[0]))
      .catch(err => console.error(err));

    // Verificar si está en favoritos
    const favs = JSON.parse(localStorage.getItem('animeFavorites')) || [];
    setIsFavorite(favs.some(f => f.id === id));
  }, [id]);

  const toggleFavorite = () => {
    let favs = JSON.parse(localStorage.getItem('animeFavorites')) || [];
    if (isFavorite) {
      favs = favs.filter(f => f.id !== id);
    } else {
      favs.push({ id, name: details.name, img: details.img });
    }
    localStorage.setItem('animeFavorites', JSON.stringify(favs));
    setIsFavorite(!isFavorite);
  };

  if (!details) return (
    <div className="flex justify-center items-start min-h-[80vh] p-4">
      <div className="bg-winLight shadow-win-out p-4 flex gap-4 items-center border border-winDarkGray">
        <img src="https://win98icons.alexmeub.com/icons/png/search_laptop_2.png" className="w-8 h-8 animate-bounce" alt="loading" />
        <div className="flex flex-col gap-2">
          <span className="font-bold text-sm">Procesando petición en el sistema...</span>
          <div className="w-64 h-5 shadow-win-in bg-white p-[2px]">
            <div className="bg-winBlue h-full w-1/2 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );

  const status = details.information[0]; 
  const episodes = details.information.slice(1).map(ep => ep.replace(/\D/g, '')).reverse();

  return (
    <div className="flex justify-center items-start min-h-[80vh] p-2 sm:p-4">
      
      {/* Ventana del Explorador de Windows XP */}
      <div className="w-full max-w-5xl bg-[#ebeadb] border border-[#00156e] shadow-[2px_2px_10px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden relative rounded-t-md">
        
        {/* Barra de Título */}
        <div className="bg-xp-gradient px-2 py-1 flex justify-between items-center border-b border-xpBlueDark">
          <div className="flex items-center gap-2">
            <img src="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png" className="w-4 h-4" alt="folder" />
            <span className="text-white text-xs font-bold drop-shadow-md font-sans">
              Explorador de Archivos - {details.name}
            </span>
          </div>
          <div className="flex gap-[2px]">
            <button className="bg-[#e0dbcd] border border-white shadow-win-btn w-5 h-5 flex justify-center items-center font-bold text-xs rounded-[2px] hover:bg-[#eae6d8] active:shadow-win-btn-active">_</button>
            <button className="bg-[#e0dbcd] border border-white shadow-win-btn w-5 h-5 flex justify-center items-center font-bold text-xs rounded-[2px] hover:bg-[#eae6d8] active:shadow-win-btn-active">□</button>
            <button className="bg-[#e81123] border border-white shadow-win-btn text-white w-5 h-5 flex justify-center items-center font-bold text-xs rounded-[2px] hover:bg-[#f0505c] active:shadow-win-btn-active">X</button>
          </div>
        </div>

        {/* Barra de Menú y Herramientas */}
        <div className="bg-[#ebeadb] flex flex-col text-[11px] font-sans">
          <div className="flex items-center gap-2 px-2 py-1 border-b border-[#d4d0c8]">
            <button onClick={() => navigate(-1)} className="flex items-center gap-1 hover:border hover:border-gray-400 px-1 rounded hover:shadow-sm text-black">
              <img src="https://win98icons.alexmeub.com/icons/png/back-0.png" className="w-5 h-5 grayscale opacity-80" alt="back" />
              <span className="hidden sm:inline">Atrás</span>
            </button>
            <div className="h-5 w-[1px] bg-gray-400 mx-1" />
            <img src="https://win98icons.alexmeub.com/icons/png/search_file-0.png" className="w-5 h-5 grayscale opacity-80" alt="search" />
            <span className="hidden sm:inline">Búsqueda</span>
            <img src="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png" className="w-5 h-5 grayscale opacity-80 ml-2" alt="folders" />
            <span className="hidden sm:inline">Carpetas</span>
          </div>

          <div className="flex items-center gap-2 px-2 py-1 border-b border-[#d4d0c8] bg-[#f5f4ea]">
            <span className="text-gray-500 whitespace-nowrap">Dirección</span>
            <div className="bg-white border border-[#7f9db9] flex-grow flex items-center px-1 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)] gap-1 overflow-hidden">
              <img src="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png" className="w-3 h-3 flex-shrink-0" alt="" />
              <span className="truncate text-black">C:\FitoFLV\Descargas\{details.name}</span>
            </div>
          </div>
        </div>

        {/* Área Principal Dividida */}
        <div className="flex flex-col md:flex-row h-[550px] bg-white">
          
          {/* Panel Izquierdo Azul (Ancho fijo estricto para que no se deforme) */}
          <div className="w-full md:w-[250px] flex-shrink-0 bg-gradient-to-b from-[#749edd] to-[#5c8cd9] p-3 flex flex-col gap-3 overflow-y-auto custom-scrollbar border-r border-[#4c7cb5]">
            
            {/* Detalles */}
            <div className="bg-white rounded-t-[3px] overflow-hidden shadow-sm border border-[#5c8cd9]">
              <div className="bg-gradient-to-r from-[#f0f0f0] to-[#e0e0e0] px-2 py-1 border-b border-[#d4d0c8] text-[#00156e] font-bold text-[11px] flex items-center justify-between">
                Detalles
              </div>
              <div className="p-2 flex flex-col items-center text-center">
                {/* Contenedor de imagen rígido */}
                <div className="w-[120px] h-[160px] bg-gray-200 border border-gray-400 flex flex-col items-center justify-center text-[10px] text-gray-500 mb-2 shadow-win-out overflow-hidden">
                  {details.img ? (
                    <img src={details.img} alt="portada" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <img src="https://win98icons.alexmeub.com/icons/png/msagent-4.png" className="w-8 h-8 opacity-50 mb-1" alt="no-img" />
                      No disponible
                    </>
                  )}
                </div>
                <span className="text-[12px] font-bold text-black break-words w-full mb-2 leading-tight">
                  {details.name}
                </span>
                
                <div className="w-full text-left text-[11px] bg-[#f0f4fd] p-1 border border-[#d4d0c8] shadow-inner mb-2">
                  <span className="text-gray-500 font-bold block">Estado:</span>
                  <span className="text-green-700">{status}</span>
                </div>
                
                <div className="w-full flex flex-wrap gap-1 justify-center">
                {details.genres?.map(genre => (
                  <Link 
                    key={genre} 
                    to={`/genre/${genre}`} 
                    className="bg-winLight shadow-win-btn px-1 text-[9px] border border-gray-400 hover:bg-[#316ac5] hover:text-white cursor-pointer transition-colors"
                    title={`Buscar más animes de ${genre}`}
                  >
                    {genre}
                  </Link>
                ))}
              </div>
              </div>
            </div>

            {/* Tareas de Archivo */}
            <div className="bg-white rounded-t-[3px] overflow-hidden shadow-sm border border-[#5c8cd9]">
              <div className="bg-gradient-to-r from-[#f0f0f0] to-[#e0e0e0] px-2 py-1 border-b border-[#d4d0c8] text-[#00156e] font-bold text-[11px] flex items-center justify-between">
                Tareas de archivo
              </div>
              <div className="p-2 flex flex-col gap-2 bg-[#f0f4fd]">
                <button onClick={() => setShowSynopsis(true)} className="flex items-center gap-2 text-[11px] text-[#00156e] hover:underline text-left">
                  <img src="https://win98icons.alexmeub.com/icons/png/notepad_file-0.png" className="w-4 h-4" alt="txt" />
                  Leeme.txt
                </button>
                <button onClick={toggleFavorite} className="flex items-center gap-2 text-[11px] text-[#00156e] hover:underline text-left">
                  <img src="https://win98icons.alexmeub.com/icons/png/internet_connection_wiz-0.png" className={`w-4 h-4 ${!isFavorite && 'grayscale opacity-50'}`} alt="fav" />
                  {isFavorite ? "Quitar de Mis Favoritos" : "Añadir a Mis Favoritos"}
                </button>
              </div>
            </div>
          </div>

          {/* Panel Derecho (Episodios con Grid Restablecido) */}
          <div className="flex-grow bg-white p-4 overflow-y-auto custom-scrollbar relative">
            {episodes.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                {episodes.map((ep, idx) => (
                  <Link 
                    key={idx} 
                    to={`/watch/${id}/${ep}`}
                    className="flex flex-col items-center gap-1 p-1 hover:bg-[#316ac5] group border border-transparent hover:border-dotted hover:border-gray-400 cursor-pointer"
                  >
                    <img 
                      src="https://win98icons.alexmeub.com/icons/png/wm_file-3.png" 
                      alt="video"
                      className="w-10 h-10 opacity-90 group-hover:opacity-100 group-hover:drop-shadow-md transition-all" 
                    />
                    <span className="text-[11px] text-center leading-tight line-clamp-2 w-full text-black group-hover:text-white bg-transparent group-hover:bg-[#000080]">
                      Episodio {ep}.mp4
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 text-xs flex flex-col items-center w-full mt-10">
                <img src="https://win98icons.alexmeub.com/icons/png/msg_information-0.png" className="w-8 h-8 mb-2" alt="info" />
                Esta carpeta está vacía.
              </div>
            )}
          </div>
        </div>

        {/* Barra de Estado Inferior */}
        <div className="bg-[#ebeadb] border-t border-[#d4d0c8] p-1 flex items-center text-[10px] text-gray-700 font-sans shadow-[inset_0_1px_1px_#fff]">
          <div className="flex items-center gap-1 w-1/3 px-2 border-r border-gray-400 shadow-[1px_0_0_#fff]">
            {episodes.length} objetos
          </div>
          <div className="flex items-center gap-1 px-2">
            <img src="https://win98icons.alexmeub.com/icons/png/computer_explorer-4.png" className="w-3 h-3" alt="" />
            Mi PC
          </div>
        </div>

        {/* Modal de Sinopsis */}
        {showSynopsis && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-[1px]">
            <div className="bg-winLight w-[450px] max-w-[90%] border-2 border-white shadow-[2px_2px_15px_rgba(0,0,0,0.4)] flex flex-col animate-in zoom-in duration-150">
              <div className="bg-xp-gradient px-2 py-1 flex justify-between items-center border-b border-xpBlueDark">
                <div className="flex items-center gap-1">
                  <img src="https://win98icons.alexmeub.com/icons/png/notepad-1.png" className="w-3 h-3" alt="notepad" />
                  <span className="text-white text-xs font-bold drop-shadow-md">Leeme.txt - Bloc de notas</span>
                </div>
                <button onClick={() => setShowSynopsis(false)} className="bg-[#e81123] border border-white shadow-win-btn text-white w-4 h-4 flex justify-center items-center font-bold text-[10px] hover:bg-[#f0505c] active:shadow-win-btn-active">X</button>
              </div>
              <div className="bg-white border-[2px] border-t-gray-500 border-l-gray-500 border-b-white border-r-white m-1 p-2 h-64 overflow-y-auto custom-scrollbar font-mono text-xs text-black whitespace-pre-wrap leading-relaxed">
                {details.description || "No hay información documentada en los registros del sistema."}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}