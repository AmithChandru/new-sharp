import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [loading, setLoading] = useState(false);
  const [moviesList, setMovies] = useState([]);

  async function fetchMoviesHandler() {
    setLoading(true);
    await fetch('https://swapi.dev/api/films')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
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
      })
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!loading && <MoviesList movies={moviesList} />}
        {loading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
