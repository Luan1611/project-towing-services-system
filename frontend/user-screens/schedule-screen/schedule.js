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
                        servicos: {}
                    };
                }

                if (!acc[data_oferta_servico].servicos[tipo]) {
                    acc[data_oferta_servico].servicos[tipo] = [];
                }

                acc[data_oferta_servico].servicos[tipo].push({ preco, quantidade, codigo });

                return acc;
            }, {})
        );

        const finalResultado = resultado.map(({ data, servicos }) => ({
            data,
            servicos: Object.entries(servicos).map(([tipo, detalhes]) => ({
                tipo,
                detalhes
            }))
        }));

        console.log(JSON.stringify(finalResultado, null, 2));

        finalResultado.forEach(obj => {
            const cardDiv = document.createElement('div')
            cardDiv.classList.add('card')
            const date = document.createElement ('h3')
            date.textContent = obj.data
            cardDiv.appendChild(date)
    
            obj.servicos.forEach(innerObj => {
                const h5 = document.createElement ('h5')
                h5.textContent = innerObj.tipo
                cardDiv.appendChild(h5)
    
                innerObj.detalhes.forEach(detailsObj => {
                    const pCodigo = document.createElement ('h6')
                    const pQuantidade = document.createElement ('h6')
                    const pPreco = document.createElement ('h6')
                    pCodigo.textContent = detailsObj.codigo
                    pQuantidade.textContent = detailsObj.quantidade
                    pPreco.textContent = detailsObj.preco
                    cardDiv.appendChild(pCodigo)
                    cardDiv.appendChild(pPreco)
                    cardDiv.appendChild(pQuantidade)
                })
            })
            schedulingsContainer.appendChild(cardDiv)
        })

    } catch(err) {
        console.log(err.message)
    }
}

getServices()