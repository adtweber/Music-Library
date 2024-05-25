import './App.css';
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Navigate } from 'react-router-dom'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'

function App() {
  let [searchTerm, setSearchTerm] = useState('')
  let [data, setData] = useState([])
  let [message, setMessage] = useState('Search for Music!')

  const API_URL = `https://itunes.apple.com/search?term=`

  function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  useEffect(() => {
    if (searchTerm) {
      document.title = `${searchTerm} Music`
      const fetchData = async () => {
        const response = await fetch(API_URL + searchTerm)
        const resData = await response.json()
        if (resData.results.length > 0) {
          setData(resData.results)
        } else {
          setMessage('Not Found')
        }
      }
      fetchData()
    }
  }, [searchTerm, API_URL])

  const handleSearch = (e, term) => {
    e.preventDefault()
    term = toTitleCase(term)
    setSearchTerm(term)
    return (<Navigate to="/" />)
  }

  return (
    <div className="App">
      {message}
      <Router>
        <Routes exact path="/">
          <SearchBar handleSearch={handleSearch} />
          <Gallery data={data} />
        </Routes>
        <Routes path="/album/:id">
          <AlbumView term={searchTerm} />
        </Routes>
        <Routes path="/artist/:id">
          <ArtistView term={searchTerm} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;