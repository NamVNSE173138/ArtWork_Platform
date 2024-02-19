export function generatePassword(length: number, prefix: String) {
    let result = prefix + '';
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*?/";
    let counter = prefix.length;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
      counter += 1;
    }
    return result;
}

export function generateCode(length: number, prefix: String) {
  let result = prefix + '';
  const characters = "0123456789";
  let counter = prefix.length;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
    counter += 1;
  }
  return result;
}