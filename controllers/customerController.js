//عملیات  CRUD انجام میده

const connection = require('../config/db'); // گرفتن اتصال دیتابیس

 exports.addCustomers = (req, res) => {
    const { full_name, phone, group_id } = req.body;

    const query = "INSERT INTO customers (full_name, phone, group_id) VALUES (?, ?, ?)";
    connection.query(query, [full_name, phone, group_id], (err) => {
        if (err) return res.send(err.message);
        res.redirect('/customers');
    });
};
//گرفتن لیست  همه مشتری ها 
exports.getAllCustomers = (req , res)=>{
    const query = "SELECT * FROM customers"; // دستور sql برای همه مشتری ها
    
    connection.query(query,(err , result)=>{ //اجرای کویری
        if(err){
            res.send("خطا در دریافت لیست ");
        }else{
            res.json(result);
        }
    })
};


//نمایش صفحه مشتری 
exports.showEditCustomer = (req , res)=>{
    const id = req.params.id ;

    const query = "SELECT * FROM  customers WHERE id =? ";
    connection.query(query , [id] , (err , result)=>{
        if(err){
            return res.send("خطا در دریافت اطلاعات");
        }

        if(result.length === 0){
            return res.send("مشتری پیدا نشد");
        }
        res.render('customers/editcustomer' , {customer : result[0]});
    });
};

//ویرایش مشتری 
exports.updateCustomers = (req , res )=>{
    const { id , full_name , phone } = req.body; //آیدی مشتری رو میگیریم
    const query = "UPDATE customers SET  full_name  = ? , phone =?  WHERE id= ?"; // دستور sql برای ویرایش با id

    connection.query(query,[full_name , phone , id] , (err , result)=>{ //اجرا دستور آپدید
        if(err){
            res.send("خطا در ویرایش مشتری ");
        }else{
            res.redirect('/customers')
        }
    });
};

//حذف مشتری 
exports.deleteCustomers = (req , res )=>{
    const id = req.body.id ; //ایدی مشتری رو برای حذف میگیریم 
    const  query = "DELETE FROM customers WHERE id =? "; // دستور sql برای حذف مشتری

    connection.query(query , [id] , (err , result)=>{ // اجرای دستور حذف
        if(err){
            res.send("خطا در حذف مشتری");
        }else{
            res.send("مشتری با موفقیت حذف شد");
        }
    });
};


exports.showCustomers = (req, res) => {
    connection.query("SELECT * FROM customers", (err, customers) => {
        if (err) return res.send("خطا در دریافت مشتری‌ها");
        res.render('customers/index', { customers });
    });
};