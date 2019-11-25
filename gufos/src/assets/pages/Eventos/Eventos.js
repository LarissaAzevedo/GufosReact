import React, { Component } from 'react';
import Footer from '../../components/Footer/footer'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';
import Header from '../../components/Header/header';

class Eventos extends Component {

    constructor() {
        super()
        this.state = {
            // parâmetros que sofrerão alteração (inputs) e lista
            listaEventos: [],
            // preciso criar um state para chamar as categorias a medida que forem chamadas e atualizadas
            listaCategorias: [],
            // tem um state chamado campo, mas não é mais chamado no código
            modalEvento: false,
            erroMsg: "",
            cadastrandoEvento: {
                titulo: "",
                categoriaId: "",
                evento_data: "",
                acesso_livre: ""
            }
        }
        // tem que ser dado bind dentro do construtor
        this.cadastrarEvento = this.cadastrarEvento.bind(this)
        this.deletarEvento = this.deletarEvento.bind(this)
    }

    // muda o estado do modal para fechá-lo
    toggle = () => {
        this.setState({
            modal: !this.state.modalEvento
        })
    }
    // carrega antes do DOM
    UNSAVE_componentWillMount() {
        // o título da página está adicionado corretamente por conta das rotas
        // document.title = this.props.titulo_pagina
        console.log("Carregando")
    }

    // depois do carregamento do DOM
    componentDidMount() {
        console.log("Carregado")
        this.listaAtualizadaEventos()
    }

    // quando há uma atualização/mudança
    componentDidUpdate() {
        console.log("Atualizando")
    }

    // quando a aplicação é encerrada
    componentWillUnmount() {
        console.log("Saindo")
        // meio inútil nesse caso
    }

    // GET - LISTAR
    listaAtualizadaEventos = () => {
        fetch("http://localhost:5000/api/evento")
            .then(response => response.json())
            .then(data => {
                this.setState({ listaEventos: data }),
                    console.log("Lista de Eventos: ", data)

            })
        // aqui eu posso adicionar o ícone de loading e o setTimeOut
    }

    // chama a lista atualizada de categorias para adicionar no evento
    listaAtualizadaCategorias = () => {
        fetch("http://localhost:5000/api/categoria")
            .then(response => response.json())
            .then(data => {
                this.setState({ listaCategorias: data }),
                    console.log("Categoria: ", data)
            })
    }

    // POST - ADICIONAR
    cadastrarEvento(event) {
        // recebe um event por conta do clique no botão do formulário
        // evita que a página dê refresh, poor ser um formulário
        event.preventDefault()
        console.log("Evento cadastrando: ", this.state.cadastrandoEvento)

        fetch("http://localhost:5000/api/evento", {
            method: "POST", //a qual método pertence
            headers: { //conteúdo do tipo json
                "Content-Type": "application/json"
            },
            // o que será exibido no body
            body: JSON.stringify({
                titulo: this.state.cadastrandoEvento.titulo,
                categoriaId: this.state.cadastrandoEvento.categoriaId,
                acesso_livre: this.state.cadastrandoEvento.acesso_livre === "1" ? "true" : "false",
                dataevento: this.state.cadastrandoEvento.dataevento
            })
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                this.listaEventos()
                //seta o novo valor da lista, basicamente o que será retornado na tabela
            }).catch(error => console.log(error))
    }

    // usado para os inserts do formulário
    // nomeprop é o value que ta no campo input
    atualizaEstado = (input) => {
        let nomeProp = input.target.name

        this.setState({
            cadastrandoEvento: {
                ...this.state.cadastrandoEvento,
                [input.target.name]: input.target.value
            }
        }, () => console.log(this.state.cadastrandoEvento[nomeProp]))
    }

