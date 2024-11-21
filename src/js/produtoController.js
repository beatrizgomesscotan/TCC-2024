app.controller('produtoController', function($scope, config, $ngConfirm) {

    let module = 'produto';

    $scope.grid = [];

    fetch(config.apiUrl + module)
    .then(rs => rs.json())
    .then(rs => {
        $scope.grid = rs; //rs pega os valores da api e retorna para grig[]
        console.log(`scope.grid: ${$scope.grid}`)  // aqui ele printa no console oq ele pegou
        $scope.$apply(); // Força Atualiza a vizualizacao
    })


    $scope.modal = function(data){
        
        if(data){
            $scope.forms = data;
        } else {
            $scope.forms = {status: 1};
        }

        let method = (data == null) ? 'POST' : 'PUT';
        let url = (data == null) ? config.apiUrl+module : config.apiUrl+module+'/'+data.id;

            $ngConfirm({
                title: 'Editar',
                contentUrl: './pages/cadastros/'+module+'/form.html',
                scope: $scope,
                theme: 'light',
                typeAnimated: true,
                closeAnimation: 'scale',
                columnClass: 'large',
                backgroundDismiss: false,
                closeIcon: true,
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
                                body: JSON.stringify($scope.forms)
                            })
                            .then(response => response.json())
                            .then(rs => {
                                
                                if(rs.error){
                                    $scope.msg = rs.error;
                                    $scope.alert = 'alert-danger';
                                } else {
                                    $scope.msg = 'Cadastro realizado com sucesso';
                                    $scope.alert = 'alert-success';

                                    setTimeout(() => {
                                        window.location.reload();
                                    }, 2000)
                                }

                                $scope.$apply();
                             
                            })
                            .catch(() => {
                                alert('ERROR')
                            })

                            return false;

                        }
                    },
                    cancel: {
                        text: 'Cancelar',
                        btnClass: 'btn-red'
                    }
                }
            })
        }


    $scope.del = function(id){
        $ngConfirm({
            title: 'Atenção',
            content: 'Tem certeza que deseja remover este registro',
            scope: $scope,
            type: 'red',
            theme: 'light',
            typeAnimated: true,
            closeAnimation: 'scale',
            columnClass: 'small',
            backgroundDismiss: false,
            closeIcon: true,
            buttons: {
                yes: {
                    text: 'Sim',
                    btnClass: 'btn-red',
                    action: function(){

                        fetch( config.apiUrl+module+'/'+id, {
                            method: 'DELETE',
                            headers:{
                                "Content-Type":"application/json",
                                "Accept":"application/json"
                            }
                        })
                        .then(response => response.json())
                        .then(rs => {
                            setTimeout(() => {
                                window.location.reload();
                            }, 1000)
                        })
                    }
                },
                cancel: {
                    text: 'Cancelar',
                    btnClass: 'btn-default'
                }
            }
        })
    }

});

