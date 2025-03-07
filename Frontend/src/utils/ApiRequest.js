const host = "http://localhost:5000"; 

export const registerAPI = `${host}/api/users/register`; 
export const loginAPI = `${host}/api/users/login`;       
export const setAvatarAPI = `${host}/api/users/setAvatar`;

export const addTransaction = `${host}/api/transactions/add`;     
export const getTransactions = `${host}/api/transactions/get`;    
export const editTransactions = `${host}/api/transactions/update`; 
export const deleteTransactions = `${host}/api/transactions/delete`;
