const nodemailer = require('nodemailer')


let transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  module.exports ={
    registrationMail : (mail) => {
        const mailOptions = {
            from: 'sender@gmail.com', // Sender address
            to: mail, // List of recipients
            subject: 'Registration', // Subject line
            text: `Thank you for registration. Your account will activated once admin approved. We will inform you about your status stay connected.`, // Plain text body
          };
          transport.sendMail(mailOptions, function(err, info) {
            if (err) {
              console.log(err)
              res.status(401).json({"Error":err})
            } else {
              res.status(201).json({"Message":"Mail send successfully"})
              // console.log(info);
            }
        });
    }
  }

