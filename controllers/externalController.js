const axios = require('axios'); //کتابخانه axios

exports.getExternalData = async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        res.json(response.data);
    } catch {
        res.status(500).json({ error: "خطا در دریافت داده‌ها" });
    }
};