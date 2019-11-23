import React, { Component } from 'react';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
// import { Link } from 'react-router-dom';
// import dos componentes da biblioteca Material Design Bootstrap React 
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';

class Categoria extends Component {

    // obrigatório, pois ele que cria os states
    constructor() {
        // super é usado para manipular os states, herdados de Component - não é possível usar setState sem ele
        // aqui ficam todos os objetos que sofrerão modificação
        super();
        this.state = {
            // lista inicial vazia, tanto por tratamento de erros como para ser preenchida de acordo com as requisições
            lista: [],
            // parâmetro do objeto que sofrerá alterações no método post
            nome: "",
            // state do loading
            loading: false,

            // mensagem de erro para o usuário que tentar deletar uma categoria que já tem evento
            erroMsg: "",
            modal: false,
            editarModal: {
                categoriaId: "",
                titulo: ""
            }
        }

        // bind dentro do construtor em casos de não haver uso de arrow function
        // => e () : síntaxe diferente

        //incorporando os contextos dentro do método construtor, que nem fizemos nos models em C#
        //bind trabalha com os contextos, saber identificar de onde vem
        this.cadastrarCategoria = this.cadastrarCategoria.bind(this);
        this.deletarCategoria = this.deletarCategoria.bind(this);
    }

    //automaticamente muda o estado do modal para falso caso seja true
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    UNSAVE_componentWillMount() {
        // antes do carregamento do dom - início do ciclo de vida
        document.title = this.props.titulo_pagina;
        console.log("Carregando")
    }

    componentDidMount() {
        // é chamado após o carregamento do DOM
        // quando a página é carregada, exibe os dados do banco, a lista é chamada e aparece
        console.log("Carregado")
        console.log(this.state.lista)
        this.listaAtualizada()
    }

    componentDidUpdate() {
        //chamado assim que ocorre uma atualização/mudança
        console.log("Atualizando")
    }

    componentWillUnmount() {
        //fim do ciclo de vida, chamado antes de um elemento ser desmontado/excluído
        console.log("Saindo")
    }

    // GET - Listar
    // o map que está lá embaixo foi usado para listar o que foi chamado nessa requisição
    listaAtualizada = () => {

        //habilita o ícone de carregando
        this.setState({ loading: true });


        fetch("http://localhost:5000/api/categoria")
            .then(response => response.json())
            .then(data => this.setState({ lista: data }))

        // desabilita o ícone após dois segundos
        setTimeout(() => {
            this.setState({ loading: false });

        }, 2000);
    }

