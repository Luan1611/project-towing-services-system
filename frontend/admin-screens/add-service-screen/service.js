const divContainer = document.querySelector('.services-container')

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