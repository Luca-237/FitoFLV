import { useNavigate } from 'react-router-dom';

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (movie.type === 'movie') {
      navigate(`/movies/watch/${movie.id}`);
    } else {
      navigate(`/movies/details/${movie.id}`);
    }
  };

  return (
    <div 
      onClick={handleNavigation}
      className="flex flex-col items-center p-2 cursor-pointer group"
      title={movie.title}
    >
      <div className="relative w-full aspect-[2/3] bg-black border-2 border-[#ece9d8] shadow-[1px_1px_4px_rgba(0,0,0,0.5)] group-hover:border-[#316ac5] group-hover:shadow-[0_0_0_1px_#316ac5] transition-all mb-1 overflow-hidden">
        <img 
          src={movie.img} 
          alt={movie.title}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.target.src = "https://win98icons.alexmeub.com/icons/png/wm-2.png";
            e.target.className = "w-12 h-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain";
          }}
        />
        
        <div className="absolute top-1 right-1 bg-[#ece9d8] border border-gray-600 shadow-[1px_1px_0_rgba(0,0,0,0.5)] text-[9px] px-1 font-bold text-black uppercase tracking-tighter">
          {movie.type === 'serie' ? 'TV' : 'PELI'}
        </div>
      </div>

      <div className="flex items-start gap-1 w-full justify-center mt-1">
        <img 
          src="https://win98icons.alexmeub.com/icons/png/wm-2.png" 
          className="w-4 h-4 flex-shrink-0 opacity-80" 
          alt="avi" 
        />
        <span className="text-[11px] leading-tight line-clamp-2 text-black group-hover:bg-[#316ac5] group-hover:text-white px-[2px] border border-transparent group-hover:border-dotted group-hover:border-white/50 rounded-[1px] text-center">
          {movie.title.replace(/\s+/g, '_')}.avi
        </span>
      </div>
    </div>
  );
}