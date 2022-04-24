const nodemailer = require("nodemailer");

//controllerin içersinde gelen isteklere vereceğimiz fonksiyonel cevapları yerleştiriyoruz view ile veri tabanı arasındaki bağlantıyı sağlıyoruz.

exports.getIndexPage = (req, res) => {
  console.log(req.session.userID);
  res.status(200).render("index", {
    page_name: "index",
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render("about", {
    page_name: "about",
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render("register", {
    page_name: "register",
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render("login", {
    page_name: "login",
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render("contact", {
    page_name: "contact",
  });
};

exports.senEmail = async (req, res) => {

  try {

  

    const outputMessage = `
    <h1>Mail Details </h1>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h1>Message</h1>
    <p>${req.body.message}</p>
    `
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail",
      port: 465,
      secure: true, // true for 465, false for other ports
      service: "Gmail",
      auth: {
        user: "uyt.turk@gmail.com", // gmail account
        pass: "vpdyhivvzhlmuvsu", // gmail password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Smart EDU Contact Form 👻" <uyt.turk@gmail.com>', // sender address
      to: "uyt.turk16@gmail.com", // list of receivers
      subject: "Smart EDU Contact Form New Message ✔", // Subject line
      html: outputMessage, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    req.flash('success', "We Received your message succesfully");

    res.status(200).redirect('contact')
  } catch (err) {
   /*  req.flash('error', `Something happened! ${err}`); */
   req.flash('error',"Something happened!");
    res.status(200).redirect('contact')
  }

};


