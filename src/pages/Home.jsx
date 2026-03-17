import { useEffect, useState } from 'react';
import api from '../api/axios';
import AnimeCard from '../components/AnimeCard';

export default function Home() {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/animes/1')
      .then(res => setAnimes(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="bg-winGray shadow-win-out p-1 mb-6 inline-block">
        <h2 className="bg-winBlue text-white font-bold px-2 py-1 text-lg flex items-center gap-2">
          <img src="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png" alt="folder" className="w-5 h-5" />
          C:\Users\Luca\Animes\Nuevos
        </h2>
      </div>
      
      {loading ? (
        <div className="bg-winGray shadow-win-out p-4 inline-block font-bold flex items-center gap-3">
          <img src="https://win98icons.alexmeub.com/icons/png/laptop_infrared_2-3.png" alt="loading" />
          Leyendo disco duro...
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {animes.map((anime, index) => (
            <AnimeCard key={anime.id || anime.name || index} anime={anime} />
          ))}
        </div>
      )}
    </div>
  );
}