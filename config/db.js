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

// connection.connect((err)=>{   تست اتصال به دیتابیس   
//     if(err){
//         console.error("خطای اتصال ");
//         console.error("کد خطا" + err.code);
//         console.error("\msg" + err.message);

//     }else{
//         console.log("با موفقیت متصل شدید ");
//     }
// });

// module.exports = connection;  //   


// const mysql = require('mysql2');
// const connection = mysql.createConnection({
//     host: '127.0.0.1',    
//     user: 'root',         
//     password: '1234',         
//     database: 'crm_db', 
//      connectTimeout : 1000,  
//     port: 3306
// });

// connection.connect((err) => {
//     if(err){
//         console.error("خطای اتصال به دیتابیس:", err.message);
//     }else{
//         console.log("با موفقیت به دیتابیس متصل شد");
//     }
// });

// module.exports = connection;


require('dotenv').config(); // بارگذاری متغیرهای .env
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,   //localhost یا IP سرور 
    user: process.env.DB_USER,     // نام کاربری دیتابیس    
    password: process.env.DB_PASS,       //رمز عبور دیتابیس 
    database: process.env.DB_NAME,  //نام دیتابیسی که میخوای بهش وصل بشی 
    port: process.env.DB_PORT,    //پورت اتصال به mysql اصولا 3306
    connectTimeout: 1000   //مدت زمان انتظار برای اتصال
});

connection.connect((err) => {
    if(err){
        console.error("خطای اتصال به دیتابیس:", err.message);
    } else {
        console.log("با موفقیت به دیتابیس متصل شد");
    }
});

module.exports = connection;



//نکات مهمممممممممم
//process.envیعنی از متغییر های محلی گرفته میشه نه اینکه مستقیم داخل خود کد نوشته بشه

//چرا از process.env استفاده شده؟
//برای امنیت 👇
//اطلاعات حساس مثل:
//پسورد 
//یوزرنیم
//آدرس سرور
//نباید مستقیم داخل کد نوشته شوند.
//معمولاً این مقادیر داخل فایل .env ذخیره می‌شوند و با پکیج dotenv خوانده می‌شوند.