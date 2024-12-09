// app.controller('usuarioRelatorioController', function($scope, config, $ngConfirm) {

//     let module = 'usuario';

//     $scope.grid = [];

//     fetch(config.apiUrl + 'relatorio-usuario-pedido')
//     .then(rs => rs.json())
//     .then(rs => {

//         //Pego a variavel rs que está recebendo cliente , valor e data
//         //faço um map para passar por todos os valores de rs e current recebe esses valores 
//         //no return eu faço(...) que junta todos os valores de current e depois falo que quero editar o valor de ultimoPedidoRealizado , que é a data toda desformatada
//         //Instancio ela formatando para a data de portugal brasil 
//         rs = rs.map((current) => {
//             return {...current, ultimoPedidoRealizado: new Date(current.ultimoPedidoRealizado).toLocaleDateString('pt-br')}
//         })
//         $scope.grid = rs;
//         $scope.$apply();
//     })

//        // Gera o PDF com HTML dinâmico
//        $scope.gerarPDF = function() {
//         // Cria o HTML dinâmico
//         let htmlContent = `
//          <img src="./src/img/logo original.png" style="width: 100px; height: auto; margin-bottom: 10px;">
//             <div style="font-family: Arial, sans-serif; text-align: center;">
               
//                 <h1>Relatório de Usuário</h1>
//                 <p>Data de Geração: ${new Date().toLocaleDateString('pt-br')}</p>
//                 <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
//                     <thead>
//                         <tr>
//                             <th style="border: 1px solid #ddd; padding: 8px;">Nome do Cliente</th>
//                             <th style="border: 1px solid #ddd; padding: 8px;">Total de Pedidos</th>
//                             <th style="border: 1px solid #ddd; padding: 8px;">Data último Pedido</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         ${$scope.grid.map(item => `
//                             <tr>
//                                 <td style="border: 1px solid #ddd; padding: 8px;">${item.nome}</td>
//                                 <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.numeroPedidos}</td>
//                                 <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.ultimoPedidoRealizado}
//                                 </td>
//                             </tr>
//                         `).join('')}
//                     </tbody>
//                 </table>
//             </div>
//         `;

//         // Configurações do html2pdf.js
//         let opt = {
//             margin: 1,
//             filename: 'relatorio-clientes.pdf',
//             image: { type: 'jpeg', quality: 0.98 },
//             html2canvas: { scale: 2 },
//             jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
//         };

//         // Gera o PDF usando o HTML dinâmico
//         html2pdf().from(htmlContent).set(opt).save();
//     };

// });





//DISPARA UM ALERT CASO NÃO POSSUI NENUM DADO , ESTÁ CORRETO OU TEM QUE IMPRIMIR VAZIO?

// app.controller('usuarioRelatorioController', function ($scope, config, $ngConfirm) {
//     let module = 'usuario';
//     $scope.grid = [];

//     // Fetch dos dados
//     fetch(config.apiUrl + 'relatorio-usuario-pedido')
//         .then(rs => rs.json())
//         .then(rs => {
//             rs = rs.map((current) => {
//                 return {
//                     ...current,
//                     ultimoPedidoRealizado: new Date(current.ultimoPedidoRealizado).toLocaleDateString('pt-br')
//                 };
//             });
//             $scope.grid = rs;
//             console.log('Dados carregados:', $scope.grid); // Verifique os dados carregados
//             $scope.$apply();
//         })
//         .catch(error => {
//             console.error('Erro ao buscar os dados:', error);
//         });

//     // Gera o PDF
//     $scope.gerarPDF = function () {
//         console.log('Geração do PDF iniciada.'); // Log de início

//         // Certifique-se de que os dados estão disponíveis
//         if (!$scope.grid || $scope.grid.length === 0) {
//             alert('Os dados ainda não foram carregados ou estão vazios!');
//             return;
//         }

//         // Caminho da imagem
//         const imgSrc = './src/img/logo original.png';

//         // Verificar se a imagem existe
//         const img = new Image();
//         img.src = imgSrc;

//         img.onload = function () {
//             console.log('Imagem carregada com sucesso.');

