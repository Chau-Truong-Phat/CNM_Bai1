var router = require('express').Router();
var server = require("../public/javascripts/server");
const config = require('../public/javascripts/config');

router.get('/SinhVien', function(req, res, next) {
  server.getAll((result) => {
    if(!result){
      console.log(error);
    }
    else{ 
      res.render('listSinhVien', {listSinhVien: result.Items});
    }
  })
})

router.get('/SinhVien/add',(req,res)=>{
  return res.render('add');
})
router.post('/SinhVien/add',config.upload.array('avatar',1), (req, res) => {
  var param = {
    "avatar": req.file,
    "ma_lop": req.body.ma_lop,
    "ma_sinhvien": req.body.ma_sinhvien,
    "namsinh": req.body.namsinh,
    "ten_sinhvien": req.body.ten_sinhvien
  }
  server.add(param, (result) => {
    if(result) {
      res.redirect('/SinhVien');
    } else {
      console.log(false);
    }
  })
});

// router.post('/SinhVien/add' ,upload.array('image',1), (req, res) => {
//   res.redirect('/SinhVien');
//   // var param = {
//   //   "avatar": "",
//   //   "ma_lop": req.body.ma_lop,
//   //   "ma_sinhvien": req.body.ma_sinhvien,
//   //   "namsinh": req.body.namsinh,
//   //   "ten_sinhvien": req.body.ten_sinhvien
//   // }
//   // // res.redirect('listSinhVien');
//   // server.add(param, (result) => {
//   //   if(result) {
//   //     // console.log(result + ' ' + 'ahihi');
//   //     res.redirect('/SinhVien');
//   //   } else {
//   //     console.log(false);
//   //   }
//   // })
// });

// router.post('/SinhVien/add', function(req, res, next) {
//   let s3bucket = new AWS.S3({
//     accessKeyId: 'AKIAIMI4GDG7KJL3TAHA',
//     secretAccessKey: '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',
//     Bucket: 'avatar-sinhvien-chautruongphat'
//   });
//   // var file = req.files.avatar;
//   console.log(req.body);
//   // s3bucket.createBucket(function () {
//   //     var params = {
//   //       Bucket: 'avatar-sinhvien-chautruongphat',
//   //       Key: 'cat.jpg',
//   //       Body: file
//   //     };
//   //     s3bucket.upload(params, function (err, data) {
//   //       if (err) {
//   //         console.log('error in callback');
//   //         console.log(err);
//   //       }
//   //       console.log('success');
//   //       console.log(data);
//   //     });
//   // });
// });


router.get('/SinhVien/:mssv&:id', function (req, res, next) {
  let params = {
    ma_sinhvien: req.params.mssv,
    id: req.params.id
  }
  server.getSinhVienById(params, (result) => {
    if(!result){
      console.log(false);
    } else {
      console.log(result);
      res.render('edit', {data: result});
    }
  });
})

router.get('/SinhVien/edit/:mssv&:id', function (req, res, next) {
  let params = {
    ma_sinhvien: req.params.mssv,
    id: req.params.id
  }
  server.getSinhVienById(params, (result) => {
    if(!result){
      console.log(false);
    } else {
      res.render('edit', {data: result});
    }
  });
})

router.post('/SinhVien/edit/:mssv&:id', function(req, res, next) {
  var param = {
    "ma_sinhvien": req.params.mssv,
    "id": req.params.id,
    "avatar": "",
    "ma_lop": req.body.ma_lop,
    "namsinh": req.body.namsinh,
    "ten_sinhvien": req.body.ten_sinhvien
  }
  console.log(param);
  server.edit(param, (result) => {
    if(!result){
      console.log(false);
    } else {
      console.log(result);
      res.redirect('/sinhvien');
    }
  })
})

router.get('/SinhVien/delete/:mssv&:id', function (req, res, next) {
  let params = {
    ma_sinhvien: req.params.mssv,
    id: req.params.id
  }
  server.remove(params, (result) => {
    if(!result){
      console.log(false);
    } else {
      console.log(params);
      res.redirect('/sinhvien');
    }
  });
})
module.exports = router;
