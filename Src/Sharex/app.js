const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const isBot = require('is-bot');
const bodyParser = require('body-parser');
const path = require('path');
const { getFileType } = require('../Utils/fileutil.js');
const config = require('../../config.json');
const session = require('express-session');

router.use(express.json());
router.use(bodyParser.json());
router.use(express.urlencoded({ extended: true }));
router.use(session({
    secret: config.Web.Secret,
    resave: false,
    saveUninitialized: true,
}));


const uploadRouter = require('./Api/uploadApi'); 
router.use('/api', uploadRouter); 

const getImageInfo = async () => {
  const uploadsPath = path.join(__dirname, '../../Uploads');
  const imageInfo = [];

  try {
    const directories = await fs.readdir(uploadsPath, { withFileTypes: true });

    for (const dirent of directories) {
      if (dirent.isDirectory()) {
        const directoryPath = path.join(uploadsPath, dirent.name);
        const files = await fs.readdir(directoryPath);

        for (const file of files) {
          const filePath = path.join(directoryPath, file);
          const stats = await fs.stat(filePath);

          if (/\.(png|jpe?g|gif)$/i.test(file)) {
            imageInfo.push({
              filename: file,
              directory: dirent.name,
              uploadDateTime: stats.birthtime,
            });
          }
        }
      }
    }
  } catch (error) {
    console.error('Error fetching image information:', error.message);
  }

  return imageInfo;
};

router.use(async (req, res, next) => {
  const imageInfo = await getImageInfo();
  req.imageInfo = imageInfo;
  next();
});


const views = new Map();
router.use((req, res, next) => {
  if (!isBot(req.headers['user-agent'])) {
    const ip = req.ip || req.connection.remoteAddress;
    if (!views.has(ip)) {
      views.set(ip, true);
      const viewCount = views.size;
    }
  }
  next();
});

router.get('/api/viewcount/:filename', (req, res) => {
  const viewCount = views.size;
  res.json({ viewCount });
});


// InfoApi Router
const infoRouter = require('./Api/infoApi.js');
router.use('/api', infoRouter);

// LoginApi Router
const loginRoute = require('./Api/loginApi.js');
router.use('/api/login', loginRoute);

// LogoutApi Router
router.use('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

    res.redirect('/login');
  });
});

// DashboardApi Router
const dashboardRoute = require('./Api/dashboardApi.js');
router.use('/dashboard', dashboardRoute);

// DashboardFilesApi Router
const viewFilesRoute = require('./Api/viewApi.js');
router.use('/api', viewFilesRoute);





// Pages
router.get('/', (req, res) => {
  const loggedIn = req.session.user && req.session.user.authenticated;

  res.render('index.ejs', {loggedIn});
});

router.get('/login', (req, res) => {
  res.render('login.ejs', {config: config});
});



router.get('/dashboard', (req, res) => {
  res.render('dashboard/index.ejs', {username: config.Admin.username});
});

router.get('/dashboard/files', (req, res) => {
  res.render('dashboard/files.ejs', {username: config.Admin.username});
});


router.get('/i/:filename', (req, res) => {
  let fileType = getFileType(req.params.filename);
  if (fileType === 'other') {
    return res.sendStatus(400);
  }

  const uploadInfo = req.imageInfo.find(
    (image) => image.filename === req.params.filename
  );

  const loggedIn = req.session.user && req.session.user.authenticated;

  res.render('i/index.ejs', { filename: req.params.filename, fileType, uploadInfo, loggedIn });
});


router.get('/raw/i/:filename', async (req, res, next) => {
  let fileName = req.params.filename;
  let fileType = getFileType(fileName);
  if (fileType === 'other') {
    return res.sendStatus(400);
  }
  let filePath = path.join(__dirname, '../../', 'Uploads', (fileType.charAt(0).toUpperCase() + fileType.slice(1)), fileName);

  try {
    await fs.access(filePath);
  } catch (err) {
    return res.sendStatus(404);
  }

  res.sendFile(filePath);
});


const uploadFolder = path.join(__dirname, '../../', 'Uploads');

const findFile = async (directoryPath, filename) => {
  const files = await fs.readdir(directoryPath, { withFileTypes: true });

  for (const file of files) {
    const filePath = path.join(directoryPath, file.name);

    if (file.isDirectory()) {
      const foundFile = await findFile(filePath, filename);
      if (foundFile) {
        return foundFile;
      }
    } else if (file.name === filename) {
      return filePath;
    }
  }

  return null;
};

router.delete('/api/delete/:filename', async (req, res) => {
  const filename = req.params.filename;

  try {
    const filePath = await findFile(uploadFolder, filename);

    if (filePath) {
      await fs.unlink(filePath);
      res.json({ success: true, message: 'File Deleted Successfully' });
    } else {
      res.status(404).json({ success: false, message: 'File Not Found' });
    }
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});



module.exports = router;