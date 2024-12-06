app.controller('clienteRelatorioController', function($scope, config) {
    $scope.grid = [];

    // Busca os dados
    fetch(config.apiUrl + 'relatorio-cliente-Pedido')
        .then(rs => rs.json())
        .then(rs => {
            $scope.grid = rs;
            $scope.$apply();
        });

    // Gera o PDF com HTML dinâmico
    $scope.gerarPDF = function() {
        // Cria o HTML dinâmico
        let htmlContent = `
            <div style="font-family: Arial, sans-serif; text-align: center;">
                <h1>Relatório de Clientes</h1>
                <p>Data de Geração: ${new Date().toLocaleDateString('pt-br')}</p>
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid #ddd; padding: 8px;">Nome do Cliente</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Total de Pedidos</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${$scope.grid.map(item => `
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 8px;">${item.nomeCliente}</td>
                                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.totalPedidos}</td>
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