    // DELETE - REMOVER
    deletarEvento = (id) => {
        console.log("Evento excluído")
        // ao tentar deletar uma outra categoria a mensagem
        this.setState({ erroMsg: "" })
        // precisa ser passado um id, por isso a arrow function e o bind não é necessário
        fetch("http://localhost:5000/api/evento" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
            // não precisa de body, já que está deletando
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                this.listaEventos()
                this.setState(() => ({ listaEventos: this.state.listaEventos }))
            })
            .catch(error => {
                console.log(error)
                this.setState({ erroMsg: "Não foi possível excluir este evento!" })
            })
    }
    // Logo antes do método PUT - ALTERAR, preciso adicionar as funções do modal
    // atualizaEditarModalTitulo(input) {
    //     this.setState({
    //         editarModalEventos: {
    //             // só nesse caso é usado o state do id, pq é automatico
    //             eventoId: this.state.editarModalEventos.eventoId,
    //             evento_titulo: this.state.editarModalEventos.tituloevento,
    //             evento_data: this.state.editarModalEventos.dataevento,
    //             acessolivre: this.state.editarModalEventos.acessoevento,
    //             tipoevento: this.state.editarModalEventos.tipoevento,
    //             evento_descricao: this.state.editarModalEventos.descricaoevento
    //         }
    //     })
    // }

    // adicionar os métodos do modal antes do put

    // PUT - ALTERAR
    // salvarAlterações = (event) => {
    //     // nesse caso, ele precisa do event por conta do botão submit
    //     event.preventDefault()
    //     fetch("http://localhost:5000/api/evento/" + this.state.editarModalEventos.eventoId, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(this.state.editarModalEventos)
    //     })
    //         .then(response => response.json())
    //         .then(response => {

    //         })
    //         .catch(error => console.log(error))

    //     setTimeout(() => {
    //         // chama a função da lista atualizada
    //         this.listaAtualizadaEventos()
    //     }, 1500);
    //     // função de fechar modal
    //     this.toggle()
    // }

    render() {
        return (
            <div>
                <Header />
                <div className="conteudoPrincipal">
                    <section className="conteudoPrincipal-cadastro">
                        <h1 className="conteudoPrincipal-cadastro-titulo">Eventos</h1>
                        <div className="container" id="conteudoPrincipal-lista">
                            <table id="tabela-lista">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Evento</th>
                                        <th>Data</th>
                                        <th>Acesso Livre</th>
                                        <th>Tipo do Evento</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody id="tabela-lista-corpo">
                                    {
                                        this.state.listaEventos.map(function (Eventos) {
                                            return (
                                                <tr key={Eventos.eventoId}>
                                                    <td>{Eventos.eventoId}</td>
                                                    <td>{Eventos.titulo}</td>
                                                    <td>{Eventos.evento_data}</td>
                                                    <td>{Eventos.acesso_livre}</td>
                                                    <td>
                                                        {/* <button onClick={e => this.atualizaEstado(Eventos)}>Alterar</button> */}
                                                        <button onClick={e => this.deletarEvento(Eventos.eventoId)}>Excluir</button>
                                                    </td>
                                                </tr>
                                            )
                                        }.bind(this))
                                    }
                                </tbody>
                            </table>
                        </div>

                        <div className="container" id="conteudoPrincipal-cadastro">
                            <h2 className="conteudoPrincipal-cadastro-titulo">Cadastrar Evento</h2>
                            <form onSubmit={this.cadastrarEvento}>
                                <div className="container">
                                    <input
                                        type="text"
                                        id="evento__titulo"
                                        placeholder="título do evento"
                                        value={this.state.cadastrandoEvento.titulo}
                                        onChange={this.atualizaEstado}
                                        name="titulo"
                                    />

                                    <input type="text" 
                                        id="evento__data" 
                                        placeholder="dd/MM/yyyy"
                                        value={this.state.cadastrandoEvento.dataevento}
                                        onChange={this.atualizaEstado} 
                                        name="dataevento"
                                        />
                                    <select id="option__acessolivre" name="acesso_livre" onChange={this.atualizaEstado}>
                                        <option value="1">Livre</option>
                                        <option value="0">Restrito</option>
                                    </select>
                                    <select id="option__tipoevento" name="categoriaId" onChange={this.atualizaEstado}>
                                        <option value="0" disabled>Tipo do Evento</option>
                                        {
                                            this.state.listaCategorias.map(function (categoria){
                                                return(
                                                <option value={categoria.categoriaId}>{categoria.titulo}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    
                                </div>
                                <button
                                    className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro" type="submit"
                                >
                                    Cadastrar
                        </button>
                            </form>
                        </div>
                    </section>
                    <Footer />
                </div>
            </div>
        );
    }

}

export default Eventos;