import React, {useEffect, useState} from 'react';
import Recipe from './Recipe' 

import './App.css';

const App = () => {
  
  const APP_ID = '667575ee';
  const APP_KEY = 'aa430837eaa16786b7d1791e02e85974';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  // const [counter, setCounter ] = useState(0);

  useEffect( () => {
    // console.log('Effect has been run');
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = response.json();

    console.log(data);
    // setRecipes(data.hits);
    data.then(function(result){
      console.log(result)
      setRecipes(result.hits);
    })
  } 

  const updateSearch = e => {
    setSearch(e.target.value);
  }
  const getSearch = e => {
    e.preventDefault();
    setQuery(search)
    setSearch('');
  }

  return (
    <div className='App'>
        <form onSubmit={getSearch} className='search-form'>
          <input className='search-bar' value={search} onChange={updateSearch} type='text'/>
          <button className='search-button' type='submit'>Search</button>
        </form>
        <div className="recipes">
        {/* <h2 onClick={() => setCounter(counter + 1)} > 
        {counter}
        </h2> */}
        {recipes.map((recipe, index) => (
          <Recipe key={index} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients} />
        ))}
        </div>
    </div>
  )
}

export default App;
