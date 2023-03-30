import jwt_decode from "jwt-decode";

export default function isValidToken(token) {
  if (!token) {
    // Token doesn't exist
    return false;
  }

  try {
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      // Token has expired
      localStorage.removeItem('token');
      return false;
    }

    return true;
  } catch (error) {
    // Token is invalid
    return false;
  }
}