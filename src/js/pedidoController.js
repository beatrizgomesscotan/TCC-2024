app.controller('pedidoController', function ($scope, config, $ngConfirm, $http, $timeout) {


    let module = 'pedidos';
    $scope.clientes = []
    $scope.produtos = []
    $scope.usuarios = []
    $scope.forms = {
        clientes: null,
        produtos: null,
        usuarios: null
    }
    $scope.usuarioSelecionado = null

    $scope.pegaIdUsuario = function () {

        console.log('usuarioSelecionado', $scope.usuarioSelecionado)
    }

    $scope.clienteSelecionado = null


    $scope.calcularTotalPedido = function () {
        let total = 0;

        console.log($scope.pedido.produtosSelecionados)
        // Verifica os produtos selecionados e calcula o total
        if ($scope.pedido && $scope.pedido.produtosSelecionados && $scope.pedido.quantidades) {
            $scope.pedido.produtosSelecionados.forEach(function (produto) {
                const quantidade = $scope.pedido.quantidades[produto.id] ? $scope.pedido.quantidades[produto.id] : 0; // Quantidade padrão é 0
                total += produto.precoVenda * quantidade;
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

    function getClientes() {
        fetch("http://localhost:8080/cliente")
            .then(rs => rs.json()) // Converte a resposta da API para JSON
            .then(clientes => {
                $scope.clientes = clientes; // Armazena os clientes no $scope
                console.log(clientes)
            })
            .catch(err => console.error("Erro ao carregar clientes:", err)); // Loga erros
    }

    function getProdutos() {
        fetch("http://localhost:8080/produto")
            .then(rs => rs.json())
            .then(produtos => {
                $scope.produtos = produtos; // Adiciona os produtos
            })
            .catch(err => console.error("Erro ao carregar produtos:", err));
    }

    function getUsuarios() {
        fetch("http://localhost:8080/usuario")
            .then(rs => rs.json())
            .then(usuarios => {
                $scope.usuarios = usuarios; // Adiciona os usuários
            })
            .catch(err => console.error("Erro ao carregar usuários:", err));
    }

    function getPedidos() {
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
    $scope.modal = function (pedido) {   //tudo vai para o modal ele é o editar ou adicionar
        const data = pedido


        console.log('forms', $scope.forms)

        //data == nullindica criação (método POST), enquanto a presença de dataindica edição (método PUT).
        //Após uma ação bem-sucedida, uma mensagem é exibida e a página é recarregada após 2 segundos para refletir as mudanças.
        let method = (data == null) ? 'POST' : 'PUT';
        let url = (data == null) ? config.apiUrl + module : config.apiUrl + module + '/' + data.idPedido;
        console.log(data, "Cheguei aqui")
        $ngConfirm({
            title: '',
            contentUrl: './pages/movimento/pedido/form.html',
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
                    action: function () {
                        console.log(data, "Data")

                        // Verifica se um cliente foi selecionado
                        if (!$scope.clienteSelecionado) {
                            alert("Por favor, selecione um cliente antes de continuar.");
                            return false; // Impede o fechamento do modal
                        }

                        // Verifica se um usuário foi selecionado
                        if (!$scope.usuarioSelecionado) {
                            alert("Por favor, selecione um usuário antes de continuar.");
                            return false; // Impede o fechamento do modal
                        }

                        // Verifica se ao menos um produto foi selecionado
                        if (!$scope.pedido || !$scope.pedido.produtosSelecionados || $scope.pedido.produtosSelecionados.length === 0) {
                            alert("Por favor, selecione ao menos um produto antes de continuar.");
                            return false; // Impede o fechamento do modal
                        }

                        //crio um avaria produto e ela percorre por cada produto do meu pelo meu array  
                        // Verifica se todas as quantidades dos produtos selecionados foram preenchidas
                        //primeiro verifico se a minha variavel produto não é nula ou seja ela é nula pq não tem quantidade
                        //depois verifico se ela não tem quantidade daquele produto especifico
                        //depois verifico se a quantidade não é menor que 0
                        for (let produto of $scope.pedido.produtosSelecionados) {
                            if (!$scope.pedido.quantidades || !$scope.pedido.quantidades[produto.id] || $scope.pedido.quantidades[produto.id] < 0) {
                                alert("Por favor, preencha a quantidade para o produto: " + produto.nome + " antes de continuar.");
                                return false; // Impede o fechamento do modal
                            }
                        }

                        
                        //estou criando uma cosntante produtoId
                        //o MAP  passa por todos os produtos e cria uma lista , e o return retorna os ID DOS Produtos ,
                        // a Variavel produtosId recebe o id dos produtos  (return)
                        const produtosId = $scope.pedido.produtosSelecionados.map((produto) => {
                            return produto.id
                        })


                        //Apos eu montar uma lista de produtos com id
                        //Crio outro MAP que passa por cada id do outro MAP
                        //Assim que ele vai passando por cada ID ele vai criando um objeto nomeproduto:id
                        //Após isso a variavel Itens recebe esse obejto 

                        const itens = produtosId.map((id) => {
                            return {
                                idProduto: id,
                                quantidade: $scope.pedido.quantidades[id]
                            }
                        })

                        fetch(url, {  //aqui ele chama a rota do back end
                            method: method, // post ou put
                            headers: {
                                "Content-Type": "application/json", // envia informação do tipo JSON para o backend modula o reder(CONTEUDO)
                                "Accept": "application/json" // aceita informação do tipo json
                            },
                            body: JSON.stringify(
                                {
                                    idCliente: $scope.clienteSelecionado,
                                    idUsuario: $scope.usuarioSelecionado,
                                    itens: itens
                                }
                            )
                        },
                            console.log($scope.forms)

                        )
                            .then(response => response.json())
                            .then(rs => {
                                if (rs.error) {
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
                    btnClass: 'btn-red',
                    action: function () {

                        if($scope.pedido){
                            $scope.clienteSelecionado = null,
                            $scope.usuarioSelecionado = null,
                            $scope.pedido.produtosSelecionados = null,
                            $scope.pedido.quantidades = null
                            itens = null
                        }

                    }
                }
            }
        })
    }



    //Função de delite
    $scope.del = function (id) {
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
                    action: function () {

                        fetch(config.apiUrl + module + '/' + id, {
                            method: 'DELETE',
                            headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json"
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

    // $scope.formatarMoeda = function (valor) {
    //     return Number(valor || 0).toLocaleString("pt-BR", {
    //         style: "currency",
    //         currency: "BRL",
    //     });
    // };
    

});

