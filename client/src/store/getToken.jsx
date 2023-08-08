export const getToken = () => {
    const token = localStorage.getItem("userToken");
    const authHeaders = { headers: { Authorization: `Bearer ${token}` } };
    return authHeaders;
};
