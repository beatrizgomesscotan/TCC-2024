// app.controller('produtoRelatorioController', function($scope, config, $ngConfirm) {

//     let module = 'produtoRelatorio';

//     $scope.grid = [];

//     fetch(config.apiUrl + 'relatorio-pedido-solicitado')
//     .then(rs => rs.json())
//     .then(rs => {
//         $scope.grid = rs;
//         console.log($scope.grid)
//         $scope.$apply();
//     })

//        // Gera o PDF com HTML dinâmico
//        $scope.gerarPDF = function() {
//         // Cria o HTML dinâmico
//         let htmlContent = `
//             <div style="font-family: Arial, sans-serif; text-align: center;">
//                 <h1>Relatório de Produto</h1>
//                 <p>Data de Geração: ${new Date().toLocaleDateString('pt-br')}</p>
//                 <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
//                     <thead>
//                         <tr>
//                             <th style="border: 1px solid #ddd; padding: 8px;">Nome do Produto</th>
//                             <th style="border: 1px solid #ddd; padding: 8px;">Quantidade Vendida</th>
//                             <th style="border: 1px solid #ddd; padding: 8px;">Valor Total</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         ${$scope.grid.map(item => `
//                             <tr>
//                                 <td style="border: 1px solid #ddd; padding: 8px;">${item.nomeProduto}</td>
//                                 <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.numeroPedido}
//                                 <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.valorGerado}
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



app.controller('produtoRelatorioController', function($scope, config, $ngConfirm) {

    let module = 'produto';

    $scope.grid = [];

    fetch(config.apiUrl + 'relatorio-pedido-solicitado')
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
                <h1 style="margin: 0;">Relatório de Produto</h1>
             </div>
               <p>Data de Geração: ${new Date().toLocaleDateString('pt-br')}</p>
               <table style="width: 100%; border-collapse: collapse; margin-top: 5px;">
                   <thead>
                       <tr>
                           <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Nome do Produto</th>
                           <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Quantidade Vendida</th>
                           <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Valor Total</th>
                       </tr>
                   </thead>
                   <tbody>
                       ${$scope.grid.map(item => `
                           <tr>
                               <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${item.nomeProduto}</td>
                               <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${item.numeroPedido}</td>
                               <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${item.valorGerado}</td>
                           </tr>
                       `).join('')}
                   </tbody>
               </table>
           </div>
       `;

       // Configurações do html2pdf.js
       let opt = {
           margin: 1,
           filename: 'Relatorio-produto.pdf',
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

