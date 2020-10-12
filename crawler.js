const Xray = require('x-ray');

const x = Xray();

module.exports = {
  getNews: (req, res) => {
    x('https://www.detik.com/search/searchall?query=bpjs%20ketenagakerjaan&siteid=2&sortby=time&page=1', 'article', [{
      judul: 'article h2',
      link: 'article a@href',
      waktu: 'article .date',
      gambar: 'article img@src',
    }])((err, data) => res.send(data));
  },
};
