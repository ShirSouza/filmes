//BASE DA URL:https://api.themoviedb.org/3/
//URL DA API:movie/550?api_key=6a90e49778ad899d84de8cbf07aae242

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});


export default api;