import axios from 'axios';

const baseUrl = '/api/v1/product/';

export const getAllProducts = async () => {
    let resp = {
        data: null,
        error: false,
    }

    try {
        const res = await axios.get(baseUrl);
        resp.data = res.data;
    } catch (err) {
        resp.error = true;
        resp.data = err.response.data.message; //the message from the server
    }

    return resp;
}

export const createProduct = async (createdProduct) => {
    let resp = {
        data: null,
        error: false,
    }

    try {
        const res = await await axios.post(`${baseUrl}/create`, createdProduct, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            
        });
        resp.data = res.data;
    } catch (err) {
        resp.error = true;
        resp.data = err.response.data.message; //the message from the server
    }

    return resp;
}

export const testProductFail = async () => {
    let resp = {
        data: null,
        error: false,
    }

    try {
        const res = await axios.get(`${baseUrl}/fail`);
        resp.data = res;
    } catch (err) {
        resp.error = true;
        resp.data = err.response.data.message; //the message from the server
    }

    return resp;
}