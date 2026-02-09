// const controller = require('app/http/controllers/controller');
// const passport = require('passport');

// class registerController extends controller{
//     showRegsterationForm(req , res){
//         res.render('home/auth/register' , {errors : req.flash('errors') , recapcha : this.recapcha.render() , title});
//     }

//     async registerProccess(req , res , next){
//         await this.recapchaValidation(req , res);
//         let result = await this.validationData(req)
//         if(result){
//             return this.registerProccess(req , res , next)
//         }
//         return res.redirect('/auth/register');
//     }

//     regester(req , res , next){
//         passport.authenticate('local.register' , {
//             successRedirect: '/',
//             failureRedirect :"/auth/register",
//             failureFlash : true
//         })(req , res , next);
//     }
// }
// module.exports = new registerController();