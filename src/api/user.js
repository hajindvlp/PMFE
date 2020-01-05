import axios from 'axios';

const apiEndpoint = 'https://45.32.16.148:3000';

function setUserData(token, callback) {
  let url = `${apiEndpoint}/api/user/me`;
  const config = {
    headers: {
      'x-access-token': token
    }
  };

  axios.get(url, config)
    .then((res) => {
      callback(res.status, res.data, false);
    }).catch((err) => {
      callback(null, null, true);
    })
}

export {setUserData};