const userCardDiv = document.querySelector('.user-card')
const CPFParagraph = document.querySelector('#cpf')

const form = document.querySelector('[data-form="user"]')

form.addEventListener('submit', async e => {

    try {
        e.preventDefault()

        const nome = e.target.nome.value
        const telefone = e.target.tel.value
    
        let options = {
            method: "PUT",
            body: JSON.stringify({
                cpf: CPFParagraph.textContent,
                nome,
                telefone
            })
        }

        const response = await fetch(`http://localhost/project-towing-services-system-backend/client/client-registration-data/${}`, options)
        
        if (!response.ok) {
            throw new Error('Não foi possível concluir a requisição com sucesso.')
        }

        const newUserData = await response.json()

    

    } catch(err) {
        console.log(err.message)
    }
    

})