export function stringToArrayLowerCase(string) {
  return string.toLowerCase().trim().split(/\s+/);
}

export function matchAnyCaseInsensitive(string, array) {
  return array.some(arrayItem => {
    const regex = new RegExp(arrayItem, 'i');
    return regex.exec(string);
  });
}