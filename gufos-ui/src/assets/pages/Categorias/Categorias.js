import React, { Component } from 'react';
//importando o componente do footer
import Footer from '../../components/Footer/footer';
import { Link } from 'react-router-dom';

class Categoria extends Component {

    constructor() {
        super();
        this.state = {
            lista: [],
            nome: ""
        }

        //incorporando os contextos dentro do método construtor, que nem fizemos nos models em C#
        //bind trabalha com os contextos, saber identificar de onde vem
        this.cadastrarCategoria = this.cadastrarCategoria.bind(this);
    }

    UNSAVE_componentWillMount() {
        // antes do carregamento do dom - início do ciclo de vida
        document.title = this.props.titulo_pagina;
        console.log("Carregando")
    }

    componentDidMount() {
        // após o carregamento
        console.log("Carregado")
        console.log(this.state.lista)
        this.listaAtualizada()
    }

    componentDidUpdate() {
        console.log("Atualizando")
    }

    componentWillUnmount() {
        //fim do ciclo de vida
        console.log("Saindo")
    }

    listaAtualizada = () => {
        fetch("http://localhost:5000/api/categoria")
            .then(response => response.json())
            .then(data => this.setState({ lista: data }))
    }

    cadastrarCategoria(event) {
        event.preventDefault();
        console.log("Cadastrando");
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
                this.setState(() => ({ lista: this.state.lista }))
            })
            .catch(error => console.log(error))
    }

    //atualiza o nome cadastrado
    atualizaNome(input) {
        this.setState({ nome: input.target.value })
    }

    render() {
        return (
            <div>
                <Link to='/'>Voltar</Link>
                <main className="conteudoPrincipal">
                    <section className="conteudoPrincipal-cadastro">
                        <h1 className="conteudoPrincipal-cadastro-titulo">Categorias</h1>
                        <div className="container" id="conteudoPrincipal-lista">
                            <table id="tabela-lista">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Título</th>
                                    </tr>
                                </thead>

                                <tbody id="tabela-lista-corpo">

                                    {
                                        this.state.lista.map(function (Categoria) {
                                            return (
                                                // key exige que tenham ids unicos
                                                <tr key={Categoria.categoriaId}>
                                                    <td>{Categoria.categoriaId}</td>
                                                    <td>{Categoria.titulo}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
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
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        );
    }
}

export default Categoria;