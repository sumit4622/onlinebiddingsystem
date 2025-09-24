import api from "../api";

export const userCerndincial = async () => {
    const response = await api.get('api/user/');
    return response.data;
}

export const fetchApprovedBid = async () =>{
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

export const fetch_latestbid = async ({itemId}) => {
    const response = await api.get(`/api/items/${itemId}/latest-bid/`);
    return response.data
}

export const connectAuctionSocket =  (id) => {
    return new WebSocket(`ws://localhost:8001/ws/auction/${id}/`);
}