import React, { Component } from 'react';
import Footer from '../../components/Footer/footer'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';


class Eventos extends Component {

    constructor() {
        super()
        this.state = {
            // parâmetros que sofrerão alteração (inputs) e lista
            listaeventos: [
                {
                    eventoId: 1,
                    tituloevento: "aprenda",
                    dataevento: '25/04/2019',
                    acessoevento: "livre",
                    tipoevento: "workshop",
                    descricaoevento: "Vai ser legal, tem fini"
                }
            ],
            // tituloevento: "",
            // dataevento: "",
            // acessoevento: "",
            // tipoevento: "",
            // descricaoevento: ""
        }
        // tem que ser dado bind dentro do construtor
        this.cadastrarEvento = this.cadastrarEvento.bind(this)
        this.deletarEvento = this.deletarEvento.bind(this)
    }
    // carrega antes do DOM
    UNSAVE_componentWillMount() {
        // o título da página está adicionado corretamente por conta das rotas
        document.title = this.props.titulo_pagina
        console.log("Carregando") //só pra saber que é quando a pag carrega
    }

    // depois do carregamento do DOM
    componentDidMount() {
        console.log("Carregado")
        // tem que chamar a função que exibe a lista atualizada, mas ainda não a fiz
        // tem que retornar a lista atualizada tbm
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

    // início dos métodos

    // GET - LISTAR
    listaAtualizadaEventos = () => {
        fetch("http://localhost:5000/api/evento")
            .then(response => response.json())
            .then(dado => this.setState({ listaeventos: dado }))

        // aqui eu posso adicionar o ícone de loading e o setTimeOut

    }

    // POST - ADICIONAR
    cadastrarEvento(event) {
        // recebe um event por conta do clique no botão do formulário
        // evita que a página dê refresh, poor ser um formulário
        event.preventDefault()

        fetch("http://localhost:5000/api/evento", {
            method: "POST", //a qual método pertence
            headers: { //conteúdo do tipo json
                "Content-Type": "application/json"
            },
            // o que será exibido no body
            body: JSON.stringify({ tituloevento: this.state.listaeventos })
        })
            .then(response => response.json())
            .then(response => {
                this.listaAtualizadaEventos() //chama a lista atualizada
                this.setState(() => ({ lista: this.state.listaeventos }))
                //seta o novo valor da lista, basicamente o que será retornado na tabela
            }).catch(error => console.log(error))
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
                this.setState(() => ({ lista: this.state.listaeventos }))
            })
            .catch(error => {
                console.log(error)
            })
        // aqui ficaria a mudança de estado da mensagem de erro ao tentar excluir um evento com ligação

    }
    // Logo antes do método PUT - ALTERAR, preciso adicionar as funções do modal
    atualizaEditarModalTitulo(input) {
        this.setState({
            editarModal: {
                // só nesse caso é usado o state do id, pq é automatico
                eventoId: this.state.editarModal.eventoId,
                tituloevento: this.state.editarModal.tituloevento,
                dataevento: this.state.editarModal.dataevento,
                acessoevento: this.state.editarModal.acessoevento,
                tipoevento: this.state.editarModal.tipoevento,
                descricaoevento: this.state.editarModal.descricaoevento
            }
        })
    }

    // Funções recorrentes a alteração de um evento, o método vem a seguir
    alterarEvento = (evento) => {
        // mesmo caso do delete, ele passa um parâmetro, por isso o uso da arrow function

        // vou ter que usar um modal igual a página categoria para ter onde alterar os dados
        // sendo assim vou ter que colocar os botões e ações tbm grrr
    }

    // adicionar os métodos do modal antes do put

    // PUT - ALTERAR
    // salvarAlterações = (event) => {
    //     // nesse caso, ele precisa do event por conta do botão submit
    //     event.preventDefault()
    //     fetch("http://localhost:5000/api/evento/" + id (ta errado), {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type" : "application/json"
    //         },
    //         body: JSON.stringify(this.state.editarModal)
    //     })
    //     .then(response => response.json())
    //     .then(response => {

    //     })
    //     .catch(error => console.log(error))

    //     setTimeout(() => {
    //         // chama a função da lista atualizada
    //         this.listaAtualizadaEventos()
    //     }, 1500);
    //     // função de fechar modal
    //     this.toggle()
    // }

    render() {
        return (
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
                                </tr>
                            </thead>
                            <tbody id="tabela-lista-corpo">
                                {
                                    this.state.lista.map(function (evento) {
                                        return (
                                            <tr key={evento.eventoId}>
                                                <td>{evento.eventoId}</td>
                                                <td>{evento.tituloevento}</td>
                                                <td>{evento.dataevento}</td>
                                                <td>{evento.acessoevento}</td>
                                                <td>{evento.tipoevento}</td>
                                                <td>{evento.descricaoevento}</td>
                                                <td>
                                                    <button onClick={e => this.deletarEvento(evento.eventoId)}>Excluir</button>
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
                                />

                                {/* ter que fazer função para todos esses inputs e selects é foda */}
                                <input type="text" id="evento__data" placeholder="dd/MM/yyyy" />
                                <select id="option__acessolivre">
                                    <option value="1">Livre</option>
                                    <option value="0">Restrito</option>
                                </select>
                                <select id="option__tipoevento">
                                    <option value="0" disabled>Tipo do Evento</option>
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
                                onclick="cadastrarEvento()"
                            >
                                Cadastrar
                        </button>
                        </form>
                        <MDBContainer>
                            <MDBBtn onClick={this.toggle}>Modal</MDBBtn>
                            <form onSubmit={this.salvarAlteracoes}>
                                {/* necessário englobar em um form para usar a função submit */}
                                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                                    <MDBModalHeader /*toggle={this.toggle}*/>Editar - {/*this.state.editarModal.titulo*/}
                                    </MDBModalHeader>
                                    <MDBModalBody>
                                        <MDBInput label="Evento" value={this.state.editarModal.titulo}
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
        );
    }
}

export default Eventos;