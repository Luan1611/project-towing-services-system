const form = document.querySelector('form')

const ADMINISTRATOR_ACCESS = 2
const COMMON_USER_ACCESS = 1
const NO_ACCESS = 0

form.addEventListener('submit', async event => {
    event.preventDefault()

    const email = event.target.email.value
    const senha = event.target.password.value
    
    try{

        let options = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email,
                senha
            })
        }

        const response = await fetch(`http://localhost/project-towing-services-system/backend/authenticationController.php`, options)

        if (!response.ok) {
            throw new Error(userData.msg)
        }
        const userData = await response.json()

        console.log(userData)

        if (userData.accessCode == ADMINISTRATOR_ACCESS) {
            localStorage.setItem('cnpj', userData.cpf)
            window.location = '../admin-screens/main-screen/main-screen.html'
        } else {
            if (userData.accessCode == COMMON_USER_ACCESS && userData.cpf) {
                localStorage.setItem('cpf', userData.cpf)
                window.location = '../user-screens/user-data-screen/user-data-screen.html'
            }else if (userData.accessCode == NO_ACCESS) {
                alert('Seu usuário foi bloqueado, entre em contato com a administração')
            } else {
                alert('Dados incorretos!')
            }
        }

    
    } catch(err) {
        console.log(err.msg)
    }

})