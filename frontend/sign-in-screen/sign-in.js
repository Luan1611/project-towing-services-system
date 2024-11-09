const form = document.querySelector('form')

form.addEventListener('submit', async event => {
    event.preventDefault()

    const userEmail = event.target.email.value
    const userPassword = event.target.password.value

    try{
        const response = await fetch(`http://localhost/project-towing-services-system-backend/client/client-registration-data/`)
        
        if (!response.ok) {
            throw new Error('Não foi possível concluir a requisição com sucesso.')
        }

        const userParams = await response.json()
    
    }catch(err){
        console.log(err)
        alert(err)
    }

    const emailIsValid = emailValue === userParams.email
    const passwordIsValid = passwordValue === userParams.password

    const isAdmin = emailValue === 'admin' && passwordValue === 'admin'

    if (isAdmin) {
        window.location = '../admin-screens/main-screen/main-screen.html'
    } else {
        if (emailIsValid && passwordIsValid) {
            window.location = '../user-screens/user-data-screen/user-data-screen.html'
        } else {
            alert('Dados incorretos!')
        }
    }

})