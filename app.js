const Express =require("express");
const mysql=require("mysql");
const path=require("path");
const hbs =require("hbs");
const bodyParser = require('body-parser');
const multer = require('multer');
const ibm = require('ibm-cos-sdk');
const fs = require('fs');

const app =Express();

const database=mysql.createConnection({
    host:'localhost',
    user:'Aravind',
    password:'navani003',
    database:'loginregister',
});
database.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("database connected sucesssfully");
    }
})




app.use(Express.urlencoded({extended : false}));
const location=path.join(__dirname,"./public");
app.use(Express.static(location));
// console.log(__dirname);

app.set("view engine","hbs");

const pathpartials=path.join(__dirname,"./views/partials");
hbs.registerPartials(pathpartials);

app.use("/",require("./routes/pages"));
app.use("/auth",require("./routes/auth"));

app.listen(4000 ,()=>{
    console.log("server Started");
})
// ... (previous code)





const cos = new ibm.S3({
  endpoint: 's3.us.cloud-object-storage.appdomain.cloud',
  apiKeyId: 'JgP2V5lQRpEQ1jRukI2Ua84d84iBq4EZbH8ecHr4KQVB',
  serviceInstanceId: 'crn:v1:bluemix:public:cloud-object-storage:global:a/b7a6a319fff246b3a3fd2b9003efee8f:4419afe7-1c00-48c7-92b4-61cc8a8b86ba:bucket:datastoring',
});

const upload = multer({ dest: 'uploads/' });

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/upload', upload.single('video'), (req, res) => {
  const videoFile = req.file;
  if (!videoFile) {
    return res.render('uploads', { msg: "No file uploaded because of incorrect file format." });
  }

  const params = {
    Bucket: 'datastoring',
    Key: videoFile.originalname, // Use the original file name
    Body: fs.createReadStream(videoFile.path),
  };

  cos.upload(params, (err, data) => {
    if (err) {
      console.error(err);
      return res.render('uploads', { msg: 'Error uploading the video.' });
    } else {
      console.log('Video uploaded successfully:', data.Location);
      return res.render('uploads', { msg: 'Video uploaded successfully.' });
    }
  });
});


/// listing (or ) fetching

const params = {
  Bucket: 'datastoring',
};

cos.listObjects(params, (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const objectCount = data.Contents.length;
  console.log(data.Contents);
  console.log(`Number of objects in the bucket: ${objectCount}`);
});


const bucketName = 'datastoring';

// Function to list objects in the bucket and generate download links
function listObjectsAndGenerateDownloadLinks(bucketName) {
  return new Promise((resolve, reject) => {
    cos.listObjects({ Bucket: bucketName }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const objects = data.Contents;

        const downloadLinks = objects.map(object => {
          const objectKey = object.Key;
          const downloadLink = `${cos.endpoint.href}${bucketName}/${objectKey}`;
          return {
            name: objectKey,
            downloadLink: downloadLink,
          };
        });

        resolve(downloadLinks);
      }
    });
  });
}

// Usage
listObjectsAndGenerateDownloadLinks(bucketName)
  .then(downloadLinks => {
    downloadLinks.forEach(link => {
      console.log(`Object Name: ${link.name}`);
      console.log(`Download Link: ${link.downloadLink}`);
      console.log('---');
    });
  })
  .catch(error => {
    console.error(`Error listing objects: ${error}`);
  });

  
