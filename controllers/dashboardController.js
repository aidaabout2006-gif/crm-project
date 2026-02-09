// const connection = require('../config/db');

// exports.dashboard = (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;

//     const query = "SELECT * FROM users WHERE username = ? AND password = ?";

//     connection.query(query, [username, password], (err, results) => {
//         if (err) {
//             res.redirect('dashboard.ejs');
//         }else{
//            res.send("خطا");
//         }
//     });
// };

 