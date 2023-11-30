import axios from "axios";


const axiosPublic = axios.create({
    baseURL: 'https://sheba-diagnostic-center-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;