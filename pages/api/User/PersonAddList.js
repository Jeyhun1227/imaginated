import { getSession } from "next-auth/react";
const PoolConnection = require('../postgressql')
import nc from "next-connect";
const path = require('path');
const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer'),
multerS3 = require('multer-s3')

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
        bucket: 'imaginated-individual-premium-image-public',
        // META DATA FOR PUTTING FIELD NAME
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        // SET / MODIFY ORIGINAL FILE NAME
        key: async function (req, file, cb) {
            const session = await getSession({ req })
            cb(null, `${session.id}-${file.originalname}`); 

        }
    }),
    // SET DEFAULT FILE SIZE UPLOAD LIMIT
    limits: { fileSize: 1024 * 1024 * 30 }, // 30MB
    // FILTER OPTIONS LIKE VALIDATING FILE EXTENSION
    fileFilter: async function(req, file, cb) {

        const session = await getSession({ req })

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
  const session = await getSession({ req })


// https://imaginated-individual-premium-image-public.s3.amazonaws.com/favorite-undefined-cl6a08bxq0006tez2mt9h0x44-test
    const p_result = await PoolConnection.query('SELECT * FROM "User" WHERE id = $1', [session.id])
    if(p_result.rows.length === 0) return {error: 'No Individual'}
    const individualId = p_result.rows[0].individual
    if(!individualId) return {error: 'No Individual'}
    const imagelink = `https://imaginated-individual-premium-image-public.s3.amazonaws.com/${session.id}-${req.file.originalname}`
    let sql_command = null;
    let values = [];
    if(req.body.type === 'favorite'){
      sql_command = `INSERT INTO individual_user_edit(record_type, userid, individualid, imagelink, link, category, description, name) VALUES($1, $2, $3, $4, $5,$6,$7,$8)`
      values = ['favorite', session.id, individualId, imagelink, req.body.link, req.body.category, req.body.description, req.body.name]

    }else{
      let subcategory = req.body.subcategory.split(' || ');
      sql_command = `INSERT INTO individual_user_edit(record_type, type, userid, individualid, imagelink, link, subcategory, description, name) VALUES($1, $2, $3, $4, $5,$6,$7,$8, $9)`
      values = ['paid', req.body.type, session.id, individualId, imagelink, req.body.link, subcategory, req.body.description, req.body.name]

    }

    const individual_added = await PoolConnection.query(sql_command, values)
    // name, description, subcategory, imagelink, link, type, rank

  res.status(200).send({
      result: individual_added.rowCount
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

