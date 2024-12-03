app.controller('produtoController', function($scope, config, $ngConfirm, $http) {

    let module = 'produto';
    $scope.grid = []; //Array vazio

    //fetch realiza uma requisição GET para carregar os dados do cliente $scope.grid com a resposta da API.
    fetch(config.apiUrl + module) 
    .then(rs => rs.json())
    .then(rs => {
        $scope.grid = rs; //rs pega os valores da api e retorna para grig[]
        console.log("rs",rs)
        console.log(`scope.grid: ${$scope.grid}`)  // aqui ele printa no console oq ele pegou
        $scope.$apply(); // Força Atualiza a vizualizacao
    })


    //Inseri ou atualiza os dados do cliente
    $scope.modal = function(data){   //tudo vai para o modal ele é o editar ou adicionar
        
        if(data){
            $scope.forms = data;  //quando eu clicar em editar o modal recebe meus dados 
        } else {
            $scope.forms = {status: 1}; //só para botaõ radio não fica vazio,(se eu clicar um ele desativa o outro)
        }

        //data == nullindica criação (método POST), enquanto a presença de dataindica edição (método PUT).
        //Após uma ação bem-sucedida, uma mensagem é exibida e a página é recarregada após 2 segundos para refletir as mudanças.
        let method = (data == null) ? 'POST' : 'PUT';
        let url = (data == null) ? config.apiUrl+module : config.apiUrl+module+'/'+data.id;
            console.log(data, "Cheguei aqui")
            $ngConfirm({
                title: 'Editar',
                contentUrl: './pages/cadastros/'+module+'/form.html', 
                scope: $scope, //aqui no escopo ele recebe  don(memoria do brauser)
                theme: 'light', // tema
                typeAnimated: true, // para ver se tem animação ou não
                closeAnimation: 'scale', // tipo de animação que vai ter no modal
                columnClass: 'large',//tamanho do modal
                backgroundDismiss: false,//se clicar fora vai fechar sozinho
                closeIcon: true,//ter icone de fechar ou não (X)
                buttons: {
                    save: {
                        text: 'Salvar',
                        btnClass: 'btn-green',
                        action: function(){
                          console.log(data,"Data")

                          // se não tiver o fomulário ou se o formulaio não for valido 
                          if (!$scope.produtoForm || !$scope.produtoForm.$valid) {
                            alert('Por favor, preencha todos os campos obrigatórios.');
                            return false;
                        }
                        
                        // Validação adicional para garantir que preços não sejam negativos
                        if ($scope.forms.precoCusto < 0 || $scope.forms.precoVenda < 0) {
                            alert('Os preços não podem ser negativos.');
                            return false;
                        }
                        


                          //aqui ele está bando pau , ele ta fazendo um GET ao invest do POST
                          //pau em get , post e put , delite funciona
                            fetch(url,{  //aqui ele chama a rota do back end
                                method: method, // post ou put
                                headers:{
                                    "Content-Type":"application/json", // envia informação do tipo JSON para o backend modula o reder(CONTEUDO)
                                    "Accept":"application/json" // aceita informação do tipo json
                                },
                                body: JSON.stringify($scope.forms) // O body recebe todos os dados que eu passei,tudo que vem no forms
                            },
                            console.log($scope.forms)
                        
                        )
                            .then(response => response.json())
                            .then(rs => {
                                if(rs.error){
                                    $scope.msg = rs.error;
                                    $scope.alert = 'alert-danger';
                                } else {
                                    $scope.msg = 'Cadastro realizado com sucesso';
                                    $scope.alert = 'alert-success';

                                         window.location.reload();
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



        //Função de delite
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
                        .then(() => window.location.reload())                                
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

