const schedulingsContainer = document.querySelector('.src-container')

const getServices = async () => {
    try {

        const response = await fetch(`http://localhost/project-towing-services-system/backend/aqueleQueNaoPodeSerNomeado.php`)
        
        if (!response.ok) {
            const errorObj = await response.json()
            console.log(errorObj)
            throw new Error(errorObj.msg)
        }

        const servicesData = await response.json()

        const resultado = Object.values(
            servicesData.reduce((acc, item) => {
                const { data_oferta_servico, tipo, preco, quantidade, codigo } = item;

                if (!acc[data_oferta_servico]) {
                    acc[data_oferta_servico] = {
                        data: data_oferta_servico,
                        servicos: []
                    };
                }

                acc[data_oferta_servico].servicos.push({
                    tipo,
                    preco: parseFloat(preco), // Convertendo o preço para número
                    quantidade,
                    codigo
                });

                return acc;
            }, {})
        );

        resultado.forEach(obj => {
            const cardDiv = document.createElement('div')
            cardDiv.classList.add('card')
            const date = document.createElement('h3')
            date.textContent = obj.data
            cardDiv.appendChild(date)
        
            // Cria o formulário
            const form = document.createElement('form')
            form.classList.add('service-form')

            obj.servicos.forEach(service => {
                const checkboxContainer = document.createElement('div')
                checkboxContainer.classList.add('checkbox-container')

                const checkbox = document.createElement('input')
                checkbox.type = 'checkbox'
                checkbox.name = 'service'
                checkbox.value = service.codigo // Usando o código como valor único
                checkbox.id = `service-${service.codigo}`

                const label = document.createElement('label')
                label.htmlFor = checkbox.id
                label.innerHTML = `
                    <strong>${service.tipo}</strong><br>
                    Quantidade: ${service.quantidade}<br>
                    Preço: R$ ${service.preco.toFixed(2)}
                `

                checkboxContainer.appendChild(checkbox)
                checkboxContainer.appendChild(label)

                form.appendChild(checkboxContainer)
            })

            // Botão de submit
            const submitButton = document.createElement('button')
            submitButton.type = 'submit'
            submitButton.textContent = 'Agendar'
            form.appendChild(submitButton)

            // Evento de submit do formulário
            form.addEventListener('submit', (e) => {
                e.preventDefault()

                const selectedServices = []
                const checkboxes = form.querySelectorAll('input[name="service"]:checked')
                checkboxes.forEach(checkbox => {
                    // Encontra o serviço correspondente pelo código
                    const service = obj.servicos.find(s => s.codigo === checkbox.value)
                    if (service) {
                        selectedServices.push(service)
                    }
                })

                if (selectedServices.length > 0) {
                    // Aqui você pode enviar os dados selecionados para o backend
                    console.log(`Data: ${obj.data}`)
                    console.log('Serviços selecionados:', selectedServices)

                    // Exemplo de envio para o backend
                    // fetch('http://localhost/project-towing-services-system/backend/aqueleQueNaoPodeSerNomeado.php', {
                    //     method: 'POST',
                    //     headers: {
                    //         'Content-Type': 'application/json'
                    //     },
                    //     body: JSON.stringify({
                    //         data: obj.data,
                    //         servicos: selectedServices
                    //     })
                    // })
                    // .then(response => response.json())
                    // .then(data => {
                    //     // Lógica após o agendamento bem-sucedido
                    // })
                    // .catch(error => {
                    //     console.error('Erro:', error)
                    // })

                    alert(`Serviços agendados para ${obj.data}:\n${selectedServices.map(s => s.tipo).join(', ')}`)
                } else {
                    alert('Por favor, selecione pelo menos um serviço.')
                }
            })

            cardDiv.appendChild(form)
            schedulingsContainer.appendChild(cardDiv)
        })

    } catch(err) {
        console.log(err.message)
    }
}

getServices()