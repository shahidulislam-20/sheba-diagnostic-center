import axios from "axios";


const axiosSecure = axios.create({
    baseURL: 'https://sheba-diagnostic-center-server.vercel.app'
})

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;