import axios from "axios";

const requestClient = axios.create({
    baseURL: 'https://ecommerce-b6786-default-rtdb.asia-southeast1.firebasedatabase.app/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

export default requestClient;