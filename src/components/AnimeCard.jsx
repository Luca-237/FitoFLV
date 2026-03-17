import { Link } from 'react-router-dom';

export default function AnimeCard({ anime }) {
  const animeId = anime.id || anime.name; 
  const title = anime.title || anime.name;

  return (
    <Link to={`/anime/${animeId}`} className="group relative flex flex-col items-center">
      {/* Pestaña de la carpeta (XP Style) */}
      <div className="w-12 h-2 bg-[#ece9d8] self-start ml-1 border-t border-l border-r border-[#808080] rounded-t-sm" />
      
      {/* Cuerpo de la Carpeta */}
      <div className="w-full bg-[#f1eee2] border border-[#808080] shadow-[2px_2px_0px_rgba(0,0,0,0.2)] p-1 group-hover:bg-[#fff9e5] transition-colors">
        <div className="bg-white border border-[#aca899] overflow-hidden">
          <img 
            src={anime.img} 
            alt={title} 
            className="h-40 w-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all" 
          />
        </div>
      </div>

      {/* Etiqueta de nombre de archivo debajo */}
      <div className="mt-1 px-1 text-center">
        <span className="text-[11px] font-sans text-black group-hover:bg-[#000080] group-hover:text-white px-1">
          {title}.lnk
        </span>
      </div>
    </Link>
  );
}