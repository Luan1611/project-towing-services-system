const form = document.querySelector('form')

form.addEventListener('submit', event => {
    event.preventDefault()

    const emailValue = event.target.email.value
    const passwordValue = event.target.password.value

    const emailIsValid = emailValue === localStorage.getItem('email')
    const passwordIsValid = passwordValue === localStorage.getItem('password')

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