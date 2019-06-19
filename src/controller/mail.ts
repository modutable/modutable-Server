import { Request, Response } from "express";
import nodemailer from "nodemailer";
import { getRepository, createQueryBuilder } from "typeorm";
import { Users } from "../entity/Users";
require("dotenv").config();

export = {
  sendMail: async (req: Request, res: Response) => {
    const result = await getRepository(Users)
      .createQueryBuilder("Users")
      .where(`Users.email = :email`, { email: req.query.email })
      .getMany();
    if (result.length === 0) {
      res.json(
        "Does not exit your Email in our Service. Please your confirm Email.."
      );
      return;
    }
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });
    let mailOptions = {
      from: "'InYong@moduTable.com <jiy8319@gmail.com>'", // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
      to: req.query.email, // 수신 메일 주소
      subject: "You can change you Password!", // 제목
      html: `You can change your password by following the link below. \n<p>Click <a href="${process
        .env.MAIL_RINK +
        "?email=" +
        req.query.email}">here</a></p>`
    };
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.json("We Send Email to " + req.query.email);
  }
};
