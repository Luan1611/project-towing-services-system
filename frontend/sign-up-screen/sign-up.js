
const form = document.querySelector('form');

form.addEventListener('submit', async event =>  {

    event.preventDefault()

    const userName = event.target.name.value
    const userCPF = event.target.cpf.value
    const userPhone = event.target.phone.value
    const userEmail = event.target.email.value
    const userPassword = event.target.password.value

    console.log(userName, userPhone, userEmail, userPassword, userCPF)

    try{

        let options = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                cpf: userCPF,
                nome: userName,
                telefone: userPhone,
                email:userEmail,
                senha:userPassword
            })
        }
    
        const response = await fetch(`http://localhost/project-towing-services-system/backend/clientRegistrationDataController.php`, options)
        
        const dataObj = await response.json()

        if (!response.ok) {
            throw new Error(dataObj.msg)
        }

        alert(dataObj.msg)

        window.location = '../sign-in-screen/sign-in.html'
    
    }catch(err){
        console.log(err)
        alert(err)
    }

})