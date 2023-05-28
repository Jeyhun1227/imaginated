// import React, { useRef } from 'react';
// import {Upload} from 'tus-js-client';

// const SettingsPersonsVideos = () => {
//   const inputRef = useRef(null);

//   const handleUpload = async () => {
//     const file = inputRef.current.files[0];
//     console.log('file: ', file)
//     console.log('tus: ', Upload)
//     if (file) {
//       const upload = new Upload(file, {
//         endpoint: '/api/UserFileUpload/',
//         path: '/api/UserFileUpload/',
//         retryDelays: [0, 1000, 3000, 5000],
//         onError: (error) => {
//           console.error('Upload error:', error);
//           // Handle errors
//         },
//         onSuccess: () => {
//           console.log('Upload success!');
//           // Handle successful upload
//         },
//       });

//       upload.start();
//     }
//   };

//   return (
//     <div>
//       <input type="file" accept="video/*" ref={inputRef} />
//       <button onClick={handleUpload}>Upload</button>
//     </div>
//   );
// };
// export default SettingsPersonsVideos;