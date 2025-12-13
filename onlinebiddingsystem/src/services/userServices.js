import api from "../api";
import { ACCESS_TOKEN } from "../adminConstants";

export const userCerndincial = async () => {
    const response = await api.get('api/user/');
    return response.data;
}

export const fetchApprovedBid = async () => {
    const response = await api.get("/api/items/")
    return response.data;
}

// export const placeBid = async ({item, bid_amount}) =>{
//     const response = await api.post('/api/items/acceptbid/',{
//         item: item,
//         bid_amount: bid_amount,
//     });
//     return response.data;
// }

export const fetch_latestbid = async ({ itemId }) => {
    const response = await api.get(`/api/items/${itemId}/latest-bid/`);
    return response.data
}

export const connectAuctionSocket = (id) => {
    return new WebSocket(`ws://20.40.56.69:8000/ws/auction/${id}/`);

}

export const getBiditemItem = async (itemId) => {
    const response = await api.get(`/api/items/${itemId}/bids/`)
    return response.data
}

export const feedback = async (itemId, data) => {
    return await api.post(`/api/feedback/${itemId}/sendfeedback/`, data)
}

export const getuserUpdate = async () => {
    return await api.get(`/api/getuser/`)
}

export const userUpdate = async (formData) => {
    return await api.post(`/api/userUpdate/`, formData)
}

export const BiddingHistory = async () => {
    return await api.get(`/api/BiddingHistory/`)
}

export const uploadItem = async () => {
    return await api.get(`/api/uploadItem/`)
}