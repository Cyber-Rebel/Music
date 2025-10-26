const express = require('express');
const router = express.Router();
const authMiddlware = require('../middlewares/auth.middleware.js');
const musicController = require('../controllers/music.controller.js');
const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage()
})


router.post('/upload',authMiddlware.authArtistMiddleware,
    upload.fields([{ name: 'music', maxCount: 1 }, { name: 'coverImage', maxCount: 1 }]),musicController.uploadMusic);

router.get('/',authMiddlware.authUserMiddleware, musicController.getAllMusic);    
router.get('/get-details/:id',authMiddlware.authUserMiddleware, musicController.getMusicById);
router.get('/artist-music',authMiddlware.authArtistMiddleware, musicController.getArtistMusic);

router.post('/playlist',authMiddlware.authArtistMiddleware,musicController.createPlaylist);
router.get('/playlist',authMiddlware.authUserMiddleware,musicController.getPlaylists);
router.get('/playlist/:id',authMiddlware.authUserMiddleware,musicController.getPlaylistById);
module.exports = router;

// const upload = multer({ 
   
//     limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit,
    // fileFilter: (req, file, cb) => {
    //     const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/flac'];
    //     if (!allowedTypes.includes(file.mimetype)) {
    //         return cb(new Error('Invalid file type. Only MP3, WAV, and FLAC are allowed.'));
    //     }
    //     cb(null, true);
    // }
//     storage: multer.diskStorage({
//         destination: (req, file, cb) => {
    //             cb(null, 'uploads/');
    //         },
//         filename: (req, file, cb) => {
//             cb(null, Date.now() + path.extname(file.originalname));
//         }
//     })
// });
// response of upload file{
//   fieldname: 'file',
//   originalname: 'Sahiba(KoshalWorld.Com).mp3',
//   encoding: '7bit',
//   mimetype: 'audio/mpeg',
//   destination: 'uploads/',
//   filename: '1761409549656.mp3',
//   path: 'uploads/1761409549656.mp3',
//   size: 4421829
// }
//------------------------------------------------------------------------------------------------
    // const upload = multer({ 
       
    //     limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit,
    
    //    memoryStorage: multer.memoryStorage()
    // });
    
    // router.post('/uploadSong', upload.single('file'), async (req, res) => {
     
    //     const file = req.file;
    //     console.log(file);
    //   await   uploadfile(file.buffer).then((result)=>{
    //         res.status(200).json({message:"file uploaded successfully", data:result})
    //     }).catch((error)=>{
    //         console.log("error in file upload", error);
    //         res.status(500).json({message:"file upload failed", error})
    //     })
      
    // });