

// import AWS from 'aws-sdk';
// import { Readable } from 'stream';

// AWS.config.update({
//   region: 'us-east-1',
//   credentials: {
//     accessKeyId: process.env.ACCESS_KEY_ID,
//     secretAccessKey: process.env.SECRET_ACCESS_KEY,
//   },
// });

// const s3 = new AWS.S3();

// export const config = {
//   api: {
//     bodyParser: false, // Disable the built-in bodyParser
//   },
// };

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const bucketName = 'imaginated-video-content';
//     const uploadPath = 'chunk';
//     const partSize = 8 * 1024 * 1024; // each uploaded part will have ~8MB

//     const fileStream = req;
//     const fileName = req.headers['x-file-name'];

//     const uploadParams = {
//       Bucket: bucketName,
//       Key: `${uploadPath}/${fileName}`,
//     };

//     let uploadId;

//     s3.createMultipartUpload(uploadParams, (err, data) => {
//       if (err) {
//         // Handle error
//       } else {
//         uploadId = data.UploadId;
//       }
//     });

//     let partNumber = 1;
//     let parts = [];

//     fileStream.on('data', (chunk) => {
//       const readableStream = new Readable();
//       readableStream.push(chunk);
//       readableStream.push(null);

//       const partParams = {
//         Body: readableStream,
//         Bucket: bucketName,
//         Key: uploadParams.Key,
//         PartNumber: partNumber,
//         UploadId: uploadId,
//       };

//       s3.uploadPart(partParams, (err, data) => {
//         if (err) {
//           // Handle error
//         } else {
//           parts.push({
//             ETag: data.ETag,
//             PartNumber: partNumber,
//           });

//           partNumber++;
//         }
//       });
//     });

//     fileStream.on('end', () => {
//       const completeParams = {
//         Bucket: bucketName,
//         Key: uploadParams.Key,
//         MultipartUpload: {
//           Parts: parts,
//         },
//         UploadId: uploadId,
//       };

//       s3.completeMultipartUpload(completeParams, (err, data) => {
//         if (err) {
//           // Handle error
//         } else {
//           // Handle successful upload
//         }
//       });
//     });

//     fileStream.on('error', (err) => {
//       // Handle error
//     });

//     res.status(200).end();
//   } else {
//     res.status(405).json({ error: 'Method not allowed.' });
//   }
// }