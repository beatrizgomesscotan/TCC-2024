app.controller('clienteRelatorioController', function($scope, config, $ngConfirm) {

    let module = 'clienteRelatorio';

    $scope.grid = [];

    fetch(config.apiUrl + 'relatorio-cliente-Pedido')
    .then(rs => rs.json())
    .then(rs => {
        $scope.grid = rs;
        $scope.$apply();
    })
});

