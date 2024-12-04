let app = angular.module('myApp', ['ui.router', 'cp.ngConfirm', 'ngMask']);

app.constant('config', {
    name: 'UMFG',
    version: 'v1.0.0',
    apiUrl: 'http://localhost:8080/',
    baseUrl: 'http://localhost/sbadmin/',
    enableDebug: true
})

app.config([
    '$stateProvider', '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider, $scope){

        $urlRouterProvider.otherwise('/'); 

        $stateProvider
            .state('home', {
                url: '/', //PRINCIPAL
                templateUrl: './pages/home.html'
            })

            //Movimentos
             .state('pedido', {
                 url: '/pedido',
                 templateUrl: './pages/movimento/pedido/grid.html',
                 controller:'pedidoController'
             })
            //  .state('venda', {
            //      url: '/venda',
            //      templateUrl: './movimento/venda.html', 
            //  })

            //Cadastros
            .state('cliente', {
                url: '/cliente',
                templateUrl: './pages/cadastros/cliente/grid.html',
                controller: 'clienteController'
            })
            .state('produto', {
                url: '/produto',
                templateUrl: './pages/cadastros/produto/grid.html',
                controller: 'produtoController'
            })
            .state('usuario', {
                url: '/usuario',
                templateUrl: './pages/cadastros/usuario/grid.html',//////////////
                controller: 'usuarioController'
            })

            //Relatórios
            .state('produtoRelatorio', {
                url: '/produtoRelatorio',
                templateUrl: './pages/relatorios/produtoRelatorio/grid.html',
                controller: 'produtoRelatorioController'
            })
            .state('clienteRelatorio', {
                url: '/clienteRelatorio',
                templateUrl: './pages/relatorios/clienteRelatorio/grid.html',
                controller: 'clienteRelatorioController'
            })
            .state('usuarioRelatorio', {
                url: '/usuarioRelatorio',
                templateUrl: './pages/relatorios/usuarioRelatorio/grid.html',
                controller: 'usuarioRelatorioController'
            })
            .state('about', {
                url: '/about',
                template: '<h3>About</h3>'
            })
}])