//             // Gera o HTML dinâmico
//             let htmlContent = `
//                 <div style="font-family: Arial, sans-serif; text-align: center;">
//                     <img src="${imgSrc}" style="width: 100px; height: auto; margin-bottom: 10px;">
//                     <h1>Relatório de Usuário</h1>
//                     <p>Data de Geração: ${new Date().toLocaleDateString('pt-br')}</p>
//                     <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
//                         <thead>
//                             <tr>
//                                 <th style="border: 1px solid #ddd; padding: 8px;">Nome do Cliente</th>
//                                 <th style="border: 1px solid #ddd; padding: 8px;">Total de Pedidos</th>
//                                 <th style="border: 1px solid #ddd; padding: 8px;">Data último Pedido</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             ${$scope.grid.map(item => `
//                                 <tr>
//                                     <td style="border: 1px solid #ddd; padding: 8px;">${item.nome || 'N/A'}</td>
//                                     <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.numeroPedidos || 0}</td>
//                                     <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.ultimoPedidoRealizado || 'N/A'}</td>
//                                 </tr>
//                             `).join('')}
//                         </tbody>
//                     </table>
//                 </div>
//             `;

//             console.log('HTML gerado:', htmlContent);

//             // Configurações do html2pdf.js
//             let opt = {
//                 margin: 1,
//                 filename: 'relatorio-clientes.pdf',
//                 image: { type: 'jpeg', quality: 0.98 },
//                 html2canvas: { scale: 2 },
//                 jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
//             };

//             // Gera o PDF usando o HTML dinâmico
//             html2pdf().from(htmlContent).set(opt).save();
//         };

//         img.onerror = function () {
//             console.error('Erro ao carregar a imagem. Verifique o caminho:', imgSrc);
//             alert('Erro ao carregar a imagem. Verifique o caminho e tente novamente.');
//         };
//     };
// });




//PERFEITO
// app.controller('usuarioRelatorioController', function($scope, config, $ngConfirm) {

//         let module = 'usuario';
    
//          $scope.grid = [];
    
//          fetch(config.apiUrl + 'relatorio-usuario-pedido')
//         .then(rs => rs.json())
//          .then(rs => {
    
//              //Pego a variavel rs que está recebendo cliente , valor e data
//              //faço um map para passar por todos os valores de rs e current recebe esses valores 
//              //no return eu faço(...) que junta todos os valores de current e depois falo que quero editar o valor de ultimoPedidoRealizado , que é a data toda desformatada
//             //Instancio ela formatando para a data de portugal brasil 
//              rs = rs.map((current) => {
//                  return {...current, ultimoPedidoRealizado: new Date(current.ultimoPedidoRealizado).toLocaleDateString('pt-br')}
//              })
//              $scope.grid = rs;
//              $scope.$apply();
//          })

//          $scope.gerarPDF = function() {
//             // Crie um elemento de imagem
//             const img = new Image();
//             img.src = './src/img/logo original.png';
        
//             // Aguarde o carregamento da imagem
//             img.onload = function() {
//                 // HTML dinâmico com a imagem carregada
//                 let htmlContent = `
//                     <div style="font-family: Arial, sans-serif; text-align: center;">
//                         <img src="${img.src}" style="width: 150px; height: auto; margin-bottom: 10px;">
//                         <h1>Relatório de Usuário</h1>
//                         <p>Data de Geração: ${new Date().toLocaleDateString('pt-br')}</p>
//                         <table style="width: 100%; border-collapse: collapse; margin-top: 5px;">
//                             <thead>
//                                 <tr>
//                                     <th style="border: 1px solid #ddd; padding: 8px;">Nome do Cliente</th>
//                                     <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Total de Pedidos</th>
//                                     <th style="border: 1px solid #ddd; padding: 8px;">Data último Pedido</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 ${$scope.grid.map(item => `
//                                     <tr>
//                                         <td style="border: 1px solid #ddd; padding: 8px;">${item.nome || 'N/A'}</td>
//                                         <td style="border: 1px solid #ddd; padding: 8px; text-align:right;">${item.numeroPedidos || 0}</td>
//                                         <td style="border: 1px solid #ddd; padding: 8px; text-align:right;">${item.ultimoPedidoRealizado || 'N/A'}</td>
//                                     </tr>
//                                 `).join('')}
//                             </tbody>
//                         </table>
//                     </div>
//                 `;
        
//                 // Configurações do html2pdf.js
//                 let opt = {
//                     margin: 1,
//                     filename: 'relatorio-clientes.pdf',
//                     image: { type: 'jpeg', quality: 0.98 },
//                     html2canvas: { scale: 2 },
//                     jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
//                 };
        
//                 // Gera o PDF usando o HTML dinâmico
//                 html2pdf().from(htmlContent).set(opt).save();
//             };
        
//             img.onerror = function() {
//                 alert('Erro ao carregar a imagem. Verifique o caminho e tente novamente.');
//             };
//         };
        
//        });




// app.controller('usuarioRelatorioController', function($scope, config, $ngConfirm) {

//     let module = 'usuario';

//     $scope.grid = [];

//     fetch(config.apiUrl + 'relatorio-usuario-pedido')
//         .then(rs => rs.json())
//         .then(rs => {

