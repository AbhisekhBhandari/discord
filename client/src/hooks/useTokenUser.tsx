import jwt from "jsonwebtoken";
export  function useTokenUser() {
  let user = null;
  try {
    const token = localStorage.getItem("token");
    const decodedToken = jwt.decode(token);
    user = decodedToken.user;
  } catch (err) {
    console.error('failed decoding user')
  }
  return user;
}
