
const form = document.querySelector('form');
const phoneAddButton = document.querySelector('#phone-add-bt')
let phoneNameCounter = 2

phoneAddButton.addEventListener('click', event => {

    const bt = event.target

    const newInputPhoneNumber = document.createElement('input')
    newInputPhoneNumber.setAttribute('type', "text")
    newInputPhoneNumber.setAttribute('name', `phone${phoneNameCounter}`)
    newInputPhoneNumber.setAttribute('placeholder', "Telefone")

    bt.insertAdjacentElement('beforebegin', newInputPhoneNumber)

    ++phoneNameCounter

})

form.addEventListener('submit', event => {

    event.preventDefault()

    const userName = event.target.name.value
    const userCPF = event.target.cpf.value
    const userCEP = event.target.cep.value
    const userNeighborhood = event.target.neighborhood.value
    const userUF = event.target.uf.value
    const userCity = event.target.city.value
    const userAdressNumber = event.target.number.value

    const phoneInputValues = [event.target.phone1.value]

    let inputField = event.target.phone1.nextElementSibling

    while (inputField.name !== 'phoneAdd') {
        phoneInputValues.push(inputField.value)
        inputField = inputField.nextElementSibling
    }

    const userEmail = event.target.email.value
    const userPassword = event.target.password.value
    

    // Apenas como exemplo (sabemos que na realidade não se armazena
    // tais dados no localStorage)
    localStorage.setItem('email', userEmail)
    localStorage.setItem('password', userPassword)
    localStorage.setItem('username', userName)
    localStorage.setItem('usercpf', userCPF)
    localStorage.setItem('usercep', userCEP)
    localStorage.setItem('userneighborhood', userNeighborhood)
    localStorage.setItem('useruf', userUF)
    localStorage.setItem('usercity', userCity)
    localStorage.setItem('useradressnumber', userAdressNumber)

})