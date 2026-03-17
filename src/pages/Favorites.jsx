import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('animeFavorites')) || []);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto bg-white border-2 border-winDarkGray shadow-win-in h-[75vh] flex flex-col relative">
      <div className="bg-winLight px-2 py-1 flex items-center gap-2 border-b border-winDarkGray text-[11px]">
        <img src="https://win98icons.alexmeub.com/icons/png/directory_favorites-0.png" className="w-5 h-5" alt="fav" />
        <span className="font-bold">Mis Favoritos</span>
      </div>
      <div className="p-4 flex flex-wrap gap-6 overflow-y-auto custom-scrollbar content-start flex-grow">
        {favorites.length > 0 ? (
          favorites.map(anime => (
            <Link key={anime.id} to={`/anime/${anime.id}`} className="group relative flex flex-col items-center w-24">
              <div className="w-full bg-[#f1eee2] border border-[#808080] shadow-[2px_2px_0px_rgba(0,0,0,0.2)] p-1 group-hover:bg-[#fff9e5]">
                <img src={anime.img} alt={anime.name} className="h-32 w-full object-cover" />
              </div>
              <span className="mt-1 px-1 text-center text-[11px] text-black group-hover:bg-[#000080] group-hover:text-white line-clamp-2 leading-tight">
                {anime.name}.lnk
              </span>
            </Link>
          ))
        ) : (
          <div className="text-gray-500 text-xs flex flex-col items-center w-full mt-10">
            <img src="https://win98icons.alexmeub.com/icons/png/msg_information-0.png" className="w-8 h-8 mb-2" alt="info" />
            La carpeta de Favoritos está vacía.
          </div>
        )}
      </div>
    </div>
  );
}