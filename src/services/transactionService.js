import axios from 'axios';

const baseUrl = '/api/v1/transact/';

export const buyProduct = async (id, buyerPublicKey, orderId) => {
    let resp = {
        data: null,
        error: false,
    }

    //since this mostly involves the buyer 
    //grab the user address from here
    try {
        const res = await axios.post(`${baseUrl}/buy`, { id, buyerPublicKey, orderId });
        resp.data = res.data;
    } catch (err) {
        resp.error = true;
        resp.data = err.response.data.message; //the message from the server
    }

    return resp;
}

export const confirmPurchase = async (id) => {
    let resp = {
        data: null,
        error: false,
    }

    try {
        const res = await axios.post(`${baseUrl}/confirmed`, { id });
        resp.data = res.data;
    } catch (err) {
        resp.error = true;
        resp.data = err.response.data.message; //the message from the server
    }

    return resp;
}