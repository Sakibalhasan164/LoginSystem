const form=document.querySelector("form")
let nameErr=document.querySelector(".name-error")
let emailErr=document.querySelector(".email-error")
let passwordErr=document.querySelector(".password-error")




form.addEventListener("submit",async(e)=>{
    e.preventDefault()
    //the values
    const name=form.name.value
    const email=form.email.value
    const password=form.password.value

    nameErr.textContent=""
    passwordErr.textContent=""
    emailErr.textContent=""
    //object of values
    const credintials={name,email,password}
   
  const request=await fetch("/register",{
        
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credintials),  
    })

    const response= await request.json()
    console.log(response);
    if(response.name != ""){
     nameErr.innerHTML=response.name
    }
    if(response.email != ""){
     emailErr.innerHTML=response.email
    }
    if(response.password != ""){
     passwordErr.innerHTML=response.password
    }

    if(response.user){
      location.assign("/")
    }
    




})
