import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';

export default function GenreResults() {
  const { genre } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/genre/${genre}`)
      .then(res => setResults(res.data))
      .catch(err => {
        console.error(err);
        setResults([]);
      })
      .finally(() => setLoading(false));
  }, [genre]);

  return (
    <div className="w-full max-w-5xl mx-auto bg-white border-2 border-winDarkGray shadow-win-in h-[75vh] flex flex-col relative">
      <div className="bg-winLight px-2 py-1 flex items-center justify-between border-b border-winDarkGray text-[11px]">
        <div className="flex items-center gap-2">
          <img src="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png" className="w-5 h-5" alt="folder" />
          <span className="font-bold">Resultados de Búsqueda: Género {genre}</span>
        </div>
        <div className="text-gray-600">{results.length} objetos encontrados</div>
      </div>
      
      <div className="p-4 flex flex-wrap gap-6 overflow-y-auto custom-scrollbar content-start flex-grow bg-white">
        {loading ? (
           <div className="text-gray-500 text-xs flex items-center gap-2 w-full justify-center mt-10">
             <img src="https://win98icons.alexmeub.com/icons/png/hourglass-0.png" className="w-8 h-8 animate-bounce" alt="loading" />
             Buscando en la base de datos del sistema...
           </div>
        ) : results.length > 0 ? (
          results.map(anime => (
            <Link key={anime.id} to={`/anime/${anime.id}`} className="group relative flex flex-col items-center w-28">
              <div className="w-full bg-[#f1eee2] border border-[#808080] shadow-[2px_2px_0px_rgba(0,0,0,0.2)] p-1 group-hover:bg-[#fff9e5] transition-colors">
                <div className="bg-white border border-[#aca899] overflow-hidden">
                  <img src={anime.img || "https://win98icons.alexmeub.com/icons/png/image_file-0.png"} alt={anime.title} className="h-36 w-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all" />
                </div>
              </div>
              <span className="mt-1 px-1 text-center text-[11px] font-sans text-black group-hover:bg-[#000080] group-hover:text-white line-clamp-2 leading-tight w-full">
                {anime.title}.lnk
              </span>
            </Link>
          ))
        ) : (
          <div className="text-gray-500 text-xs flex flex-col items-center w-full mt-10">
            <img src="https://win98icons.alexmeub.com/icons/png/msg_error-0.png" className="w-8 h-8 mb-2" alt="info" />
            No se encontraron archivos en la red que coincidan con el género "{genre}".
          </div>
        )}
      </div>
    </div>
  );
}