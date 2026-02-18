// // middlewares/jwtAuth.js
// const jwt = require('jsonwebtoken');
// const SECRET_KEY = "my_secret_key";

// module.exports = function(req, res, next) {
//      let token = req.headers['authorization']?.split(' ')[1];

//     if (!token && req.cookies?.token) {
//         token = req.cookies.token;
//     }

//     if (!token) return res.status(401).send("توکن وجود ندارد");

//     jwt.verify(token, SECRET_KEY, (err, decoded) => {
//         if (err) return res.status(403).send("توکن نامعتبر است");

//         req.user = decoded;
//         next();
//     });
// };



// middlewares/jwtAuth.js
//یعنی این تابع به عنوان middleware در Express استفاده میشه.
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || "my_secret_key";

module.exports = function(req, res, next) {
    // گرفتن توکن از header یا cookie
    // گرفتن توکن از Request
    
    let token = req.headers['authorization']?.split(' ')[1] || req.cookies?.token;
   // با این قسمت:
   //split(' ')[1]
   //کلمه Bearer حذف میشه و فقط توکن میمونه.


    if (!token) return res.status(401).send("دسترسی نیازمند توکن است");

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error(err); // log سرور
            return res.status(403).send("دسترسی غیرمجاز");
        }

        req.user = decoded; // اطلاعات کاربر در req.user
        next();
    });
};