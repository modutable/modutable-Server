import { Router, Request, Response } from "express";
import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import sharp from "sharp";

const router = Router();
AWS.config.loadFromPath(__dirname + "/../../awsconfig.json");
let s3 = new AWS.S3();

let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "modutable-images/profile",
    key: function(req, file, cb) {
      let extension = path.extname(file.originalname);
      console.log(file.originalname);
      cb(null, Date.now().toString() + extension);
    },
    acl: "public-read-write"
  })
});

router.get("/profile", (req: Request, res: Response) => {
  res.render("upload");
});
router.post(
  "/profile",
  upload.single("userfile"),
  async (req: Request, res: Response) => {
    res.json("successfull");
  }
);

export = router;
