import { useState, useEffect } from 'react';
import './app.css'
import SearchIcon from './search.svg'
import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com?apikey=73eecac6'
// const movie1 = {
//     "Title": 'Italian Spiderman',
//     "Year": '2007',
//     "imdbID": 'tt2705436',
//     "Type": 'movie',
//     "Poster": 'https://m.media-amazon.com/images/M/MV5BZWQxMjcwNj…zI3NzdlXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_SX300.jpg'

// }

const App = () => {

    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json()

        setMovies(data.Search)
    }



    useEffect(() => {
        searchMovies('Spiderman')
    }, [])

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            searchMovies(searchTerm);
        }
    };     

    return (
        <div className='app'>
        <h1>MovieLand</h1>

        <div className='search'>
        <input placeholder='Search For Movies' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleKeyDown}/>
        
        <img
        src={SearchIcon}
        alt='Search'
        onClick={() => searchMovies(searchTerm)}/>
        </div>

        {movies?.length > 0 ? (
                
        <div className='container'>
        {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie}/>
        ))}
        
        </div>
            )  :    (
                <div className='empty'>
                <h2>No Movies Found</h2>
                </div>
            )
        }
        </div>
        );
        
}


export default App