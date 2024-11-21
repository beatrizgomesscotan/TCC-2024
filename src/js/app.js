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
                templateUrl: './pages/home.html',
               controller: 'homeController'
            })


             .state('pedido', {
                 url: '/pedido',
                 templateUrl: './movimento/pedido.html',
             })
             .state('venda', {
                 url: '/venda',
                 templateUrl: './movimento/venda.html', 
             })

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
               .state('vendaRelatorio', {
                url: '/vendaRelatorio',
                templateUrl: './pages/relatorios/vendaRelatorio/grid.html',
                controller: 'vendaRelatorioController'
            })

            .state('vendedorRelatorio', {
                url: '/vendedorRelatorio',
                templateUrl: './pages/relatorios/vendedorRelatorio/grid.html',
                controller: 'vendedorRelatorioController'
            })
            .state('about', {
                url: '/about',
                template: '<h3>About</h3>'
            })
}])