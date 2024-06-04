import bcrypt from "bcrypt";

const salt = bcrypt.genSaltSync(10);

export async function verifyPassword(password, passwordConfirm) {
  return bcrypt.compareSync(password, passwordConfirm);
}

export async function generatorPassword() {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let password = "";
  for (var i = 0; i <= 8; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  return password;
}

export async function hashSyncPassword(password) {
  return bcrypt.hashSync(password, salt);
}