//             // Pego a variável rs que está recebendo cliente, valor e data
//             // Faço um map para passar por todos os valores de rs e current recebe esses valores 
//             // No return eu faço(...) que junta todos os valores de current e depois falo que quero editar o valor de ultimoPedidoRealizado, que é a data toda desformatada
//             // Instancio ela formatando para a data de Portugal Brasil
//             rs = rs.map((current) => {
//                 return { ...current, ultimoPedidoRealizado: new Date(current.ultimoPedidoRealizado).toLocaleDateString('pt-br') }
//             })
//             $scope.grid = rs;
//             $scope.$apply();
//         });

//     $scope.gerarPDF = function () {
//         // Crie um elemento de imagem
//         const img = new Image();
//         img.src = './src/img/logo original.png';

//         // Aguarde o carregamento da imagem
//         img.onload = function () {
//             // HTML dinâmico com a imagem carregada
//             let htmlContent = `
//                 <div style="font-family: Arial, sans-serif; text-align: center;">
//                     <img src="${img.src}" style="width: 200px; height: auto; margin-bottom: 10px;">
//                     <h1>Relatório de Usuário</h1>
//                     <p>Data de Geração: ${new Date().toLocaleDateString('pt-br')}</p>
//                     <table style="width: 100%; border-collapse: collapse; margin-top: 5px;">
//                         <thead>
//                             <tr>
//                                 <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Nome do Cliente</th>
//                                 <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Total de Pedidos</th>
//                                 <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Data do Último Pedido</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             ${$scope.grid.map(item => `
//                                 <tr>
//                                     <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.nome || 'N/A'}</td>
//                                     <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${item.numeroPedidos || 0}</td>
//                                     <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${item.ultimoPedidoRealizado || 'N/A'}</td>
//                                 </tr>
//                             `).join('')}
//                         </tbody>
//                     </table>
//                 </div>
//             `;

//             // Configurações do html2pdf.js
//             let opt = {
//                 margin: 1,
//                 filename: 'relatorio-clientes.pdf',
//                 image: { type: 'jpeg', quality: 0.98 },
//                 html2canvas: { scale: 2 },
//                 jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
//             };

//             // Gera o PDF usando o HTML dinâmico
//             html2pdf().from(htmlContent).set(opt).save();
//         };

//         img.onerror = function () {
//             alert('Erro ao carregar a imagem. Verifique o caminho e tente novamente.');
//         };
//     };

// });


app.controller('usuarioRelatorioController', function($scope, config, $ngConfirm) {

     let module = 'usuario';

     $scope.grid = [];

     fetch(config.apiUrl + 'relatorio-usuario-pedido')
         .then(rs => rs.json())
         .then(rs => {

             // Pego a variável rs que está recebendo cliente, valor e data
             // Faço um map para passar por todos os valores de rs e current recebe esses valores 
             // No return eu faço(...) que junta todos os valores de current e depois falo que quero editar o valor de ultimoPedidoRealizado, que é a data toda desformatada
             // Instancio ela formatando para a data de Portugal Brasil
             rs = rs.map((current) => {
                 return { ...current, ultimoPedidoRealizado: new Date(current.ultimoPedidoRealizado).toLocaleDateString('pt-br') }
             })
             $scope.grid = rs;
             $scope.$apply();
         });

$scope.gerarPDF = function () {
    // Crie um elemento de imagem
    const img = new Image();
    img.src = './src/img/logo original.png';

    // Aguarde o carregamento da imagem
    img.onload = function () {
        // HTML dinâmico com a imagem carregada
        let htmlContent = `
            <div style="font-family: Arial, sans-serif; text-align: center;">
                <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 10px;">
                <img src="${img.src}" style="width: 150px; height: auto; margin-right: 10px;">
                <h1 style="margin: 0;">Relatório de Usuário</h1>
             </div>
                <p>Data de Geração: ${new Date().toLocaleDateString('pt-br')}</p>
                <table style="width: 100%; border-collapse: collapse; margin-top: 5px;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Nome do Cliente</th>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Total de Pedidos</th>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Data do Último Pedido</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${$scope.grid.map(item => `
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${item.nome || 'N/A'}</td>
                                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${item.numeroPedidos || 0}</td>
                                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${item.ultimoPedidoRealizado || 'N/A'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;

        // Configurações do html2pdf.js
        let opt = {
            margin: 1,
            filename: 'relatorio-usuario.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // Gera o PDF usando o HTML dinâmico
        html2pdf().from(htmlContent).set(opt).save();
    };

    img.onerror = function () {
        alert('Erro ao carregar a imagem. Verifique o caminho e tente novamente.');
    };
};

});
