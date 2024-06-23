import jwt from "jsonwebtoken";

export function useJwtDecode() {
  let user = {};
  try {
    const token = localStorage.getItem("token");
    const decode = jwt.decode(token as string);
    console.log("decode");
    user = decode.user;

    // const decode = jwt
  } catch (err) {
    console.log("error decoding", err);
  }
  return user;
}
