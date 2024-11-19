const divContainer = document.querySelector('.services-container')
const btn = document.querySelector('#add-bt')
const form = document.querySelector('#form')

const getServicesData = async () => {
    try {
        const response = await fetch(`http://localhost/project-towing-services-system/backend/serviceController.php`)
        
        if (!response.ok) {
            const errorObj = await response.json()
            console.log(errorObj)
            throw new Error(errorObj.msg)
        }

        const servicesData = await response.json()

        console.log(servicesData)

        servicesData.forEach(item => {
            let innerDiv = document.createElement('div')
            innerDiv.classList.add('services-info-container')
            innerDiv.innerHTML = `<h3>Tipo: ${item.tipo}</h3><h5>Código: ${item.codigo}</h5><h5>Preço: ${item.preco}</h5>`
            divContainer.appendChild(innerDiv)
        })


    } catch(err) {
        console.log(err.message)
    }
}


const postService = async e => {
    e.preventDefault()

    const codigo = e.target.codigo.value
    const tipo = e.target.tipo.value
    const preco = e.target.preco.value


    try {

        let options = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                codigo,
                tipo,
                preco
            }) 
        }

        const response = await fetch(`http://localhost/project-towing-services-system/backend/serviceController.php`, options)
        
        if (!response.ok) {
            const errorObj = await response.json()
            console.log(errorObj)
            throw new Error(errorObj.msg)
        }

        const servicesData = await response.json()

        let innerDiv = document.createElement('div')
        innerDiv.classList.add('services-info-container')
        innerDiv.innerHTML = `<h3>Tipo: ${servicesData.tipo}</h3><h5>Código: ${servicesData.codigo}</h5><h5>Preço: ${servicesData.preco}</h5>`
        divContainer.appendChild(innerDiv)

    } catch(err) {
        console.log(err.message)
    }
}

form.addEventListener('submit', postService)

getServicesData()