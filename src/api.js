// handle your API calls
import { mockData } from './mock-data';
import axios from 'axios';
import NProgress from 'nprogress';

/**
 *
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */
export const extractLocations = (events) => {
  var extractLocations = events.map((event) => event.location);
  var locations = [...new Set(extractLocations)];
  return locations;
};

const getToken = async (code) => {
    try {
        const encodeCode = encodeURIComponent(code);

        const response = await fetch( 'https://bufa7769da.execute-api.eu-central-1.amazonaws.com/dev/api/token/' + encodeCode);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const { access_token } = await response.json();
        access_token && localStorage.setItem("access_token", access_token);
        return access_token;
    } catch(error) {
        error.json();
    }
}

// Access Token Found in localStorage / checks whether it’s a valid token or not
export const checkToken = async (accessToken) => {
  const result = await fetch( `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`)
    .then((res) => res.json())
    .catch ((error) => error.json());
  return result;
};

//check whether there’s a path, then build the URL with the current path (or build the URL without a path using window.history.pushState()
const removeQuery = () => {
  if (window.history.pushState && window.location.pathname) {
    var newurl = window.location.protocol + '//' + window.location.host + window.location.pathname;
    window.history.pushState('', '', newurl);
  } else {
    newurl = window.location.protocol + '//' + window.location.host;
    window.history.pushState('', '', newurl);
  }
};

// imit the mock data to localhost
export const getEvents = async () => {
  NProgress.start();
// a check to allow mock data to be returned when your app is hosted locally
  if (window.location.href.startsWith('http://localhost')) {
    NProgress.done();
    return mockData;
  }

  // "!navigator.onLine" checks whether the user is offline, but this only works if there’s no internet.  
  // If they are offline, the stored event list is loaded, parsed, and returned as events
  // olace this code before the "const token = await getAccessToken" line. This is because you don’t need to check for an access token if the user is offline 
   if (!navigator.onLine) {
    alert("offline")
      const data = localStorage.getItem('lastEvents');
      NProgress.done();
      return data ? JSON.parse(data).events : [];
    }

  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url = 'https://bufa7769da.execute-api.eu-central-1.amazonaws.com/dev/api/get-events/' + token;
    const result = await axios.get(url);
    if (result.data) {
      var locations = extractLocations(result.data.events);
      // whether there are any results, then save them to localstorage
      localStorage.setItem("lastEvents", JSON.stringify(result.data)); // JSON.stringify(events) (converts the list into a string) function is necessary because events is a list, but localStorage can only store strings.
      localStorage.setItem("locations", JSON.stringify(locations));
    }
    NProgress.done();
    
    return result.data.events;
  }
};

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token') // look if there is an AccessToken in the localStorage of the Users Browser
  // no accessToken found
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem('access_token');
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get('code');
    if (!code) {
      const results = await axios.get('https://bufa7769da.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url');

      const { authUrl } = results.data;
      return (window.location.href = authUrl);
    }

    return code && getToken(code);
  }

  return accessToken;
};