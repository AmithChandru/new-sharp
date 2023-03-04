import React, { useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [loading, setLoading] = useState(false);
  const [moviesList, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [reloading, setReloading] = useState(false);

  useEffect(() => {
    reloading && setInterval(() => {
      fetchMoviesHandler();
    }, 5000)
  }, [reloading])

  async function fetchMoviesHandler() {
    setLoading(true);
    try {
      const response = await fetch('https://swapi.dev/api/film');
      if (!response.ok) {
        throw new Error('Something went wrong... retrying');
      }
      const data = await response.json();
      let movies = data.results.map((ele) => {
        return {
          id: ele.episode_id,
          title: ele.title,
          openingText: ele.opening_crawl,
          releaseDate: ele.release_date
        }
      })
      setMovies(movies);
      setLoading(false);
      setReloading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      setReloading(true);
    }
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!loading && <MoviesList movies={moviesList} />}
        {loading && <p>Loading...</p>}
        {!loading && error && <p>{error}</p>}
        {reloading && <button onClick={() => {setReloading(false)}} style={{backgroundColor: 'red'}}>Cancel</button>}
      </section>
    </React.Fragment>
  );
}

export default App;
