import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [loading, setLoading] = useState(false);
  const [moviesList, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [reloading, setReloading] = useState(false);
  const [title, setTitle] = useState('');
  const [openingText, setOpeningText] = useState('');
  const [releaseDate, setReleaseDate] = useState('');

  const fetchMoviesHandler = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('https://swapi.dev/api/films');
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
  })

  useEffect(() => {
    fetchMoviesHandler();
  }, [])

  const addMovieHandler = () => {
    let newMovie = {
      id: Math.floor(Math.random() * 100),
      title: title,
      openingText: openingText,
      releaseDate: releaseDate
    };
    setMovies((state) => [
      ...state,
      newMovie
    ]);
  }

  return (
    <React.Fragment>
      <section>
        <span>Title</span>
        <input className='inputBox' onChange={(e) => setTitle(e.target.value)}/>
        <span>Opening Text</span>
        <textarea className='inputBox' onChange={(e) => setOpeningText(e.target.value)}/>
        <span>Release Date</span>
        <input className='inputBox' onChange={(e) => setReleaseDate(e.target.value)}/>
        <button onClick={addMovieHandler}>Add Movie</button>
      </section>
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
