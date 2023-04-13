
//URL DA API:movie/550?api_key=6a90e49778ad899d84de8cbf07aae242
import api from '../../servers/api';
import { useEffect , useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css';

function Home(){
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{

        async function loadFilmes(){
            const response = await  api.get("movie/now_playing", {
                params:{
                    api_key: "6a90e49778ad899d84de8cbf07aae242",
                    language: "pt-BR",
                    page: 1,
                }
            } );

          //console.log(response.data.results.slice(0,10));
            setFilmes(response.data.results.slice(0,10));
            setLoading(false);

        }

        loadFilmes();

    },[])

    if(loading){
        return(
            <div className='loading'>
                <h2>Carregando filmes...</h2>
            </div>
        )
    }

    return(
        <div className='container'>
            <div className='lista-filmes'>
                {filmes.map( (filme) => {
                    return (
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/w500/${filme.poster_path}`} alt={filme.title}/>
                            <Link to={`/filme/${filme.id}`} > Acessar </Link>
                        </article>
                    )
                })}

            </div>             
        </div>
        
    )
}

export default Home;