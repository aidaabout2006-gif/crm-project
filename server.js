const path = require('path');      //ماژول داخلی برای کار با مسیر فایل ها 
const express = require('express');     //فریم ورک express برای ساخت سرور
// const session = require('express-session'); 

const customerRoutes = require('./routes/customerRoutes'); // فایل های روت جدا شده 
const userRoutes = require('./routes/userRoutes');
const groupRoutes = require('./routes/groupRoutes');
//const dashboardRoutes = require('./routes/dashboardRoutes');
const userController = require('./controllers/userController'); // کنترلر مربوط به کاربران
//const isAuthenticated = require('./middlewares/auth');
const verifyToken = require('./middlewares/jwtAuth');      //middlewares سفارشی برای بررسی JWT
const cookieParser = require('cookie-parser');
 
const externalRoutes = require('./routes/externalRoutes');



const app = express(); //اینجا سرور Express ساخته می‌شود.

app.use(cookieParser());  //فعال کردن خواندن کوکی‌ها.

app.set('views', path.join(__dirname, 'views'));  //مشخص می‌کند فایل‌های view داخل پوشه views هستند.

// برای فرم‌ها
//برای خواندن داده‌های فرم و JSON از body درخواست‌ها.
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

// view engine 
app.set('view engine', 'ejs');  //مشخص می‌کند که از EJS برای رندر صفحات استفاده می‌کنی.

//  session
// app.use(session({
//     secret: 'یک_رشته_خیلی_امن', 
//     resave: false,
//     saveUninitialized: false,
//     cookie: { maxAge: 3600000 } 
// }));


// routes
//مسیرهای محافظت‌شده
//هر درخواستی به /customers اول از verifyToken عبور می‌کند.
//اگر توکن معتبر باشد → اجازه دسترسی دارد.
//اگر نه → احتمالاً خطای 401 می‌دهد.
app.use('/customers', verifyToken, customerRoutes); // فقط کاربران لاگین کرده
app.use('/users', userRoutes);
app.use('/groups', verifyToken, groupRoutes); // فقط کاربران لاگین کرده

// صفحه تست
app.get('/', (req, res) => {
    res.send('Server is running');
});

// صفحه Login
app.get('/users/login', (req, res) => {
  res.render('login'); 
});

app.get('/users/register', (req, res) => {
  res.sendFile(__dirname + '/register.ejs'); 
});

app.get('/customers/index', (req, res) => {
    res.render('customers/index');
});

app.get('/users/forgetpassword', (req, res) => {
   res.render('forgetpassword');
});

app.get('/customers/update', (req, res) => {
    res.sendFile(__dirname + '/update.ejs'); 
});

app.post('/users/forgetpassword', userController.forgetPassword);

// صفحه داشبورد فقط برای کاربر لاگین کرده
app.get('/dashboard', verifyToken, (req, res) => {
    res.render('dashboard', {
        username: req.user?.username || "کاربر"
    });
});

 app.use('/api', externalRoutes);


app.listen(3000, () => {
    console.log("سرور روی پورت 3000 روشن شد");
});


//پروژه این ویژگی ها رو داره
//Express
// JWT Authentication
// Cookie-based auth
// Middleware امنیتی
// View Engine (EJS)
// تفکیک routes و controllers
// API جداگا