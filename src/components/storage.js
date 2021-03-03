// store token from 'POST request server response' after authentication
export const setUserToken = (token) => sessionStorage.setItem('authToken', token);

// retrieve token for use in 'viewSiteList GET request'
export const getUserToken = (authToken) => sessionStorage.getItem(authToken);

// remove token from authenticated user to sign out 
export const removeUserToken = (authToken) => sessionStorage.removeItem(authToken);
