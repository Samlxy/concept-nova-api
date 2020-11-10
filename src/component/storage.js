// store token from 'POST request server response' after authentication
export const setUserToken = (token) => sessionStorage.setItem('authToken', token);

// retrieve token for use in 'viewSiteList GET request'
export const getUserToken = (authToken) => sessionStorage.getItem(authToken);


// store site_id from 'GET request server response' after the use of generated token
export const setSiteId = (site_id) => sessionStorage.setItem('siteID', site_id);

// retrieve site_id for use in 'viewTankList GET request'
export const getSiteId = (siteID) => sessionStorage.getItem(siteID);


// store tank_id from 'viewTankList GET request'
export const setTankId = (tank_id) => sessionStorage.setItem('tankID', tank_id);

// retrieve tank_id for use in 'viewTankDetails GET request'
export const getTankId = (tankID) => sessionStorage.getItem(tankID);
