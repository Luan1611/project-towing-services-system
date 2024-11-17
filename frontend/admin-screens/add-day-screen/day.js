const selectField = document.querySelector('#services')
const serviceForm = document.querySelector('.service')
const cardsDiv = document.querySelector('.day-container')

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

        // showServicesInfo(servicesData)

        servicesData.forEach(({codigo}) => {
            const optionTemplate = `<option>${codigo}</option>`
            selectField.innerHTML += optionTemplate
        })

    } catch(err) {
        console.log(err.message)
    }
}

const getSchedulingsData = async () => {
    try {
        const response = await fetch(`http://localhost/project-towing-services-system/backend/overallSchedulingsController.php`)
        
        if (!response.ok) {
            const errorObj = await response.json()
            console.log(errorObj)
            throw new Error(errorObj.msg)
        }

        const schedulingsData = await response.json()

        const resultado = Object.values(
            schedulingsData.reduce((acc, item) => {
              const { data_realizacao_servico, tipo, nome } = item;
          
              // Se a data não existir no acumulador, cria
              if (!acc[data_realizacao_servico]) {
                acc[data_realizacao_servico] = { 
                  data: data_realizacao_servico, 
                  tipos: {} 
                };
              }
          
              // Se o tipo não existir dentro da data, cria
              if (!acc[data_realizacao_servico].tipos[tipo]) {
                acc[data_realizacao_servico].tipos[tipo] = {};
              }
          
              // Se o cliente não existir dentro do tipo, cria e inicializa contador
              if (!acc[data_realizacao_servico].tipos[tipo][nome]) {
                acc[data_realizacao_servico].tipos[tipo][nome] = 0;
              }
          
              // Incrementa a contagem para o cliente
              acc[data_realizacao_servico].tipos[tipo][nome]++;
          
              return acc;
            }, {})
          );
          
          // Formatando o resultado final
          const finalResultado = resultado.map(({ data, tipos }) => ({
            data,
            tipos: Object.entries(tipos).map(([tipo, clientes]) => ({
              tipo,
              clientes: Object.entries(clientes).map(([nome, quantidade]) => ({ nome, quantidade }))
            }))
          }));
          
          console.log(JSON.stringify(finalResultado, null, 2));

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

        alert((await response.json()).msg)

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

const showServicesInfo = () => {
    servicesData.forEach(service => {
        const optionTemplate = `<div id="service-card">
        <h4></h4>
        <p></p>
        <p></p>
        <p></p>
        </div>`
    })
    const card = document.createElement('div')
    card.classList.add('service-card')
    const h4 = document.createElement('h4')
    h4.textContent = servicesData.data


}

serviceForm.addEventListener('submit', postNewService)

getServices()
getSchedulingsData()