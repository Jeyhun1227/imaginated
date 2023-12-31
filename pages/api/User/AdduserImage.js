const PoolConnection = require('../postgressql')
import nc from "next-connect";
const path = require('path');
const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer'),
multerS3 = require('multer-s3');
import { getSessionFromCookie } from '../auth_token_response';


const handler = nc({  onError: (err, req, res, next) => {

  if(err.stack) return   res.status(200).send({error: err.stack});
    // .send({error: err})
    if(err) return res.status(200).send({error: err});
    // console.error("errVAL: HERE");
    // res.status(500).end();

    // return res.status(200).send({error: err});
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  }});



let S3 = new S3Client({
    region: 'us-east-1', 
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
    sslEnabled: false,
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
  });



var upload = multer({
    // CREATE MULTER-S3 FUNCTION FOR STORAGE
    storage: multerS3({
        s3: S3,
        // acl: 'public-read',
        bucket: 'imaginated-user-images-public',
        // META DATA FOR PUTTING FIELD NAME
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        // SET / MODIFY ORIGINAL FILE NAME
        key: async function (req, file, cb) {
// path.extname(file.originalname).toLowerCase()
            const session = await getSessionFromCookie({ req })
            console.log('file: ', file)
            cb(null, 'user-' + session.user.id + path.extname(file.originalname)); //set unique file name if you wise using Date.toISOString()

        }
    }),
    // SET DEFAULT FILE SIZE UPLOAD LIMIT
    limits: { fileSize: 1024 * 1024 * 30 }, // 30MB
    // FILTER OPTIONS LIKE VALIDATING FILE EXTENSION
    fileFilter: async function(req, file, cb) {

      const session = await getSessionFromCookie({ req })

        if(!session) return cb("Error: you must be logged in first!");
        const filetypes = /jpeg|jpg|png|pdf/;

        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb("Error: Allow images only of extensions jpeg|jpg|png|pdf !");
        }
    }
});



let uploadFile = upload.single("Image");
handler.use(uploadFile);
handler.post(async (req, res) => {
  const session = await getSessionFromCookie({ req })


    var user_updated = await PoolConnection.query('UPDATE "User" SET image = $1 WHERE id = $2', ['https://imaginated-user-images-public.s3.amazonaws.com/user-' + session.user.id + path.extname(req.file.originalname), session.user.id])
// https://imaginated-user-images-public.s3.amazonaws.com/ID-32220502-d874-4bda-bb95-34c1cf232885
  // console.log("req.individual: ", req.body.individual);
// 
//   let url = "http://" + req.headers.host;
//   let filename = req.file.filename;

  res.status(200).send({
    // result: result,
    // url: url + "/public/" + req.file.filename,
  });
});

export default handler;
export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};

// export default async (req, res) => {
//   const session = await getSession({ req })
//     if (req.method === 'POST') {
//         if (session) {

//             console.log(req.files)
//             console.log(req)
//         }
//     }
//     return res.status(403).json({
//         message:
//             'You must be sign in to view the protected content on this page.',
//         })
// }