    // para o post, é preciso ter um formulario para usar a função onSubmit
    // POST - Cadastrar
    cadastrarCategoria(event) {
        // impedir que a página seja recarregada (impede refresh)
        event.preventDefault();
        console.log("Cadastrando");
        // mostra o que está sendo cadastrado no console - orientação apenas - 
        console.log(this.state.nome);

        fetch("http://localhost:5000/api/categoria", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ titulo: this.state.nome })
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                this.listaAtualizada()
                // o id não foi adicionado por ser auto-incremento, não será adicionado nem cadastrado
                this.setState(() => ({ lista: this.state.lista }))
            })
            .catch(error => console.log(error)
            )
    }

    deletarCategoria = (id) => {
        console.log("Excluindo")

        // ao tentar deletar uma categoria, o estado é setado para false
        this.setState({ erroMsg: "" })

        fetch("http://localhost:5000/api/categoria/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
            // não há necessidade de chamar o body por não estar exibindo nada
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                this.listaAtualizada()
                this.setState(() => ({ lista: this.state.lista }))
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    erroMsg: "Não é possível excluir essa categoria. Verifique se não há eventos que a utilizem."
                })

            })
    }

    // PUT - ALTERAR
    alterarCategoria = (categoria) => {
        console.log(categoria)

        this.setState({
            editarModal: {
                categoriaId: categoria.categoriaId,
                titulo: categoria.titulo
            },
        })
        // abre modal
        this.toggle()

    }

    salvarAlteracoes = (event) => {
        // impede refresh (formulário)
        event.preventDefault()
        fetch("http://localhost:5000/api/categoria/" + this.state.editarModal.categoriaId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.editarModal)
        })
            .then(response => response.json())
            .then(response => {
            })
            .catch(error => console.log(error)
            )

        // ficou fora da requisição para atualizar assim que fechar o modal
        setTimeout(() => {
            // console.log(response)
            this.listaAtualizada()
        }, 1500);
        // fechar modal
        this.toggle()
    }

    //altera o input de cadastrado

    atualizaNome(input) {
        this.setState({ nome: input.target.value })
    }

    // de ótimo uso nos vários inputs existentes no form
    // adicionar a chamada de classe no input
    atualizaEstado(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    atualizaEditarModalTitulo(input) {
        this.setState({
            // o setState tem um objeto com duas propriedades, por isso que ele não aparecia no título do modal
            // quanado ele era chamado, a função tinha apenas as propriedades, no caso, precisa de um objeto com essas props
            editarModal: {
                categoriaId: this.state.editarModal.categoriaId,
                titulo: input.target.value
            }
        })
    }

    render() {
        return (
            <div>
                {/* <Link to='/'>Voltar</Link> */}
                <Header />
                <main className="conteudoPrincipal">
                    <section className="conteudoPrincipal-cadastro">
                        <h1 className="conteudoPrincipal-cadastro-titulo">Categorias</h1>
                        <div className="container" id="conteudoPrincipal-lista">
                            <table id="tabela-lista">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Título</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>

                                <tbody id="tabela-lista-corpo">
                                    {
                                        // o contexto da tb categoria é chamado aqui
                                        // recebe os dados do banco, no caso a lista de categoria
                                        this.state.lista.map(function (Categoria) {
                                            return (
                                                // cada linha do JSX precisa de um ID único, por isso essa primeira linha
                                                <tr key={Categoria.categoriaId}>
                                                    <td>{Categoria.categoriaId}</td>
                                                    <td>{Categoria.titulo}</td>
                                                    <td>
                                                        {/* primeiro botão chama o modal */}
                                                        <button onClick={e => this.alterarCategoria(Categoria)}>Alterar</button>
                                                        <button onClick={e => this.deletarCategoria(Categoria.categoriaId)}>Excluir</button>
                                                    </td>
                                                </tr>
                                            )
                                            // o bind é colocado aqui pq vincula o contexto do map que é onde está a categoria
                                        }.bind(this))
                                    }
                                </tbody>
                            </table>
                            <br></br>

                            {/* se houver uma mens de erro/ se houver carregamento */}
                            {this.state.erroMsg && <div className="text-danger">{this.state.erroMsg}</div>}

                            {/* verifica se load for true, ele adiciona o icone rodando */}
                            {/* fa-spin faz ele girar, fa-4x modifica o tamanho e blue-text deixa ele azul */}
                            {this.state.loading && <i className="fas fa-spinner fa-spin fa-2x blue-text"></i>}
                        </div>

                        <div className="container" id="conteudoPrincipal-cadastro">
                            <h2 className="conteudoPrincipal-cadastro-titulo">
                                Cadastrar Tipo de Evento
                            </h2>
                            <form onSubmit={this.cadastrarCategoria} >
                                <div className="container">
                                    <input
                                        type="text"
                                        id="nome-tipo-evento"
                                        placeholder="tipo do evento"
                                        // value é o que o input recebe, então é esse o componente com estado
                                        value={this.state.nome}
                                        // o estado estaria fixo se não houvesse o onChange, logo, bloquearia o input
                                        onChange={this.atualizaNome.bind(this)}
                                    />
                                    <button
                                        className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro"
                                    >
                                        Cadastrar
                                    </button>
                                </div>
                            </form>
                            <MDBContainer>
                                {/* <MDBBtn onClick={this.toggle}>Modal</MDBBtn> */}
                                <form onSubmit={this.salvarAlteracoes}>
                                    {/* necessário englobar em um form para usar a função submit */}
                                    <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                                        <MDBModalHeader toggle={this.toggle}>Editar - {this.state.editarModal.titulo} </MDBModalHeader>
                                        <MDBModalBody>
                                            <MDBInput label="Categoria" value={this.state.editarModal.titulo}
                                                onChange={this.atualizaEditarModalTitulo.bind(this)} />
                                        </MDBModalBody>
                                        <MDBModalFooter>
                                            <MDBBtn color="secondary" onClick={this.toggle}>Fechar</MDBBtn>
                                            <MDBBtn color="primary" type="submit">Salvar</MDBBtn>
                                        </MDBModalFooter>
                                    </MDBModal>
                                </form>
                            </MDBContainer>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        );
    }
}

export default Categoria;