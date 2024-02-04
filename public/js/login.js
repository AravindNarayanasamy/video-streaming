const pass =document.querySelector(".password");
const infopass=document.querySelector("#info");
const signup =document.querySelector(".signup");
const signin = document.querySelector(".signin");



let count=0;
infopass.addEventListener('click', function(){
    count += 1;
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

signup.onclick =()=>{
    document.location.href="/Signup";
}