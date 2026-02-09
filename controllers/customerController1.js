// const connection = require('../config/db'); // گرفتن اتصال دیتابیس

// class customerController1 extends controller{
//     showCustomerForm(req ,res){
//         const title = 'صفحه مدیریت مشتری ها';
//         res.render('customers');
//     }

//     async addCustomers(req , res , next){
//          this.addCustomers(req , res);
//             const name = req.body.full_name ;
//             const phone = req.body.phone;
//             const group = req.body.group_id;
//          const query ="INSERT  INTO customers (full_name , phone ,group_id) VALUES (? ,? ,?)";// دستور sql برای اضافه کردن مشتری 
//     connection.query(query, [name , phone , group], (err , result)=>{ // کوِیری روی دیتابیس اجرا میشه 
//         if (err) res.send("خطا در اضافه کردن گروه: " + err.message);
//         else res.send("مشتری با موفقیت اضافه شد");
//     });
//     }
//      async getAllCustomers(req , res , next){
//         await this.getAllCustomers(req , res);
//            const query = "SELECT * FROM customers"; // دستور sql برای همه مشتری ها
    
//     connection.query(query,(err , result)=>{ //اجرای کویری
//         if(err){
//             res.send("خطا در دریافت لیست ");
//         }else{
//             res.json(result);
//         }
    
//     });
// }
//     async updateCustomers  (req , res ){
//     const { id , full_name , phone } = req.body; //آیدی مشتری رو میگیریم
//     const query = "UPDATE customers SET  full_name  = ? , phone =?  WHERE id= ?"; // دستور sql برای ویرایش با id

//     connection.query(query,[full_name , phone , id] , (err , result)=>{ //اجرا دستور آپدید
//         if(err){
//             res.send("خطا در ویرایش مشتری ");
//         }else{
//                       res.render('customers/index', { customer }); // نمایش فرم ویرایش

//         }
//     });
//  }
 

// }