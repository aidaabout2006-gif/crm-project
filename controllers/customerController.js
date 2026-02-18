// //عملیات  CRUD انجام میده

// const connection = require('../config/db'); // گرفتن اتصال دیتابیس

//  exports.addCustomers = (req, res) => {
//     const { full_name, phone, group_id } = req.body;

    
//     const query = "INSERT INTO customers (full_name, phone, group_id) VALUES (?, ?, ?)";
//     connection.query(query, [full_name, phone, group_id], (err) => {
//         if (err) return res.send(err.message);
//         res.redirect('/customers');
//     });
// };

// //گرفتن لیست  همه مشتری ها 
// // exports.getAllCustomers = (req , res)=>{
// //     const query = "SELECT * FROM customers";  
    
// //     connection.query(query,(err , result)=>{ 
// //         if(err){
// //             res.send("خطا در دریافت لیست ");
// //         }else{
// //             res.json(result);
// //         }
// //     })
// // };

// exports.getAllCustomers = (req , res)=>{
//     connection.query("SELECT * FROM customers", (err , result)=>{ 
//         if(err){
//             return res.status(500).json({error:"خطا"});
//         }
//         res.json(result);
//     })
// };


// //نمایش صفحه مشتری 
// exports.showEditCustomer = (req , res)=>{
//     const id = req.params.id ;

//     const query = "SELECT * FROM  customers WHERE id =? ";
//     connection.query(query , [id] , (err , result)=>{
//         if(err){
//             return res.send("خطا در دریافت اطلاعات");
//         }

//         if(result.length === 0){
//             return res.send("مشتری پیدا نشد");
//         }
//         res.render('customers/editcustomer' , {customer : result[0]});
//     });
// };

// //ویرایش مشتری 
// exports.updateCustomers = (req , res )=>{
//     const { id , full_name , phone } = req.body; //آیدی مشتری رو میگیریم
//     const query = "UPDATE customers SET  full_name  = ? , phone =?  WHERE id= ?"; // دستور sql برای ویرایش با id

//     connection.query(query,[full_name , phone , id] , (err , result)=>{ 
//         if(err){
//             res.send("خطا در ویرایش مشتری ");
//         }else{
//             res.redirect('/customers')
//         }
//     });
// };

// //حذف مشتری 
// exports.deleteCustomers = (req , res )=>{
//     const id = req.body.id ; //ایدی مشتری رو برای حذف میگیریم 
//     const  query = "DELETE FROM customers WHERE id =? "; 

//     connection.query(query , [id] , (err , result)=>{ 
//         if(err){
//             res.send("خطا در حذف مشتری");
//         }else{
//             res.send("مشتری با موفقیت حذف شد");
//         }
//     });
// };


// exports.showCustomers = (req, res) => {
//     connection.query("SELECT * FROM customers", (err, customers) => {
//         if (err) return res.send("خطا در دریافت مشتری‌ها");
//         res.render('customers/index', { customers });
//     });
// };


// // exports.showCustomers = (req, res) => {
// //     connection.query("SELECT * FROM customers", (err, results) => {
// //         if (err) return res.status(500).json({ error: "خطای سرور" });
// //         res.json(results); // JSON برگردون
// //     });
// // }

//عملیات CRUD مشتریان


const connection = require('../config/db'); // گرفتن اتصال دیتابیس

// افزودن مشتری جدید
exports.addCustomers = (req, res) => {
    //چون قبلا express نوشتیم داده های فرم داخل req.body می ایند
    const { full_name, phone, group_id } = req.body;  //گرفتن داده از فرم 

    // Validation ساده
    if (!full_name || !phone || !group_id || isNaN(group_id)) 
        return res.status(400).send("ورودی نامعتبر است");

    const query = "INSERT INTO customers (full_name, phone, group_id) VALUES (?, ?, ?)"; //اجرای کوئری امن
    //علامت ? باعث جلوگیری از SQL Injection میشه
    connection.query(query, [full_name, phone, group_id], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("خطا در سرور");
        }
        res.redirect('/customers');
    });
};

// گرفتن لیست مشتری‌ها
exports.getAllCustomers = (req, res) => {
    const query = "SELECT id, full_name, phone, group_id FROM customers";
    connection.query(query, (err, result) => { 
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "خطا در سرور" });
        }
        res.json(result); //خروجی به صورت جیسون گرفته میشه 
    });
};

// نمایش صفحه ویرایش مشتری
exports.showEditCustomer = (req, res) => {
    const id = req.params.id;  //گرفتن ID از URL:
    if (!id || isNaN(id)) return res.status(400).send("ID نامعتبر است"); //بررسی معتبر بودن ID

    const query = "SELECT id, full_name, phone, group_id FROM customers WHERE id = ?";  //گرفتن مشتری از دیتابیس
    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("خطا در سرور");
        }
        if (result.length === 0) return res.send("مشتری پیدا نشد");
        res.render('customers/editcustomer', { customer: result[0] });  //رندر صفحه ویرایش  و داده مشتری به فایل EJS ارسال میشه.
    });
};

// ویرایش مشتری
exports.updateCustomers = (req, res) => {
    const { id, full_name, phone } = req.body;  //گرفتن داده از فرم 
    if (!id || isNaN(id) || !full_name || !phone) 
        return res.status(400).send("ورودی نامعتبر است");

    const query = "UPDATE customers SET full_name = ?, phone = ? WHERE id = ?";
    connection.query(query, [full_name, phone, id], (err, result) => { 
        if (err) {
            console.error(err);
            return res.status(500).send("خطا در سرور");
        }
        res.redirect('/customers');
    });
};

// حذف مشتری
exports.deleteCustomers = (req, res) => {
    const id = req.body.id;  //گرفتن ID
    if (!id || isNaN(id)) return res.status(400).send("ID نامعتبر است");

    const query = "DELETE FROM customers WHERE id = ?";
    connection.query(query, [id], (err, result) => { 
        if (err) {
            console.error(err);
            return res.status(500).send("خطا در سرور");
        }
        res.send("مشتری با موفقیت حذف شد");
    });
};

// نمایش لیست مشتری‌ها در صفحه
exports.showCustomers = (req, res) => {
    const query = "SELECT id, full_name, phone, group_id FROM customers";
    connection.query(query, (err, customers) => {
        if (err) {
            console.error(err);
            return res.status(500).send("خطا در سرور");
        }
        res.render('customers/index', { customers });
    });
};

//نکات مهم درباره کد 
//از prepared statement استفاده کردی  
//Validation اولیه داری
//کنترل خطا داری
//MVC رو رعایت کردی