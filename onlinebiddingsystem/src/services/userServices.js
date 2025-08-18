import api from "../api";

export const userCerndincial = async () => {
    const response = await api.get('api/user/');
    return response.data
}