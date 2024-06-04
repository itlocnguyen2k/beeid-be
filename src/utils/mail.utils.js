import nodemailer from "nodemailer";
import path from "path";
import log from "../logs/log";
import hbs from "nodemailer-express-handlebars";

export async function sendMailVerifyLoginCodeTemplate(mailTo, loginCode) {
  try {
    const configs = {
      service: process.env.MAIL_SERVICE,
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_FROM,
        pass: process.env.MAIL_PASSWORD,
      },
    };

    const hbsOptions = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve("./src/views"),
        defaultLayout: false,
        layoutsDir: "./src/views",
      },
      viewPath: path.resolve("./src/views"),
      extName: ".handlebars",
    };

    const options = {
      from: process.env.MAIL_FROM,
      to: mailTo,
      subject: "THÔNG BÁO XÁC THỰC ĐĂNG NHẬP",
      template: "verify-login-code-template",
      context: {
        loginCode: loginCode,
      },
    };

    const transporter = nodemailer.createTransport(configs);
    transporter.use("compile", hbs(hbsOptions));

    transporter.sendMail(options, (err, info) => {
      if (err) {
        log.error(err);
        return;
      }
      log.info(info.response);
    });
  } catch (err) {
    log.error(err);
  }
}

export async function sendMailVerifyPasswordCodeTemplate(mailTo, passwordCode, userName) {
  try {
    const configs = {
      service: process.env.MAIL_SERVICE,
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_FROM,
        pass: process.env.MAIL_PASSWORD,
      },
    };

    const hbsOptions = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve("./src/views"),
        defaultLayout: false,
        layoutsDir: "./src/views",
      },
      viewPath: path.resolve("./src/views"),
      extName: ".handlebars",
    };

    const options = {
      from: process.env.MAIL_FROM,
      to: mailTo,
      subject: "THÔNG BÁO YÊU CẦU CẤP LẠI MẬT KHẨU",
      template: "verify-password-code-template",
      context: {
        passwordCode: passwordCode,
        userName: userName,
      },
    };

    const transporter = nodemailer.createTransport(configs);
    transporter.use("compile", hbs(hbsOptions));

    transporter.sendMail(options, (err, info) => {
      if (err) {
        log.error(err);
        return;
      }
      log.info(info.response);
    });
  } catch (err) {
    log.error(err);
  }
}

export async function sendMailGeneratorPasswordTemplate(mailTo, password, userName) {
  try {
    const configs = {
      service: process.env.MAIL_SERVICE,
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_FROM,
        pass: process.env.MAIL_PASSWORD,
      },
    };

    const hbsOptions = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve("./src/views"),
        defaultLayout: false,
        layoutsDir: "./src/views",
      },
      viewPath: path.resolve("./src/views"),
      extName: ".handlebars",
    };

    const options = {
      from: process.env.MAIL_FROM,
      to: mailTo,
      subject: "THÔNG BÁO CẬP NHẬT MẬT KHẨU MỚI",
      template: "generator-password-template",
      context: {
        password: password,
        userName: userName,
      },
    };

    const transporter = nodemailer.createTransport(configs);
    transporter.use("compile", hbs(hbsOptions));

    transporter.sendMail(options, (err, info) => {
      if (err) {
        log.error(err);
        return;
      }
      log.info(info.response);
    });
  } catch (err) {
    log.error(err);
  }
}

export async function createAccountTemplate(mailTo, password, userName) {
  try {
    const configs = {
      service: process.env.MAIL_SERVICE,
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_FROM,
        pass: process.env.MAIL_PASSWORD,
      },
    };

    const hbsOptions = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve("./src/views"),
        defaultLayout: false,
        layoutsDir: "./src/views",
      },
      viewPath: path.resolve("./src/views"),
      extName: ".handlebars",
    };

    const options = {
      from: process.env.MAIL_FROM,
      to: mailTo,
      subject: "THÔNG BÁO ĐĂNG KÝ TÀI KHOẢN",
      template: "create-account-template",
      context: {
        password: password,
        userName: userName,
      },
    };

    const transporter = nodemailer.createTransport(configs);
    transporter.use("compile", hbs(hbsOptions));

    transporter.sendMail(options, (err, info) => {
      if (err) {
        log.error(err);
        return;
      }
      log.info(info.response);
    });
  } catch (err) {
    log.error(err);
  }
}
