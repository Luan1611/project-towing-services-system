const userCardDiv = document.querySelector('.user-card')
const form = document.querySelector('[data-form="user"]')

const getUserRegistrationData = async () => {

    const cpf = localStorage.getItem('cpf')

    try {
        //De onde virá o CPF?
        const cpf = localStorage.getItem('cpf')

        const response = await fetch(`http://localhost/project-towing-services-system/backend/clientRegistrationDataController.php?cpf=${cpf}`)
        
        if (!response.ok) {
            const errorObj = await response.json()
            console.log(errorObj)
            throw new Error(errorObj.msg)
        }

        const userRegistrationData = await response.json()

        console.log(userRegistrationData)

        //TODO: preencher card com as informações pessoais
        //questão: de onde virá o email

        const cpfParagraph = document.createElement('h5')
        cpfParagraph.setAttribute('data-cpf', 'cpf')

        const nameParagraph = document.createElement('h3')
        nameParagraph.setAttribute('data-name', 'nome')

        const phoneParagraph = document.createElement('h5')
        phoneParagraph.setAttribute('data-phone', 'telefone')

        const emailParagraph = document.createElement('h5')
        phoneParagraph.setAttribute('data-email', 'email')

        cpfParagraph.textContent = userRegistrationData[0].cpf
        nameParagraph.textContent = userRegistrationData[0].nome
        phoneParagraph.textContent = userRegistrationData[0].telefone
        emailParagraph.textContent = userRegistrationData[0].email

        userCardDiv.appendChild(nameParagraph)
        userCardDiv.appendChild(cpfParagraph)
        userCardDiv.appendChild(phoneParagraph)
        userCardDiv.appendChild(emailParagraph)


    } catch(err) {
        console.log(err.message)
    }
}


const fetchPutRequest = async e => {
    try {
        e.preventDefault()

        const nome = e.target.nome.value
        const telefone = e.target.tel.value
    
        let options = {
            method: "PUT",
            body: JSON.stringify({
                nome,
                telefone
            })
        }

        const cpf = localStorage.getItem('cpf')

        const response = await fetch(`http://localhost/project-towing-services-system/backend/clientRegistrationDataController.php?cpf=${cpf}`, options)
        
        if (!response.ok) {
            const errorObj = await response.json()
            console.log(errorObj)
            throw new Error(errorObj.msg)
        }

        const newUserData = await response.json()

        alert(newUserData['msg'])

        //TODO: atualizar card com novos dados cadastrais
        const nameParagraph = document.querySelector('[data-name="nome"]')
        const phoneParagraph = document.querySelector('[data-phone="telefone"]')
        nameParagraph.textContent = nome
        phoneParagraph.textContent = telefone

    } catch(err) {
        alert(err.message)
    }
}

getUserRegistrationData()

form.addEventListener('submit', fetchPutRequest)