import { Request, Response } from "express";
import nodemailer from "nodemailer";
require("dotenv").config();

export = {
  sendMail: (req: Request, res: Response) => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });
    let mailOptions = {
      from: "ModuTable.com", // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
      to: req.user.email, // 수신 메일 주소
      subject: "You can change you Password!", // 제목
      html: `You can change your password by following the link below. \n<p>Click <a href="${
        process.env.MAIL_RINK
      }">here</a></p>`
    };
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.json("send Email to " + req.user.email);
  }
};
