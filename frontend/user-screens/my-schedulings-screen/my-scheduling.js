const cardsContainer = document.querySelector('.src-container')

const getUserSchedulings = async () => {
    try {
        const cpf = localStorage.getItem('cpf')
        const response = await fetch(`http://localhost/project-towing-services-system/backend/schedulings/${cpf}`)
        
        if (!response.ok) {
            const errorObj = await response.json()
            console.log(errorObj)
            throw new Error(errorObj.msg)
        }

        const userSchedulings = await response.json()

        //TODO: preencher card com os agendamentos do cliente
        console.log(userSchedulings)

    } catch(err) {
        console.log(err.message)
    }
}

getUserSchedulings()