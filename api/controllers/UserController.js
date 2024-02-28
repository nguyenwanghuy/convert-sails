/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const fs = require('fs');
module.exports = {
  uploadImage: function (req, res) {
    try {
      req.file('avatar').upload({
     
        maxBytes: 10000000,
        dirname: require('path').resolve(sails.config.appPath, 'uploads'),
        saveAs: function (file, cb) {
          const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
          const fileExtension = file.filename.split(".").pop();
          const originalFilename = file.filename.split(".")[0];
          const newFilename = `${originalFilename}-${uniqueSuffix}.${fileExtension}`;
          cb(null, newFilename);
        }
      }, async function (err, uploadedFiles) {
        if (err) {
          return res.serverError(err);
        }

        if (uploadedFiles.length === 0) {
          return res.badRequest('No file was uploaded');
        }
  
        // Get the file path of the uploaded file
        const filePath = uploadedFiles[0].fd;
        console.log(filePath);
        console.log(uploadedFiles);
  
        // Create a new user record
        const {id}= req.user
        const newUser = await User.create({
          avatar: filePath,
          idUser:id
        })
  
        const baseUrl = 'http://localhost:1337';
        const fileUrl = new URL('/user/uploadImage/' + require('path').parse(filePath).base, baseUrl).toString();
        fs.unlinkSync(filePath);
  
       
        return res.ok({
          fileUrl: fileUrl,
          message: 'File uploaded successfully',
          user: newUser
        });
      });
    } catch (error) {
      return res.serverError(error);
    }
  }
}