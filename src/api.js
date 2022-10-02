// handle your API calls
import { mockData } from './mock-data';
import axios from 'axios'; // still needs to be installed!
import NProgress from 'nprogress'; // still needs to be installed!

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

// Access Token Found in localStorage / checks whether it’s a valid token or not
const checkToken = async (accessToken) => {
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

//limit the mock data to localhost
export const getEvents = async () => {
  NProgress.start();

  if (window.location.href.startsWith("http://localhost")) {
    NProgress.done();
    return mockData;
  }
  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url = 'https://bufa7769da.execute-api.eu-central-1.amazonaws.com/dev/api/get-events' + '/' + token;
    const result = await axios.get(url);
    if (result.data) {
      var locations = extractLocations(result.data.events);
      localStorage.setItem("lastEvents", JSON.stringify(result.data));
      localStorage.setItem("locations", JSON.stringify(locations));
    }
    NProgress.done();
    return result.data.events;
  }
};


export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token') // look if there is an AccessToken in the localStorage of the Users Brwoser
  // no accessToken found
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem('access_token');
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get('code');
    if(!code) {
      const results = await axios.get('https://bufa7769da.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url');
      const { authUrl } = results.data;
      return (window.location.href = authUrl);
    }
    return code && getAccessToken(code);
  }
  return accessToken;
}

const getToken = async (code) => {
    try {
        const encodeCode = encodeURIComponent(code);

        const response = await fetch( 'https://bufa7769da.execute-api.eu-central-1.amazonaws.com/dev/api/token' + '/' + encodeCode);
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