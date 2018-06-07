var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'stdbid.cjmpatqmujx2.us-east-2.rds.amazonaws.com',
    port: 3306,
    user: 'sjuackr18',
    password: '여기에 비밀번호 입력',
    database: 'ossw_6_kcal'
});

exports.DBConnect = function() {
    connection.connect();
}

exports.DBdisConnect = function() {
    connection.end();
}

//사용자 고유 키, 사용자 이름, 나이, 성별, 신장, 체중, 활동지수, 표준체중, 일일권장칼로리, 하루마무리시간, 등록날짜
var addUserInfo = function(uKey, uName, uAge, uGen, uHeight, uWeight, uActix, sWeight, recKcal, doEndTime, regDate) {
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
exports.addUserInfo();
//var res;
exports.addUserInfoCK = function(uKey, uName, uAge, uGen, uHeight, uWeight, uActix, sWeight, recKcal, doEndTime, regDate) {
    var sql = "SELECT EXISTS (SELECT * FROM USER WHERE userKey='"+uKey+"') AS SUCCESS";
    function callback(err, rows, fields) {
        if(err) {
            throw err;
        }
        for(var i=0; i<rows.length; i++) {
            var tmp = (rows[i].SUCCESS) + 0;
            console.log(tmp+" value...");
            if(tmp == 0)
                addUserInfo(uKey, uName, uAge, uGen, uHeight, uWeight, uActix, sWeight, recKcal, doEndTime, regDate);
            else
                console.log("Current user already exist on database.");
        }
    }
    connection.query(sql, callback);
}