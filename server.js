const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

const testAccount = {
  user: `ME@YOUR_DOMAIN`,
  pass: `CHANGEM3`,
};

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(5000, () => console.log("Server Running"));

const contactEmail = nodemailer.createTransport({
  host: "mail.YOUR_MAIL_HOSTING_DOMAIN.com",
  port: 465,
  secure: true,
  auth: {
    user: testAccount.user,
    pass: testAccount.pass,
  },
  debug: true, // show debug output
  logger: true,
  /*   host: process.env.EMAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  } */
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

router.post("/contact", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  const mail = {
    from: `ME@YOUR_DOMAIN`,
    to: `ME@YOUR_DOMAIN`,
    subject: "Contact Form Submission",
    html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Message: ${message}</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      //console.log("NOPE: ", res);
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: 200 });
    }
  });
});
