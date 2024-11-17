const selectField = document.querySelector('#services')
const serviceForm = document.querySelector('.service')

const getServices = async () => {
    try {
        const response = await fetch(`http://localhost/project-towing-services-system/backend/serviceController.php`)
        
        if (!response.ok) {
            const errorObj = await response.json()
            console.log(errorObj)
            throw new Error(errorObj.msg)
        }

        const servicesData = await response.json()

        console.log(servicesData)

        servicesData.forEach(({codigo}) => {
            const optionTemplate = `<option>${codigo}</option>`
            selectField.innerHTML += optionTemplate
        });

        

    } catch(err) {
        console.log(err.message)
    }
}

const postNewService = async e => {
    try {
        e.preventDefault()

        const cnpj = localStorage.getItem('cnpj')
        const codigo = e.target.codigo.value
        const data = e.target.data.value
        const quantidade = e.target.quantidade.value
    
        console.log(data)

        let options = {
            method: "POST",
            body: JSON.stringify({
                cnpj,
                codigo,
                data,
                quantidade
            })
        }

        const response = await fetch(`http://localhost/project-towing-services-system/backend/contractorController.php`, options)
        
        if (!response.ok) {
            const errorObj = await response.json()
            console.log(errorObj)
            throw new Error(errorObj.msg)
        }

        const newUserData = await response.json()

        console.log(newUserData)

        // alert(newUserData['msg'])

        // //TODO: atualizar card com novos dados cadastrais
        // const nameParagraph = document.querySelector('[data-name="nome"]')
        // const phoneParagraph = document.querySelector('[data-phone="telefone"]')
        // nameParagraph.textContent = nome
        // phoneParagraph.textContent = telefone

    } catch(err) {
        alert(err.message)
    }
}

serviceForm.addEventListener('submit', postNewService)

getServices()