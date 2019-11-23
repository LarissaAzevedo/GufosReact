import React, { Component } from 'react';
import Footer from '../../components/Footer/footer'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';
import Header from '../../components/Header/header';
// import { func } from 'prop-types';


class Eventos extends Component {

    constructor() {
        super()
        this.state = {
            // parâmetros que sofrerão alteração (inputs) e lista
            listaeventos: [],
            evento_titulo: "",
            evento_data: '',
            acessolivre: "",
            tipoevento: "",
            evento_descricao: "",
            modalEvento: false,
            editarModalEventos: {
                eventoId: "",
                evento_titulo: "",
                evento_data: '',
                acessolivre: "",
                tipoevento: "",
                evento_descricao: ""
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
        document.title = this.props.titulo_pagina
        console.log("Carregando") //só pra saber que é quando a pag carrega
    }

    // GET - LISTAR
    listaAtualizadaEventos = () => {
        fetch("http://localhost:5000/api/evento")
            .then(response => response.json())
            .then(data => this.setState({ listaeventos: data }))

        // aqui eu posso adicionar o ícone de loading e o setTimeOut

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

    // POST - ADICIONAR
    cadastrarEvento(event) {
        // recebe um event por conta do clique no botão do formulário
        // evita que a página dê refresh, poor ser um formulário
        event.preventDefault()
        this.atualizaEstado()

        // fetch("http://localhost:5000/api/evento", {
        //     method: "POST", //a qual método pertence
        //     headers: { //conteúdo do tipo json
        //         "Content-Type": "application/json"
        //     },
        //     // o que será exibido no body
        //     body: JSON.stringify({ tituloevento: this.state.editarModalEventos })
        // })
        //     .then(response => response.json())
        //     .then(response => {
        //         this.listaAtualizadaEventos() //chama a lista atualizada
        //         this.setState(() => ({ listaeventos: this.state.listaeventos }))
        //         //seta o novo valor da lista, basicamente o que será retornado na tabela
        //     }).catch(error => console.log(error))
    }

    // DELETE - REMOVER
    deletarEvento = (id) => {
        // precisa ser passado um id, por isso a arrow function e o bind não é necessário

        //depois adicionar a mensagem de erro aqui - não funcionou lá mas dps eu vejo o pq
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
                this.listaAtualizadaEventos()
                this.setState(() => ({ listaeventos: this.state.listaeventos }))
            })
            .catch(error => {
                console.log(error)
            })
        // aqui ficaria a mudança de estado da mensagem de erro ao tentar excluir um evento com ligação

    }
    // Logo antes do método PUT - ALTERAR, preciso adicionar as funções do modal
    atualizaEditarModalTitulo(input) {
        this.setState({
            editarModalEventos: {
                // só nesse caso é usado o state do id, pq é automatico
                eventoId: this.state.editarModalEventos.eventoId,
                evento_titulo: this.state.editarModalEventos.tituloevento,
                evento_data: this.state.editarModalEventos.dataevento,
                acessolivre: this.state.editarModalEventos.acessoevento,
                tipoevento: this.state.editarModalEventos.tipoevento,
                evento_descricao: this.state.editarModalEventos.descricaoevento
            }
        })
    }

    // adicionar os métodos do modal antes do put

    // PUT - ALTERAR
    salvarAlterações = (event) => {
        // nesse caso, ele precisa do event por conta do botão submit
        event.preventDefault()
        fetch("http://localhost:5000/api/evento/" + this.state.editarModalEventos.eventoId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.editarModalEventos)
        })
            .then(response => response.json())
            .then(response => {

            })
            .catch(error => console.log(error))

        setTimeout(() => {
            // chama a função da lista atualizada
            this.listaAtualizadaEventos()
        }, 1500);
        // função de fechar modal
        this.toggle()
    }

    // chama a lista atualizada de categorias para adicionar no evento
    listaAtualizadaCategorias = () => {

        //habilita o ícone de carregando
        this.setState({ loading: true });


        fetch("http://localhost:5000/api/categoria")
            .then(response => response.json())
            .then(data => this.setState({ lista: data }))

    }

    // usado para os inserts do formulário
    atualizaEstado = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

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
                                        this.state.listaeventos.map(function (Eventos) {
                                            return (
                                                <tr key={Eventos.eventoId}>
                                                    <td>{Eventos.eventoId}</td>
                                                    <td>{Eventos.evento_titulo}</td>
                                                    <td>{Eventos.evento_data}</td>
                                                    <td>{Eventos.acessolivre}</td>
                                                    <td>{Eventos.tipoevento}</td>
                                                    <td>
                                                        <button onClick={e => this.atualizaEstado(Eventos)}>Alterar</button>
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
                                        onChange={this.atualizaEstado.bind(this)}
                                    />

                                    <input type="text" id="evento__data" placeholder="dd/MM/yyyy"
                                        onChange={this.atualizaEstado.bind(this)} />
                                    <select id="option__acessolivre">
                                        <option value="1">Livre</option>
                                        <option value="0">Restrito</option>
                                    </select>
                                    <select id="option__tipoevento">
                                        <option value={this.listaAtualizadaCategorias.bind(this)} disabled>Tipo do Evento</option>
                                    </select>
                                    <textarea
                                        rows="3"
                                        cols="50"
                                        placeholder="descrição do evento"
                                        id="evento__descricao"
                                    ></textarea>
                                </div>
                                <button
                                    className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro"
                                >
                                    Cadastrar
                        </button>
                            </form>
                            <MDBContainer>
                                {/* <MDBBtn onClick={this.toggle}>Modal</MDBBtn> */}
                                <form onSubmit={this.salvarAlteracoes}>
                                    {/* necessário englobar em um form para usar a função submit */}
                                    <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                                        <MDBModalHeader toggle={this.toggle}>Editar - {this.state.editarModalEventos.titulo}
                                        </MDBModalHeader>
                                        <MDBModalBody>
                                            <MDBInput label="Evento" value={this.state.editarModalEventos.titulo}
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
                    <Footer />
                </div>
            </div>
        );
    }

}

export default Eventos;