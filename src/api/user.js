import jwt from 'jsonwebtoken';

function getUserData(token) {
  let decTok = jwt.decode(token);
  return decTok;
}

export {getUserData};