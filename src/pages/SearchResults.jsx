import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import AnimeCard from '../components/AnimeCard';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/search?q=${query}`)
      .then(res => setResults(res.data))
      .catch(err => setResults([]))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Resultados para: <span className="text-primary">{query}</span></h2>
      {loading ? (
        <div className="text-center text-gray-400 py-20">Buscando...</div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {results.map((anime, i) => (
            <AnimeCard key={anime.id || i} anime={anime} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-10">No se encontraron resultados.</div>
      )}
    </div>
  );
}