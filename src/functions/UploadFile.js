import axios from 'axios';

async function  UploadFile (file) {
    const url = "/LeaveForms";
    
    const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };

    await axios.post(url, {
        'file': file,
        'fileName': file.fileName// FileList will be unwrapped as sepate fields
      }, config).then((response) => {
        console.log(response.data);
      });
}
  
  export default UploadFile;