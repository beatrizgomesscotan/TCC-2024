app.controller('pedidoController', function($scope, config, $ngConfirm, $http, $timeout) {


    let module = 'pedido';
    $scope.clientes = []
    $scope.produtos = []
    $scope.usuarios = []
    $scope.forms = {
        clientes: null,
        produtos: null,
        usuarios: null
    }
    

    $scope.calcularTotalPedido = function () {
        let total = 0;
    
        // Verifica os produtos selecionados e calcula o total
        if ($scope.pedido && $scope.pedido.produtosSelecionados && $scope.pedido.quantidade) {
            console.log('joao', $scope.pedido.quantidades)
            $scope.pedido.produtosSelecionados.forEach(function (produto) {
                const quantidade = $scope.pedido.quantidades[produto.id] ? $scope.pedido.quantidades[produto.id] : 0 ; // Quantidade padrão é 0
                total += produto.precoCusto * quantidade;
            });
        }
        return total; // Retorna o total calculado
    };
    
    // tirar daqui
    // $scope.produtos = [
    //     { id: 1, name: 'Produto 1' },
    //     { id: 2, name: 'Produto 2' },
    //     { id: 3, name: 'Produto 3' },
    //     { id: 4, name: 'Produto 4' }
    // ];
    
    // $scope.selectedProdutos = [];
    // até aqui

    const api = {
        getClientes,
        getProdutos,
        getUsuarios,
        getPedidos
    }
    
    function activate() {
        api.getClientes()
        api.getProdutos()
        api.getUsuarios()
        api.getPedidos()
    }
    
    activate()

    function getClientes () {
        fetch("http://localhost:8080/cliente")
            .then(rs => rs.json()) // Converte a resposta da API para JSON
            .then(clientes => {
                $scope.clientes = clientes; // Armazena os clientes no $scope
                console.log(clientes)
            })
            .catch(err => console.error("Erro ao carregar clientes:", err)); // Loga erros
    }

    function getProdutos () {
        fetch("http://localhost:8080/produto")
            .then(rs => rs.json())
            .then(produtos => {
                $scope.produtos = produtos; // Adiciona os produtos
            })
            .catch(err => console.error("Erro ao carregar produtos:", err));
    }

    function getUsuarios () {
        fetch("http://localhost:8080/usuario")
            .then(rs => rs.json())
            .then(usuarios => {
                $scope.usuarios = usuarios; // Adiciona os usuários
            })
            .catch(err => console.error("Erro ao carregar usuários:", err));
    }

    function getPedidos () {
        fetch("http://localhost:8080/pedidos")
            .then(rs => rs.json())
            .then(pedidos => {
                $scope.grid = pedidos
                console.log('grid no getPedidos', $scope.grid)

                $scope.$apply()
            })
    }

    //Inseri ou atualiza os dados do cliente 
    //Daqui para baixo é meu modal
    $scope.modal = function(clientes, produtos, usuarios){   //tudo vai para o modal ele é o editar ou adicionar
        const data = { clientes, produtos, usuarios }
        
        if(clientes){
            $scope.forms.clientes = clientes;  //quando eu clicar em editar o modal recebe meus dados 
        } else if(produtos) {
            $scope.forms.produtos = produtos;
        } else if(usuarios) {
            $scope.forms.usuarios = usuarios;
        } else {
            $scope.forms = {status: 1}; //só para botaõ radio não fica vazio,(se eu clicar um ele desativa o outro)
        }

        console.log('forms', $scope.forms)

        //data == nullindica criação (método POST), enquanto a presença de dataindica edição (método PUT).
        //Após uma ação bem-sucedida, uma mensagem é exibida e a página é recarregada após 2 segundos para refletir as mudanças.
        let method = (data == null) ? 'POST' : 'PUT';
        let url = (data == null) ? config.apiUrl+module : config.apiUrl+module+'/'+data.id;
            console.log(data, "Cheguei aqui")
            $ngConfirm({
                title: '',
                contentUrl: './pages/movimento/'+module+'/form.html', 
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

