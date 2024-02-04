const mysql=require("mysql");
const Express =require("express");
const app =Express();


const database=mysql.createConnection({
    host:'localhost',
    user:'Aravind',
    password:'navani003',
    database:'loginregister',
});

app.use(Express.urlencoded({extended : false}));


exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    database.query("SELECT * FROM users WHERE email = ?", [email], (error, results) => {
        if (error) {
            console.log(error);
            return res.render('login', { msg: "An error occurred while querying the database." });
        }
        
        if (results.length === 0) {
            return res.render('login', { msg: "User not found. Please register." });
        }
        
        const user = results[0];
        if (password !== user.PASS) {
            return res.render('login', { msg: "Incorrect password. Please try again." });
        }
        return res.redirect('/welcome'); 
    });
}


exports.signup=(req,res)=>{
    const username=req.body.username;
    const email=req.body.email;
    const password=req.body.password;
    const conmpaswword=req.body.conmpaswword;
    database.query("select email from users where email=?",[email],(error,result)=>{

        if(error){

            console.log(error);
        }

        else if(result.length > 0){

            return res.render('signup',{ msg : "Email id already taken"});
        }

        else if(password !== conmpaswword){

            return res.render('signup',{msg : "Password incorrect"});
        }

        else{

            database.query("insert into users set ?",{name:username,email:email,pass:password},(error,result)=>{
                if(error){
                    console.log(error);
                }
                else{
                    res.redirect("/");
                    console.log(result);
                }
            })
        }
        
    })

}