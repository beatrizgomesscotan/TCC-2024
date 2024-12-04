app.controller('produtoRelatorioController', function($scope, config, $ngConfirm) {

    let module = 'produtoRelatorio';

    $scope.grid = [];

    fetch(config.apiUrl + 'relatorio-pedido-solicitado')
    .then(rs => rs.json())
    .then(rs => {
        $scope.grid = rs;
        console.log($scope.grid)
        $scope.$apply();
    })

});

