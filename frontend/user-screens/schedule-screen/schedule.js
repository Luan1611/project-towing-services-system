// import availableServices from "../../list.js";

const schedulingsContainer = document.querySelector('.src-container')


const getServices = async () => {

    try {

        const response = await fetch(`http://localhost/project-towing-services-system/backend/servicesController.php`)
        
        if (!response.ok) {
            const errorObj = await response.json()
            console.log(errorObj)
            throw new Error(errorObj.msg)
        }

        const servicesData = await response.json()

        console.log(servicesData)

        servicesData.forEach(item => console.log(item))

    } catch(err) {
        console.log(err.message)
    }
}


// for (let obj of availableServices) {

//     const servicesDiv = document.createElement('div')

//     let template = `<h4>${obj.serviceDate}</h4>`
//     for (let service of obj.services) {
//         template += `<h4>${service.serviceType}: ${service.serviceQuantity}</h4>`
//     }

//     servicesDiv.innerHTML = template

//     schedulingsContainer.append(servicesDiv)
// }