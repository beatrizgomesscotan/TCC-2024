let app = angular.module('myApp', ['ui.router', 'cp.ngConfirm', 'ngMask']);

app.constant('config', {
    name: 'UMFG',
    version: 'v1.0.0',
    // apiUrl: 'http://api.digitalone.com.br/api/',
    apiUrl: 'http://localhost:8080/',
    baseUrl: 'http://localhost/sbadmin/',
    enableDebug: true
})

app.config([
    '$stateProvider', '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise('/');

        $stateProvider
        // Relatórios
            // .state('home', {
            //     url: '/',
            //     template: '<h3>Home</h3>'
            // })
            // .state('about', {
            //     url: '/about',
            //     template: '<h3>About</h3>'
            // })]
            //Aqui começa o control C
            .state('produto', {
                url: '/produto',
                templateUrl: './pages/cadastros/produto/grid.html',
                controller: function(config, $scope, $http, $ngConfirm){
                    $scope.grid = [];

                    fetch(config.apiUrl + 'produto')
                    .then(rs => rs.json())
                    .then(rs => {
                        $scope.grid = rs;
                        $scope.$apply();
                    })
                    //end

                    $scope.modal = function(data){
                        
                        $scope.pessoa = data;
                        let method = (data == null) ? 'POST' : 'PUT';
                        let url = (data == null) ? config.apiUrl+'produto' : config.apiUrl+'produto/'+data.id;
                        
                        $ngConfirm({
                            title: 'Editar',
                            contentUrl: './pages/cadastros/produto/form.html',
                            scope: $scope,
                            theme: 'light',
                            typeAnimated: true,
                            closeAnimation: 'scale',
                            columnClass: 'xlarge',
                            buttons: {
                                save: {
                                    text: 'Salvar',
                                    btnClass: 'btn-green',
                                    action: function(){
                                        fetch(url, {
                                            method: method,
                                            headers:{
                                                "Content-Type":"application/json",
                                                "Accept":"application/json"
                                            },
                                            body: JSON.stringify($scope.produto)
                                        })
                                        .then(response => response.json())
                                        .then(rs => {
                                            $ngConfirm({
                                                title: config.name,
                                                content: rs.msg
                                            })
                                        })
                                        .catch(() => {
                                            alert('ERROR ')
                                        })
                                    }
                                },
                                cancel: {
                                    text: 'Cancelar',
                                    btnClass: 'btn-red'
                                }
                            }
                        })
                    }


                }
                
            })  //aqui acaba o contro

            //Funcionario
            .state('funcionario', {
                url: '/funcionario',
                templateUrl: './pages/cadastros/funcionario/grid.html',
                controller: function(config, $scope, $http, $ngConfirm){
                    $scope.grid = [];

                    fetch(config.apiUrl + 'funcionario')
                    .then(rs => rs.json())
                    .then(rs => {
                        $scope.grid = rs;
                        $scope.$apply();
                    })


                    $scope.modal = function(data){
                        
                        $scope.pessoa = data;
                        let method = (data == null) ? 'POST' : 'PUT';
                        let url = (data == null) ? config.apiUrl+'funcionario' : config.apiUrl+'funcionario/'+data.id;
                        
                        $ngConfirm({
                            title: 'Editar',
                            contentUrl: './pages/cadastros/funcionario/form.html',
                            scope: $scope,
                            theme: 'light',
                            typeAnimated: true,
                            closeAnimation: 'scale',
                            columnClass: 'xlarge',
                            buttons: {
                                save: {
                                    text: 'Salvar',
                                    btnClass: 'btn-green',
                                    action: function(){
                                        fetch(url, {
                                            method: method,
                                            headers:{
                                                "Content-Type":"application/json",
                                                "Accept":"application/json"
                                            },
                                            body: JSON.stringify($scope.produto)
                                        })
                                        .then(response => response.json())
                                        .then(rs => {
                                            $ngConfirm({
                                                title: config.name,
                                                content: rs.msg
                                            })
                                        })
                                        .catch(() => {
                                            alert('ERROR ')
                                        })
                                    }
                                },
                                cancel: {
                                    text: 'Cancelar',
                                    btnClass: 'btn-red'
                                }
                            }
                        })
                    }


                }
                //aqui acaba o contro
            })

            .state('cliente', {
                url: '/cliente',
                templateUrl: './pages/cadastros/cliente/grid.html',
                controller: function(config, $scope, $http, $ngConfirm){
                    $scope.grid = [];

                    fetch(config.apiUrl + 'cliente')
                    .then(rs => rs.json())
                    .then(rs => {
                        $scope.grid = rs;
                        $scope.$apply();
                    })

                    //buscar cep na api via cep
                    $scope.getCep = function(cep){
    
                        if(cep.length == 9){
                        console.log(cep)
                        let url = 'https://viacep.com.br/ws/'+cep+'/json/';
                        $http.get(url)
                        .then((rs) => {
                            let data = rs.data;
                            $scope.pessoa.rua = data.logradouro
                            $scope.pessoa.complemento = data.complemento
                            $scope.pessoa.bairro = data.bairro
                            $scope.pessoa.cidade = data.localidade
                            $scope.pessoa.uf = data.uf
                        })
                        .catch(() => {
                            alert('ERROR')
                        })
                    }
                }
                    //end

                    $scope.modal = function(data){
                        
                        $scope.pessoa = data;
                        let method = (data == null) ? 'POST' : 'PUT';
                        let url = (data == null) ? config.apiUrl+'cliente' : config.apiUrl+'cliente/'+data.id;
                        
                        $ngConfirm({
                            title: 'Editar',
                            contentUrl: './pages/cadastros/cliente/form.html',
                            scope: $scope,
                            theme: 'light',
                            typeAnimated: true,
                            closeAnimation: 'scale',
                            columnClass: 'xlarge',
                            buttons: {
                                save: {
                                    text: 'Salvar',
                                    btnClass: 'btn-green',
                                    action: function(){
                                        console.log($scope.pessoa)
                                        
                                        fetch(url, {
                                            method: method,
                                            headers:{
                                                "Content-Type":"application/json",
                                                "Accept":"application/json"
                                            },
                                            body: JSON.stringify($scope.pessoa)
                                        })
                                        .then(response => response.json())
                                        .then(rs => {
                                            $ngConfirm({
                                                title: config.name,
                                                content: rs.msg
                                            })
                                        })
                                        .catch(() => {
                                            alert('ERROR')
                                        })
                                    }
                                },
                                cancel: {
                                    text: 'Cancelar',
                                    btnClass: 'btn-red'
                                }
                            }
                        })
                    }


                }
            })


            //Relatorio
            //VENDA
            .state('venda', {
                url: '/venda',
                templateUrl: './pages/relatorios/venda/grid.html',
                controller: function(config, $scope, $http, $ngConfirm){
                    $scope.grid = [];

                    fetch(config.apiUrl + 'venda')
                    .then(rs => rs.json())
                    .then(rs => {
                        $scope.grid = rs;
                        $scope.$apply();
                    })

                    //buscar cep na api via cep
                    $scope.getCep = function(cep){
    
                        if(cep.length == 9){
                        console.log(cep)
                        let url = 'https://viacep.com.br/ws/'+cep+'/json/';
                        $http.get(url)
                        .then((rs) => {
                            let data = rs.data;
                            $scope.pessoa.rua = data.logradouro
                            $scope.pessoa.complemento = data.complemento
                            $scope.pessoa.bairro = data.bairro
                            $scope.pessoa.cidade = data.localidade
                            $scope.pessoa.uf = data.uf
                        })
                        .catch(() => {
                            alert('ERROR')
                        })
                    }
                }
                    //end

                    $scope.modal = function(data){
                        
                        $scope.pessoa = data;
                        let method = (data == null) ? 'POST' : 'PUT';
                        let url = (data == null) ? config.apiUrl+'venda' : config.apiUrl+'venda/'+data.id;
                        
                        $ngConfirm({
                            title: 'Editar',
                            contentUrl: './pages/relatorios/venda/form.html',
                            scope: $scope,
                            theme: 'light',
                            typeAnimated: true,
                            closeAnimation: 'scale',
                            columnClass: 'xlarge',
                            buttons: {
                                save: {
                                    text: 'Salvar',
                                    btnClass: 'btn-green',
                                    action: function(){
                                        fetch(url, {
                                            method: method,
                                            headers:{
                                                "Content-Type":"application/json",
                                                "Accept":"application/json"
                                            },
                                            body: JSON.stringify($scope.pessoa)
                                        })
                                        .then(response => response.json())
                                        .then(rs => {
                                            $ngConfirm({
                                                title: config.name,
                                                content: rs.msg
                                            })
                                        })
                                        .catch(() => {
                                            alert('ERROR')
                                        })
                                    }
                                },
                                cancel: {
                                    text: 'Cancelar',
                                    btnClass: 'btn-red'
                                }
                            }
                        })
                    }


                }
            })

            //RELATORIO 
            //VENDEDORES

            .state('vendedores', {
                url: '/vendedores',
                templateUrl: './pages/relatorios/vendedores/grid.html',
                controller: function(config, $scope, $http, $ngConfirm){
                    $scope.grid = [];

                    fetch(config.apiUrl + 'vendedores')
                    .then(rs => rs.json())
                    .then(rs => {
                        $scope.grid = rs;
                        $scope.$apply();
                    })

                    //buscar cep na api via cep
                    $scope.getCep = function(cep){
    
                        if(cep.length == 9){
                        console.log(cep)
                        let url = 'https://viacep.com.br/ws/'+cep+'/json/';
                        $http.get(url)
                        .then((rs) => {
                            let data = rs.data;
                            $scope.pessoa.rua = data.logradouro
                            $scope.pessoa.complemento = data.complemento
                            $scope.pessoa.bairro = data.bairro
                            $scope.pessoa.cidade = data.localidade
                            $scope.pessoa.uf = data.uf
                        })
                        .catch(() => {
                            alert('ERROR')
                        })
                    }
                }
                    //end

                    $scope.modal = function(data){
                        
                        $scope.pessoa = data;
                        let method = (data == null) ? 'POST' : 'PUT';
                        let url = (data == null) ? config.apiUrl+'vendedores' : config.apiUrl+'vendedores/'+data.id;
                        
                        $ngConfirm({
                            title: 'Editar',
                            contentUrl: './pages/relatorios/vendedores/form.html',
                            scope: $scope,
                            theme: 'light',
                            typeAnimated: true,
                            closeAnimation: 'scale',
                            columnClass: 'xlarge',
                            buttons: {
                                save: {
                                    text: 'Salvar',
                                    btnClass: 'btn-green',
                                    action: function(){
                                        fetch(url, {
                                            method: method,
                                            headers:{
                                                "Content-Type":"application/json",
                                                "Accept":"application/json"
                                            },
                                            body: JSON.stringify($scope.pessoa)
                                        })
                                        .then(response => response.json())
                                        .then(rs => {
                                            $ngConfirm({
                                                title: config.name,
                                                content: rs.msg
                                            })
                                        })
                                        .catch(() => {
                                            alert('ERROR')
                                        })
                                    }
                                },
                                cancel: {
                                    text: 'Cancelar',
                                    btnClass: 'btn-red'
                                }
                            }
                        })
                    }


                }
            })
            //ProdutoRelatorio

            .state('produtoRelatorio', {
                url: '/produtoRelatorio',
                templateUrl: './pages/relatorios/produtoRelatorio/grid.html',
                controller: function(config, $scope, $http, $ngConfirm){
                    $scope.grid = [];

                    fetch(config.apiUrl + 'produtoRelatorio')
                    .then(rs => rs.json())
                    .then(rs => {
                        $scope.grid = rs;
                        $scope.$apply();
                    })

                    //buscar cep na api via cep
                    $scope.getCep = function(cep){
    
                        if(cep.length == 9){
                        console.log(cep)
                        let url = 'https://viacep.com.br/ws/'+cep+'/json/';
                        $http.get(url)
                        .then((rs) => {
                            let data = rs.data;
                            $scope.pessoa.rua = data.logradouro
                            $scope.pessoa.complemento = data.complemento
                            $scope.pessoa.bairro = data.bairro
                            $scope.pessoa.cidade = data.localidade
                            $scope.pessoa.uf = data.uf
                        })
                        .catch(() => {
                            alert('ERROR')
                        })
                    }
                }
                    //end

                    $scope.modal = function(data){
                        
                        $scope.pessoa = data;
                        let method = (data == null) ? 'POST' : 'PUT';
                        let url = (data == null) ? config.apiUrl+'produtoRelatorio' : config.apiUrl+'produtoRelatorio/'+data.id;
                        
                        $ngConfirm({
                            title: 'Editar',
                            contentUrl: './pages/relatorios/produtoRelatorio/form.html',
                            scope: $scope,
                            theme: 'light',
                            typeAnimated: true,
                            closeAnimation: 'scale',
                            columnClass: 'xlarge',
                            buttons: {
                                save: {
                                    text: 'Salvar',
                                    btnClass: 'btn-green',
                                    action: function(){
                                        fetch(url, {
                                            method: method,
                                            headers:{
                                                "Content-Type":"application/json",
                                                "Accept":"application/json"
                                            },
                                            body: JSON.stringify($scope.pessoa)
                                        })
                                        .then(response => response.json())
                                        .then(rs => {
                                            $ngConfirm({
                                                title: config.name,
                                                content: rs.msg
                                            })
                                        })
                                        .catch(() => {
                                            alert('ERROR')
                                        })
                                    }
                                },
                                cancel: {
                                    text: 'Cancelar',
                                    btnClass: 'btn-red'
                                }
                            }
                        })
                    }


                }
            })

        

}])