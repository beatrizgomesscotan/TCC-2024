app.controller('usuarioRelatorioController', function($scope, config, $ngConfirm) {

    let module = 'usuario';

    $scope.grid = [];

    fetch(config.apiUrl + 'relatorio-usuario-pedido')
    .then(rs => rs.json())
    .then(rs => {

        //Pego a variavel rs que está recebendo cliente , valor e data
        //faço um map para passar por todos os valores de rs e current recebe esses valores 
        //no return eu faço(...) que junta todos os valores de current e depois falo que quero editar o valor de ultimoPedidoRealizado , que é a data toda desformatada
        //Instancio ela formatando para a data de portugal brasil 
        rs = rs.map((current) => {
            return {...current, ultimoPedidoRealizado: new Date(current.ultimoPedidoRealizado).toLocaleDateString('pt-br')}
        })
        $scope.grid = rs;
        $scope.$apply();
    })

       // Gera o PDF com HTML dinâmico
       $scope.gerarPDF = function() {
        // Cria o HTML dinâmico
        let htmlContent = `
            <div style="font-family: Arial, sans-serif; text-align: center;">
                <h1>Relatório de Usuário</h1>
                <p>Data de Geração: ${new Date().toLocaleDateString('pt-br')}</p>
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid #ddd; padding: 8px;">Nome do Cliente</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Total de Pedidos</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Data último Pedido</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${$scope.grid.map(item => `
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 8px;">${item.nome}</td>
                                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.numeroPedidos}
                                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.ultimoPedidoRealizado}
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;

        // Configurações do html2pdf.js
        let opt = {
            margin: 1,
            filename: 'relatorio-clientes.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // Gera o PDF usando o HTML dinâmico
        html2pdf().from(htmlContent).set(opt).save();
    };

});

