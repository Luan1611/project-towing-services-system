const divContainer = document.querySelector('.services-container')
const btn = document.querySelector('#add-bt')

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

        servicesData.forEach(item => console.log(item))

        // servicesData.forEach(item => {
        //     let innerDiv = document.createElement('div')
        //     innerDiv.innerHTML = `<p>${}</p><p>${}</p><p>${}</p><p>${}</p><p>${}</p>`
            
        // })

    } catch(err) {
        console.log(err.message)
    }
}


const postService = async (codigo, tipo, preco) => {
    try {

        let options = {
            method: "POST",
                codigo,
                tipo,
                preco
        }

        const response = await fetch(`http://localhost/project-towing-services-system/backend/serviceController.php`, options)
        
        if (!response.ok) {
            const errorObj = await response.json()
            console.log(errorObj)
            throw new Error(errorObj.msg)
        }

        const servicesData = await response.json()

        console.log(servicesData)

        servicesData.forEach(item => console.log(item))

        // servicesData.forEach(item => {
        //     let innerDiv = document.createElement('div')
        //     innerDiv.innerHTML = `<p>${}</p><p>${}</p><p>${}</p><p>${}</p><p>${}</p>`
            
        // })

    } catch(err) {
        console.log(err.message)
    }
}

btn.addEventListener('click', postService)

getServicesData()