import './App.css';
import {useEffect,useState,useRef} from 'react'


function App() {
  const inputRef = useRef(null)

const search=()=>{
  searchForRecipe(inputRef.current.value)
  inputRef.current.value=''
}

const searchForRecipe=(query)=>
{
  setLoading(true)
  const url =`https://api.edamam.com/search?q=${query}&app_id=2ef4d7db&app_key=25bbb9dec73ce7e1fe43163d963fe3b4`;
  fetch(url,{node:"nno-cors"})
  .then(response=>response.json()).then(res=>{
    setIngredientsList(res.hits)
    setLoading(false)
    console.log(res)
  })
  .catch(err=>
    {
      console.log("error",err)
      setLoading(false)
    });
}
const [ingredientsList,setIngredientsList]=useState([]);
const [loading,setLoading]=useState(false);
  useEffect(()=>
  {
    searchForRecipe('chicken')
  },[]);



  return (
    <div className="App">
      <header className="App-header">
        <div className="inputWrapper">
          <input ref={inputRef} placeholder ="Search for recipe" type="text" />
          <button onClick={search}>Search</button>
        </div>

        <div>
          {loading&& <p>Loading...</p>  }
        </div>
        <div className="Wrapper">
          {ingredientsList.map(({recipe})=>{
            const {label,image,ingredientLines}=recipe
            return(
              <div key ={label} className="Ingredient">
                <span>
                  {label}
                </span>
<img src={image}  />

<div className="steps">
{ingredientLines.map((step,index)=>{

return <p key={index}>{step}</p>
})}
</div>

              </div>
            )
          })}

        </div>
      </header>
    </div>
  );
}

export default App;
