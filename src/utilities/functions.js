// Parameters: timestamp in JS Date() format
// Return: String for rendering in User's preferred format
export function printDate( dateTime ){
  // TODO: Check user's preference and format accordingly...
  var temp = new Date(dateTime);

  var day = temp.getDate();
  var month = temp.getMonth() + 1; // returns 0-11
  var year = temp.getFullYear();

  return day + '.' + month + '.' + year;
};

export function uploadPhotoAsync (localUri, filename) {
  const formData = new FormData()
  const data = {
    uri: localUri,
    name: `${filename}.jpg`,
    type: 'image/jpeg',
  }

  formData.append('data', data)

  const options = {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  }

  return fetch('https://api.graph.cool/file/v1/cjg9nh2n867jz0186txci6h4n', options)
  .then((response) => {
    return response.json()
  }).then((image) => {
    console.log(image)
    return image
  })
  .catch(error => console.error(`Error uploading image`));
}