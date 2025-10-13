import adminapi from "../adminapi";

export const fetchItems = async () =>{
    const response = await adminapi.get('items/');
    return response.data
}

export const approveBid = async (id) => {
    return adminapi.post(`items/${id}/approve/`)
}

export const rejectBid = async (id) => {
    return adminapi.post(`items/${id}/reject/`);
}

export const deleteBid = async(bidId) => {
    const response = await adminapi.delete(`items/${bidId}/`)
    return response.data
}