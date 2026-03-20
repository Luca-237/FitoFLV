import MovieCard from '../components/MovieCard';

export default function MoviesHome() {
  // Aquí puedes agregar, quitar o modificar tus películas/series favoritas.
  // El "id" debe ser la ruta exacta que usa Cuevana después del dominio.
  const myCollection = [
    {
      id: 'pelicula/zoolander',
      title: 'Zoolander',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8IwDAayVOwLgFv4GAkwINzoGJuZ2qcvnLfA&s',
      type: 'movie'
    },
    {
      id: 'pelicula/agarralo-como-puedas',
      title: 'Naked Gun',
      img: 'https://m.media-amazon.com/images/I/61T3q3iQLHL._AC_UF894,1000_QL80_.jpg',
      type: 'movie'
    },
    {
      id: 'pelicula/baby-el-aprendiz-del-crimen',
      title: 'Baby Driver',
      img: 'data:image/jpeg;base64,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',
      type: 'movie'
    },
    {
      id: 'pelicula/volver-al-futuro',
      title: 'Volver al Futuro',
      img: 'https://image.tmdb.org/t/p/original/k3naCOK9ZQ5Mc7HhfHKN3zyray9.jpg',
      type: 'movie'
    },
    {
      id: 'pelicula/tron-el-legado',
      title: 'Tron: El Legado',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgfSkt2N7K3z-SySwifomF4_K9PYDb5q8GaA&s',
      type: 'movie'
    },
    {
      id: 'pelicula/star-wars-episodio-iii-la-venganza-de-los-sith',
      title: 'Star Wars: Episodio III - La venganza de los Sith',
      img: 'https://http2.mlstatic.com/D_NQ_NP_944217-MLM83057787395_032025-O.webp',
      type: 'movie'
    },
    {
      id: 'pelicula/the-truman-show',
      title: 'The Truman Show',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUKqcAztJza9OiFpOKpfHwV_Ygki4pIBGIWw&s',
      type: 'movie'
    },
    {
      id: 'pelicula/scott-pilgrim-contra-el-mundo',
      title: 'Scott Pilgrim vs. the World',
      img: 'https://s3.amazonaws.com/nightjarprod/content/uploads/sites/243/2024/07/10220042/g5IoYeudx9XBEfwNL0fHvSckLBz-683x1024.jpg',
      type: 'movie'
    },
    {
      id: 'pelicula/nueve-reinas',
      title: 'Nueve Reinas',
      img: 'https://c8.alamy.com/comp/P0XCFP/original-film-title-nueve-reinas-english-title-nine-queens-film-director-fabin-bielinsky-year-2000-credit-naya-filmspatagonik-film-groupindustrias-audiovisuales-arg-album-P0XCFP.jpg',
      type: 'movie'
    },
    {
      id: 'pelicula/el-mono-borracho-en-el-ojo-del-tigre',
      title: 'El maestro borracho',
      img: 'https://m.media-amazon.com/images/I/5125fLzD1qL._AC_UF894,1000_QL80_.jpg',
      type: 'movie'
    },
    {
      id: 'pelicula/dos-tipos-peligrosos',
      title: 'The nice guys',
      img: 'https://m.media-amazon.com/images/M/MV5BM2YwNWZlZGEtYTEyZi00NjdjLWEwM2ItM2Q2MDMwZjkzMjk0XkEyXkFqcGc@._V1_.jpg',
      type: 'movie'
    },
    {
      id: 'pelicula/el-club-de-la-pelea',
      title: 'Fight Club',
      img: 'https://cdng.europosters.eu/pod_public/1300/262697.jpg',
      type: 'movie'
    },
    {
      id: 'pelicula/cuando-acecha-la-maldad',
      title: 'Cuando acecha la maldad',
      img: 'https://m.media-amazon.com/images/M/MV5BMWEwZWE1Y2UtMTllOS00YmRiLWFmNTQtZTg5MzYwMGMwMmJmXkEyXkFqcGc@._V1_.jpg',
      type: 'movie'
    },
     {
      id: 'pelicula/django-desencadenado',
      title: 'Django Unchained',
      img: 'https://cdng.europosters.eu/pod_public/750/263043.jpg',
      type: 'movie'
    },
     {
      id: 'pelicula/kill-bill-volumen-1',
      title: 'Kill Bill',
      img: 'https://cdn.europosters.eu/image/1300/97652.jpg',
      type: 'movie'
    },
     {
      id: 'pelicula/la-vida-es-bella',
      title: 'La vida es bella',
      img: 'https://image.tmdb.org/t/p/original/5ZmT824di4KSHzqsURs91ppXa7H.jpg',
      type: 'movie'
    },
     {
      id: 'pelicula/pecadores',
      title: 'Sinners',
      img: 'https://xl.movieposterdb.com/25_02/2025/31193180/xl_sinners-movie-poster_3970aefe.jpg',
      type: 'movie'
    },
     {
      id: 'pelicula/tick-tick-boom',
      title: 'Tick, Tick... Boom!',
      img: 'https://m.media-amazon.com/images/M/MV5BOGYyNGJmNzctYzZjZi00MzUzLTg3YTYtYjk0OTNjMzA1OTE4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
      type: 'movie'
    },
    {
      id: 'pelicula/rrr',
      title: 'RRR',
      img: 'https://upload.wikimedia.org/wikipedia/en/d/d7/RRR_Poster.jpg',
      type: 'movie'
    },
    {
      id: 'pelicula/whiplash-musica-y-obsesion',
      title: 'Whiplash: Música y Obsesión',
      img: 'https://posterspy.com/wp-content/uploads/2021/04/Whiplash-Final-Art-LowRes.jpg',
      type: 'movie'
    },
    {
      id: 'pelicula/el-hombre-arana-2',
      title: 'Spider-Man 2',
      img: 'https://i.pinimg.com/736x/72/61/67/72616709f3a5d440f17c88684be8040a.jpg',
      type: 'movie'
    },
    {
      id: 'pelicula/infiltrados',
      title: 'Departed',
      img: 'https://cdng.europosters.eu/pod_public/1300/263649.jpg',
      type: 'movie'
    },
    {
      id: 'pelicula/jurassic-park',
      title: 'Jurassic Park',
      img: 'https://filmartgallery.com/cdn/shop/files/Jurassic-Park-Vintage-Movie-Poster-Original_02e923da_1024x1024.jpg?v=1773198084',
      type: 'movie'
    },
    {
      id: 'pelicula/barbie',
      title: 'Barbie',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSnwV1KRuXyJjK1WV8IzhryGdxmTOiIElAJQ&s',
      type: 'movie'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-4">
      {/* Barra de dirección estilo carpeta de Windows */}
      <div className="bg-winGray shadow-win-out p-1 mb-6 inline-block border border-gray-400">
        <h2 className="bg-winBlue text-white font-bold px-2 py-1 text-lg flex items-center gap-2">
          <img src="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png" alt="folder" className="w-5 h-5" />
          C:\Cuevana_XP\Mi_Colección
        </h2>
      </div>
      
      <div className="bg-white border border-gray-400 p-4 shadow-inner min-h-[50vh]">
        <h3 className="text-[#0054e3] font-bold border-b border-[#0054e3] pb-1 mb-4 text-sm flex items-center gap-2">
            Archivos de Video Locales
        </h3>
        
        {/* Renderizamos las tarjetas directamente desde nuestra lista local */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
          {myCollection.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}