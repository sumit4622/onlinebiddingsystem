import adminapi from "../adminapi";

export const fetchItems = async () =>{
    const response = await adminapi.get('api/items/');
    return response.data
}

export const approveBid = async (id) => {
    return adminapi.post(`/api/items/${id}/approve/`)
}

export const rejectBid = async (id) => {
    return adminapi.post(`/api/items/${id}/reject/`);
}