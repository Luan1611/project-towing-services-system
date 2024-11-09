const userCardDiv = document.querySelector('.user-card')
const form = document.querySelector('[data-form="user"]')
const 

const getUserRegistrationData = async () => {

    const cpf = localStorage.getItem('cpf')

    //TODO: o login é POST ou PUT?
    //TODO: pegar o cpf a partir do login realizado (servidor terá que retornar o cpf após o login)
    //pesqusiar

    try {
        e.preventDefault()

        //De onde virá o CPF?
        const cpf = localStorage.getItem('cpf')

        const response = await fetch(`http://localhost/project-towing-services-system-backend/client/client-registration-data/${cpf}`)
        
        if (!response.ok) {
            const errorObj = await response.json()
            console.log(errorObj)
            throw new Error(errorObj.msg)
        }

        const userRegistrationData = await response.json()

        //TODO: preencher card com as informações pessoais
        //questão: de onde virá o email

        const cpfParagraph = document.createElement('p')
        cpfParagraph.setAttribute('data-cpf', 'cpf')

        const nameParagraph = document.createElement('p')
        nameParagraph.setAttribute('data-name', 'nome')

        const phoneParagraph = document.createElement('p')
        phoneParagraph.setAttribute('data-phone', 'telefone')

        const emailParagraph = document.createElement('p')
        phoneParagraph.setAttribute('data-email', 'email')

        cpfParagraph.textContent = userRegistrationData.cpf
        nameParagraph.textContent = userRegistrationData.nome
        phoneParagraph.textContent = userRegistrationData.telefone
        emailParagraph.textContent = userRegistrationData.email

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

        const response = await fetch(`http://localhost/project-towing-services-system-backend/client/client-registration-data/${cpf}`, options)
        
        if (!response.ok) {
            const errorObj = await response.json()
            console.log(errorObj)
            throw new Error(errorObj.msg)
        }

        const newUserData = await response.json()

        alert(newUserData['msg'])

        //TODO: atualizar card com novos dados cadastrais
        const nameParagraph = document.querySelector(['data-name="nome"'])
        const phoneParagraph = document.querySelector(['data-phone="telefone"'])
        nameParagraph.textContent = nome
        phoneParagraph.textContent = telefone

    } catch(err) {
        console.log(err.message)
    }
    
}

getUserRegistrationData()

form.addEventListener('submit', fetchPutRequest)