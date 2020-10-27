const config = require('./config');

var id = 0;
// //Read an user
function getSinhVienById(params, callback) {
    var params = {
        TableName: "SinhVien",
        Key:{
            "ma_sinhvien": params.ma_sinhvien,
            "id": parseInt(params.id)
        },
        "ProjectionExpression": "ma_sinhvien, id, ten_sinhvien, avatar, ma_lop, namsinh"
    };
    config.docClient.get(params, function(err, data) {
        if (err) {
            callback({message: err});
        } else {
            callback(data.Item);
        }
    });
};
// //Read all user
function getAll(callback){
    var params = {
        TableName: "SinhVien"
    };

    config.docClient.scan(params, onScan);

    function onScan(err, data) {
        if (err) {
            callback({message: err})
        } else {
            id = data.Count;
            callback(data);
        }
    }
};

function add(param, callback) {
    // const form = new formidable.IncomingForm();
    var params = {
        TableName: "SinhVien",
        Item:{
            "avatar": param.avatar,
            "ma_sinhvien": param.ma_sinhvien,
            "id": ++id,
            "ma_lop": param.ma_lop,
            "namsinh": param.namsinh,
            "ten_sinhvien": param.ten_sinhvien
        }
    };

    config.docClient.put(params, function(err, data) {
        if (err) {
            callback({message: err})
        } else {
            // uploadFile(param.avatar, params.Item.ma_sinhvien);
            callback({message: "Add new success user"});
        }
    });
}

function remove(param, callback) {
    var params = {
        TableName: "SinhVien",
        Key:{
            "ma_sinhvien": param.ma_sinhvien,
            "id": parseInt(param.id)
        }
    };
        
    config.docClient.delete(params, function(err, data) {
        if (err) {
            callback({message: err})
        } else {
            callback({message: "Delete success user"});
        }
    });
}

function edit(param, callback){
    var params = {
        TableName: "SinhVien",  
        Key:{
            "ma_sinhvien": param.ma_sinhvien,
            "id": parseInt(param.id) 
        },
        UpdateExpression: "set ten_sinhvien = :tsv, avatar = :a, ma_lop = :ml, namsinh = :ns",
        ExpressionAttributeValues:{
            ":tsv": param.ten_sinhvien,
            ":a": param.avatar,
            ":ml": param.ma_lop,
            ":ns": param.namsinh
        },
        ReturnValues:"UPDATED_NEW"
      };
    
      config.docClient.update(params, function(err, data) {
          if (err) {
              callback({message: err})
          } else {
              callback(data.Attributes);
          }
      });
}

module.exports = {
    getSinhVienById,
    getAll,
    add,
    remove,
    edit
};


