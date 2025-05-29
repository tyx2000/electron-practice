export const stringToHSLColor = (str: string, saturation = 70, lightness = 60) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  const hue = hash % 360;

  return `hsl(${hue}, ${saturation}, ${lightness})`;
};

export const blobToString = (blob: Blob): string => {
  const url = URL.createObjectURL(blob);
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  xhr.send();
  return xhr.response;
};
