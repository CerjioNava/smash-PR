const axios = require('axios');
const https = require('https');
const httpsAgent = new https.Agent({ rejectUnauthorized: false });
const apiUrl = 'https://api.start.gg/gql/alpha';
const token = '2a0610c7ead5be5b628ac2d519bde4bc';


const query = `query TournamentsByCountry($cCode: String!, $perPage: Int!) {
    tournaments(query: {
      perPage: $perPage
      filter: {
        countryCode: $cCode
      }
    }) {
      nodes {
        id
        name
        countryCode
      }
    }
  },
  {
    "cCode": "JP",
    "perPage": 4
  }`;


axios.get(apiUrl, { httpsAgent })
    .then(response => {
        console.log(response);
    });