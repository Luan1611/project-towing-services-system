const form = document.querySelector('form')

const ADMINISTRATOR_ACCESS = 1
const COMMON_USER_ACCESS = 2
const NO_ACCESS = 0


form.addEventListener('submit', async event => {
    event.preventDefault()

    const email = event.target.email.value
    const senha = event.target.password.value
    let userData = {}
    
    try{

        let options = {
            method: "POST",
            body: JSON.stringify({
                email,
                senha
            })
        }

        const response = await fetch(`http://localhost/project-towing-services-system-backend/client/client-registration-data/`, options)
        
        if (!response.ok) {
            throw new Error('Não foi possível concluir a requisição com sucesso.')
        }

        userData = await response.json()
    
    }catch(err){
        console.log(err)
        alert(err)
    }

    if (userData.accessCode == ADMINISTRATOR_ACCESS) {
        window.location = '../admin-screens/main-screen/main-screen.html'
    } else {
        if (userData.accessCode == COMMON_USER_ACCESS && userData.cpf) {
            window.location = '../user-screens/user-data-screen/user-data-screen.html'
        } if (userData.accessCode == NO_ACCESS){
            alert('Seu usuário foi bloqueado, entre em contato com a administração')
        } else {
            alert('Dados incorretos!')
        }
    }

})