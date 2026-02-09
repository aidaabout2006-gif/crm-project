// // وصل شدن به دیتابیس 
// const mysql = require('mysql2'); //کتابخانه  mysql رو وارد میکنه
// const connection = mysql.createConnection({ // اتصال به دیتابیس
//     host:'127.0.0.1',
//     user:'root',
//     password :'1234',
//     database: 'crm_db',
//     connectTimeout : 1000, // زمان انتظار
//     port : 3306
// });

// connection.connect((err)=>{ // تست اتصال به دیتابیس / نتیجه اش توی ارور میره
//     if(err){
//         console.error("خطای اتصال ");
//         console.error("کد خطا" + err.code);
//         console.error("\msg" + err.message);

//     }else{
//         console.log("با موفقیت متصل شدید ");
//     }
// });

// module.exports = connection;  // اتصال دیتابیس رو صادر میکنه تا بقیه بتونن ازش استفاده کنن


const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: '127.0.0.1',    // یا آیپی سرور دیتابیس
    user: 'root',         // یوزر دیتابیس
    password: '1234',         // پسورد دیتابیس
    database: 'crm_db', 
     connectTimeout : 1000,  // اسم دیتابیس
    port: 3306
});

connection.connect((err) => {
    if(err){
        console.error("خطای اتصال به دیتابیس:", err.message);
    }else{
        console.log("با موفقیت به دیتابیس متصل شدیم");
    }
});

module.exports = connection;
