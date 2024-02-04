const pass =document.querySelector(".password");
const confirmpass =document.querySelector(".confirmpassword");
const infopass=document.querySelector("#info");
const conpass =document.querySelector("#confirmpassword");
const login = document.querySelector(".login");


infopass.addEventListener('click', function(){
    if(pass.type === "password"){
        pass.type ="text";
    }
    else{
        pass.type= "password";
    }
    const open =infopass.classList.contains("fa-eye-slash");
    console.log(open);
    infopass.contains =open ? infopass.classList.value="fa-regular fa-eye" : infopass.classList.value="fa-regular fa-eye-slash";
})
conpass.addEventListener('click',()=>{
    if(confirmpass.type === "password"){
        confirmpass.type ="text";
    }
    else{
        confirmpass.type= "password";
    }
    const open =conpass.classList.contains("fa-eye-slash");
    console.log(open);
    conpass.contains =open ? conpass.classList.value="fa-regular fa-eye" : conpass.classList.value="fa-regular fa-eye-slash";
});

login.addEventListener('click',() => {
    document.location.href = "/";
});

