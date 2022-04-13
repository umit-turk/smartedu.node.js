//controllerin içersinde gelen isteklere vereceğimiz fonksiyonel cevapları yerleştiriyoruz view ile veri tabanı arasındaki bağlantıyı sağlıyoruz.

exports.getIndexPage = (req, res) => {
  res.status(200).render("index", {
    page_name: "index",
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render("about", {
    page_name: "about",
  });
};
