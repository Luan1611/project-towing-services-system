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

        // servicesData.forEach(item => {
        //     let innerDiv = document.createElement('div')
        //     innerDiv.innerHTML = `<p>${}</p><p>${}</p><p>${}</p><p>${}</p><p>${}</p>`
            
        // })

    } catch(err) {
        console.log(err.message)
    }
}

getServices()