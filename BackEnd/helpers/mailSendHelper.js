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
    },

    acceptedMail : (mail,username,id) => {
      const mailOptions = {
        from: 'sender@gmail.com', // Sender address
        to: mail, // List of recipients
        subject: 'Request Accepter', // Subject line
        text: `Hello ${username} we are glad to inform you that you cleared the interview. Now you can login to your portal using your email and password set in registration.`, // Plain text body
      };
      transport.sendMail(mailOptions, async(err, info)=> {
        if (err) {
          console.log(err)
          await UserModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body.id) }, { status: 'Pending' })
          return res.status(401).json({"Error":err})
        } 
    });
    },

    paymentMail : (mail) => {
      const mailOptions = {
          from: 'sender@gmail.com', // Sender address
          to: mail, // List of recipients
          subject: 'Registration', // Subject line
          text: `<html>
          <body>
          <div>
          Payment successfull
          </div>
          <div>
          Thank you for your donation. God bless you.
          </div>
          </body>
          </html>`, // Plain text body
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
  },
  }

