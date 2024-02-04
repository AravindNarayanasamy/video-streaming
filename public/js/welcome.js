const express = require('express');
const hbs = require('hbs');
const app = express();

// Import the IBM Cloud Object Storage module and configure it
const ibm = require('ibm-cos-sdk');
const cos = new ibm.S3({
  endpoint: 's3.us.cloud-object-storage.appdomain.cloud',
  apiKeyId: 'JgP2V5lQRpEQ1jRukI2Ua84d84iBq4EZbH8ecHr4KQVB',
  serviceInstanceId: 'crn:v1:bluemix:public:cloud-object-storage:global:a/b7a6a319fff246b3a3fd2b9003efee8f:4419afe7-1c00-48c7-92b4-61cc8a8b86ba:bucket:datastoring',
});

const bucketName = 'datastoring';

// Define a route that fetches the objects and renders the welcome page
app.get('/welcome', async (req, res) => {
  try {
    // Fetch the list of objects and generate download links
    const objects = await listObjectsAndGenerateDownloadLinks(bucketName);
    // Render the welcome.hbs template with the list of objects
    console.log(objects);
    res.render('Welcome', { objects });
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).send('An error occurred.');
  }
});


