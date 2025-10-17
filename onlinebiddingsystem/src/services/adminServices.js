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
    try {
        const response = await adminapi.delete(`items/${bidId}/`)
        return response.data
        
    } catch (error) {
        console.log("Error: ", error);
    }
    
}

export const  fetchFeedback = async() =>{
    try {
        const response = await adminapi.get(`feedbacks/`)
        return response.data
        
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const fectUserList = async() =>{
    try {
        const response = await adminapi.get(`users-list/`);
        return response.data
    } catch (error) {
        console.log("Error:  ", error);
    }
}

export const DeleteUser = async (userId) =>{
    try {
        const response = await adminapi.delete(`Delete-user/${userId}/`)
        return response.data
        
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const BlockUser = async (userId) =>{
    try {
        const response = await adminapi.post(`Block-user/${userId}/`)
        return response.data
        
    } catch (error) {
        console.log("Error: ", error);
    }
}