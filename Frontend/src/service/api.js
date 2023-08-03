import axios from 'axios';

const URL = 'http://localhost:8000';
 
export const authenticateSignup = async (data) => {
    try {
        return await axios.post(`${URL}/signup`,data);
    } catch(error){
        console.log('Error while calling signup api',error);
    }
}
export const authenticateLogin = async (data) => {
    try {
        return await axios.post(`${URL}/login`,data);
    } catch(error){
        console.log('Error while calling login api',error);
        return error.response;
    }
}

export const getProductById = async (id) => {
    try {
        return await axios.get(`${URL}/product/${id}`);
    } catch (error) {
        console.log('Error while getting product by id response', error);
    }
}

export  const payUsingPaytm = async (data) => {
    try {
        let response = await axios.post(`${URL}/payment`, data);
        return response.data;
    } catch (error) {
        console.log('Error', error);
    }
}