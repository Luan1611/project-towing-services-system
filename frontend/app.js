import availableServices from "./list.js";

const schedulingsContainer = document.querySelector('.schedulings-container')

for (let obj of availableServices) {

    const servicesDiv = document.createElement('div')

    let template = `<h4>${obj.serviceDate}</h4>`
    for (let service of obj.services) {
        template += `<h4>${service.serviceType}: ${service.serviceQuantity}</h4>`
    }

    servicesDiv.innerHTML = template

    schedulingsContainer.append(servicesDiv)
}