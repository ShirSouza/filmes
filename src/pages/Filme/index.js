//import api from '../../servers/api';
import { useEffect , useState } from 'react';
import { Link, useParams , useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';

import api from '../../servers/api';
import './filme-info.css';
 
function Filme(){
    const { id } = useParams();

    const navigate = useNavigate();

    const [filme,setFilme] = useState({});
    const [loading, setLoading] = useState(true);
   
    useEffect(()=>{

        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "6a90e49778ad899d84de8cbf07aae242",
                    language: "pt-BR",
                    page: 1,
                }
            } )
            .then((response)=>{
                console.log(response.data);
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                console.log("Filme não encontrado");
                navigate("/",{ replace:true });
                return;
            })
            ;

          //console.log(response.data.results.slice(0,10));  

        }

        loadFilme();

        return () => {
            console.log("componente desmontado");
        }

    },[navigate , id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos  = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some( (filmesSalvo) =>  filmesSalvo.id === filme.id  )

        if(hasFilme){
            toast.warn("Esse filme já está na sua lista");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso!")
    }
     

    if (loading){
        return(
            <div className='filme-info'>
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }




    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong> Avaliação {filme.vote_average} / 10</strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button> 
                    <a  className='trailer' target="blank" rel="external noreferrer"  href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                         Trailer
                    </a>
                </button>
            </div>

            <Link to={"/"} className='link' > Voltar </Link>
        </div>
    )
}

export default Filme;