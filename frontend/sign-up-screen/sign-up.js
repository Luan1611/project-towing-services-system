
const form = document.querySelector('form');

form.addEventListener('submit', async event =>  {

    event.preventDefault()

    const userName = event.target.name.value
    const userCPF = event.target.cpf.value
    const userPhone = event.target.phone.value
    const userEmail = event.target.email.value
    const userPassword = event.target.password.value

    try{

        let options = {
            method: "POST",
            body: JSON.stringify({
                cpf: userCPF.innerText,
                nome: userName.innerText,
                telefone: userPhone.innerText,
                email:userEmail.innerText,
                senha:userPassword.innerText
            })
        }

        console.log("alteracao")
    
        const response = await fetch(`http://localhost/project-towing-services-system/backend/client/client-registration-data/`, options)
        
        if (!response.ok) {
            throw new Error('Não foi possível concluir a requisição com sucesso.')
        }
    
    }catch(err){
        console.log(err)
        alert(err)
    }

})