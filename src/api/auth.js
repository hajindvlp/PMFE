import axios from 'axios';
import qs from 'querystring';

const apiEndpoint = 'http://45.32.16.148:3000';

function auth(id, pw, callback) {
  let url = `${apiEndpoint}/api/user/auth`;
  let requestBody = {
    id: id,
    pw: pw
  };
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  axios.post(url, qs.stringify(requestBody), config)
    .then((res) => {
      callback(res.status, res.data.token, false);
    }).catch((err) => {
      callback(null, null, true);
    })
}

function register(name, id, pw, callback) {
  let url = `${apiEndpoint}/api/user/register`;
  let requestBody = {
    name: name,
    id: id,
    pw: pw
  };
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  axios.post(url, qs.stringify(requestBody), config)
    .then((res) => {
      callback(res.status, false);
    }).catch((err) => {
      callback(null, true);
    })
}

export {auth, register};