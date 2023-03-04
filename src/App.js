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
      const response = await fetch('https://react-movies-8029a-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json');
      console.log(response.json());
      if (!response.ok) {
        throw new Error('Something went wrong... retrying');
      }
      const data = await response.json();
      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        })
      }
      let movies = loadedMovies.map((ele) => {
        return {
          id: ele.id,
          title: ele.title,
          openingText: ele.openingText,
          releaseDate: ele.releaseDate
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

  const addMovieHandler = async () => {
    let newMovie = {
      title: title,
      openingText: openingText,
      releaseDate: releaseDate
    };
    await fetch('https://react-movies-8029a-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json', {
      method: 'POST',
      body: JSON.stringify(newMovie),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  const removeMovieHandler = async (id) => {
    const response = await (await fetch('https://react-movies-8029a-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json')).json();
    let updatedList = [];
    console.log(response);
    for (const key in response) {
      if (key !== id) {
        updatedList.push({
          id: key,
          title: response[key].title,
          openingText: response[key].openingText,
          releaseDate: response[key].releaseDate
        });
      }
    }
    console.log(updatedList, id);
    await fetch('https://react-movies-8029a-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json', {
      method: 'POST',
      body: JSON.stringify(updatedList),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    fetchMoviesHandler();
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
        {!loading && <MoviesList movies={moviesList} deleteMovie={removeMovieHandler} />}
        {loading && <p>Loading...</p>}
        {!loading && error && <p>{error}</p>}
        {reloading && <button onClick={() => {setReloading(false)}} style={{backgroundColor: 'red'}}>Cancel</button>}
      </section>
    </React.Fragment>
  );
}

export default App;
