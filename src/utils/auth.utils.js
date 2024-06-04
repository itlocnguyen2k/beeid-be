import jwt from "jsonwebtoken";

export function generatorCode() {
  const chars = "0123456789";
  let code = "";
  for (var i = 0; i <= 3; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    code += chars.substring(randomNumber, randomNumber + 1);
  }
  return code;
}

export function generatorAccessToken(account) {
  return jwt.sign({ data: account }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}
