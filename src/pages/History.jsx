import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem('animeHistory')) || []);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white border-2 border-winDarkGray shadow-win-in h-[75vh] flex flex-col">
      <div className="bg-winLight px-2 py-1 flex items-center gap-2 border-b border-winDarkGray text-[11px]">
        <img src="https://win98icons.alexmeub.com/icons/png/history-0.png" className="w-5 h-5" alt="hist" />
        <span className="font-bold">Documentos Recientes (Historial)</span>
      </div>
      
      {/* Cabecera de la tabla estilo Windows Explorer */}
      <div className="flex bg-winLight border-b border-winDarkGray text-[10px] text-black font-sans divide-x divide-gray-400">
        <div className="w-1/2 px-2 py-1 hover:bg-[#eae8e3] cursor-pointer shadow-[inset_1px_1px_#fff]">Nombre</div>
        <div className="w-1/4 px-2 py-1 hover:bg-[#eae8e3] cursor-pointer shadow-[inset_1px_1px_#fff]">Episodio</div>
        <div className="w-1/4 px-2 py-1 hover:bg-[#eae8e3] cursor-pointer shadow-[inset_1px_1px_#fff]">Fecha de modificación</div>
      </div>

      <div className="overflow-y-auto custom-scrollbar flex-grow p-1">
        {history.length > 0 ? (
          history.map((item, idx) => (
            <Link key={idx} to={`/watch/${item.id}/${item.episode}`} className="flex text-[11px] text-black hover:bg-[#316ac5] hover:text-white group px-1 py-[2px] cursor-default">
              <div className="w-1/2 flex items-center gap-2 truncate pr-2">
                <img src="https://win98icons.alexmeub.com/icons/png/video_file-0.png" className="w-4 h-4" alt="vid" />
                <span className="truncate">{item.title}.mp4</span>
              </div>
              <div className="w-1/4 truncate pr-2">Episodio {item.episode}</div>
              <div className="w-1/4 truncate text-gray-500 group-hover:text-gray-200">{item.date}</div>
            </Link>
          ))
        ) : (
          <div className="text-gray-500 text-xs p-4">No hay elementos recientes para mostrar.</div>
        )}
      </div>
    </div>
  );
}