import React, { useEffect, useState } from 'react';
import PokemonList from './components/PokemonList';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPokemons = async () => {
    try {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
      const data = await res.json();

      const details = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return await res.json();
        })
      );

      setPokemons(details);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar os Pokémons:', error);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <div className="app-container">
      <h1 className="title">Pokédex</h1>
      {loading ? <p>Carregando Pokémons...</p> : <PokemonList pokemons={pokemons} />}
    </div>
  );
}

export default App;
