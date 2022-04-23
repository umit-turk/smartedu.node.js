const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    
    res.status(201).redirect('/login');
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

//login işleminde ilk yapmamız gerekn kullanıcının email ve passwordunu almak olacak.
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          // USER SESSION
          //öncelikle hangi user giris yapıyor onu bul ve kullanicinin dashboard sayfasina yonlendir.
          req.session.userID = user._id;
          res.status(200).redirect('/users/dashboard');
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.logoutUser = (req, res) => {
  //sessionu kapatmak istiyoruz
  req.session.destroy(() => {
    res.redirect('/');
  })
}

exports.getDashboardPage = async (req, res) => {
  //hangi kullanıcı giriş yapmış onu yakalayacağız.
  //id si sessionumuzdaki user id ye eşit olan kullanıcıyı bul.
  const user = await User.findOne({_id: req.session.userID})
  res.status(200).render('dashboard', {
    page_name: 'dashboard',
    user,
  })
}
