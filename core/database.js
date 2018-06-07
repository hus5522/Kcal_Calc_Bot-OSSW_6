var mysql = require('mysql');
var syncMySQL = require('sync-mysql');

var connData = {
    host: 'stdbid.cjmpatqmujx2.us-east-2.rds.amazonaws.com',
    port: 3306,
    user: 'sjuackr18',
    password: '',
    database: 'ossw_6_kcal'
}

var connection = mysql.createConnection(connData);
var syncConnection = null;

exports.DBConnect = function() {
    connection.connect();
    syncConnection = new syncMySQL(connData);
    console.log('데이터베이스에 연결됨');
}

exports.DBdisConnect = function() {
    connection.end();
    syncConnection.end();
    console.log('데이터베이스 해제됨');
}

exports.checkUser = function (uKey){

    var sql = "SELECT EXISTS (SELECT * FROM USER WHERE userKey='"+uKey+"') AS SUCCESS";

    const result = syncConnection.query(sql);
    console.log(result);
    
    return result[0].SUCCESS == 0 ? false : true;
}

//사용자 고유 키, 사용자 이름, 나이, 성별, 신장, 체중, 활동지수, 표준체중, 일일권장칼로리, 하루마무리시간, 등록날짜
exports.addUserInfo = function(uKey, uName, uAge, uGen, uHeight, uWeight, uActix, sWeight, recKcal, doEndTime, regDate) {
    var userNm = uName;
    if(uName == '.')
        userNm = null;
    var sql = "INSERT INTO USER SET ?";
    var post = {
        userKey: uKey,
        username: userNm,
        age: uAge,
        gender: uGen,
        height: uHeight,
        weight: uWeight,
        activity: uActix,
        avg_weight: sWeight,
        recomandation_kcal: recKcal,
        day_of_endtime: doEndTime
    };

    function callback(err, result) {
        if(err) {
            throw err;
        }
        console.log("Insert completed!");
    }

    connection.query(sql, post, callback);
}