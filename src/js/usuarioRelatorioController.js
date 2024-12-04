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

});

