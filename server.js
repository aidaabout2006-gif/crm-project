const path = require('path');
const express = require('express');
const session = require('express-session'); // ← اضافه شد

const customerRoutes = require('./routes/customerRoutes');
const userRoutes = require('./routes/userRoutes');
const groupRoutes = require('./routes/groupRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const userController = require('./controllers/userController');
const isAuthenticated = require('./middlewares/auth');

const app = express();
app.set('views', path.join(__dirname, 'views'));

// برای فرم‌ها
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// view engine 
app.set('view engine', 'ejs');

// ← اضافه: session
app.use(session({
    secret: 'یک_رشته_خیلی_امن', // حتما تغییر بده
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 } // 1 ساعت
}));

 
// routes
app.use('/customers', isAuthenticated, customerRoutes); // فقط کاربران لاگین کرده
app.use('/users', userRoutes);
app.use('/groups', isAuthenticated, groupRoutes); // فقط کاربران لاگین کرده

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
app.get('/dashboard', isAuthenticated, (req, res) => {
    res.render('dashboard', {
        username: req.session.user?.username || "کاربر"
    });
});

app.listen(3000, () => {
    console.log("سرور روی پورت 3000 روشن شد");
});
