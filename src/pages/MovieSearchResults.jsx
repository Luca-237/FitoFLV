import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import MovieCard from '../components/MovieCard';
import { Search } from 'lucide-react';

export default function MovieSearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    setError(null);

    // Llamamos a nuestra nueva ruta de películas en el backend
    api.get(`/movies/search?q=${query}`)
      .then(res => setMovies(res.data))
      .catch(err => {
        console.error(err);
        setError('No se encontraron archivos que coincidan con su búsqueda.');
        setMovies([]);
      })
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-4">
      {/* Barra de dirección estilo Windows XP */}
      <div className="bg-[#ece9d8] shadow-win-out p-[2px] mb-4 inline-block border border-gray-400">
        <div className="bg-white border border-gray-400 px-2 py-1 text-[11px] flex items-center gap-2 w-[300px] sm:w-[400px]">
          <span className="text-gray-500 font-bold">Dirección</span>
          <img src="https://win98icons.alexmeub.com/icons/png/search_computer-2.png" alt="search" className="w-4 h-4" />
          <span className="truncate">Resultados de la búsqueda para "{query}"</span>
        </div>
      </div>

      <div className="flex gap-4 min-h-[60vh]">
        {/* Panel lateral izquierdo clásico de búsqueda de XP */}
        <div className="hidden sm:flex flex-col w-48 bg-gradient-to-b from-[#6b82e4] to-[#3a58ce] rounded-t-md rounded-b-md border border-[#00156e] overflow-hidden shadow-md h-fit">
          <div className="bg-[#1839a8] text-white font-bold text-[11px] px-3 py-2 border-b border-white/20 shadow-inner flex items-center gap-2">
            <Search size={14} />
            Búsqueda
          </div>
          <div className="p-3 text-white text-[11px]">
            <img 
              src="https://win98icons.alexmeub.com/icons/png/search_file-2.png" 
              alt="dog" 
              className="w-12 h-12 mb-4 mx-auto drop-shadow-md"
            />
            {loading ? (
              <p>Buscando en Cuevana_XP.exe los archivos que coincidan con sus criterios...</p>
            ) : (
              <p>Se encontraron <strong>{movies.length}</strong> archivos y carpetas.</p>
            )}
          </div>
        </div>

        {/* Área principal de resultados */}
        <div className="flex-1 bg-white border border-gray-400 p-2 shadow-inner overflow-y-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 text-[11px] gap-3">
              <img src="https://win98icons.alexmeub.com/icons/png/search_directory-2.png" alt="searching" className="animate-bounce" />
              Buscando elementos...
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full text-black text-[12px] gap-2">
              <img src="https://win98icons.alexmeub.com/icons/png/msg_warning-0.png" alt="warning" />
              {error}
            </div>
          ) : movies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
              {movies.map((movie, index) => (
                <MovieCard key={movie.id || index} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="text-[11px] text-gray-600 p-4">
              No hay elementos para mostrar en esta vista.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}