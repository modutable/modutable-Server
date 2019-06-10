import { Router, Request, Response, NextFunction } from "express";
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

  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params);
    upload.single("userfile")(req, res, next);
    // let encodedImage = JSON.parse(req.body).user_avatar;
    // console.log(encodedImage);
    // let decpdedImage = Buffer.from(encodedImage, "base64");
    // var filePath = "test.jpg";
    // var params = {
    //   Body: decpdedImage,
    //   Bucket: "modutable-images/profile",
    //   Key: filePath
    // };
    // s3.upload(params, function(err: any, data: any) {
    //   if (err) {
    //     res.json(err);
    //   } else {
    //     let response = {
    //       statusCode: 200,
    //       headers: {
    //         my_header: "my_value"
    //       },
    //       body: JSON.stringify(data),
    //       isBase64Encoded: false
    //     };
    //     res.json(response);
    //   }
    // });

    res.json("successfull");
  }
);

export = router;
