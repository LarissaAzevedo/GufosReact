import React, { Component } from 'react'
import '../../css/login.css'
import '../../css/flexbox.css'
import '../../css/style.css'
import Logo from '../../img/icon-login.png'
import Axios from 'axios'
import Header from '../../components/Header/header'
import { parseJWT } from '../../services/auth'
import api from '../../services/api'

class Login extends Component {
    constructor() {
        super()

        this.state = {
            // é importante o value do campo input ter o mesmo nome do state
            email: "",
            senha: "",
            erroMensagem: "",
            // flag verificando o andamento da requisição
            isLoading: false 
        }
        this.props = {}
    }

    // value: valor inserido no input
    // name: nome do campo

    // no caso, o value é atributo do input 
    atualizaEstado = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    realizaLogin = (event) => {
        event.preventDefault()

        this.setState({ erroMensagem: "" })
        // define que uma requisição está em andamento
        this.setState({ isLoading: true })
        // obj config encurta todo aquele trabalho de criar as configurações com fetch

        // comentamos para ver o axios funcionando
        // let config = {
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Access-Control-Allow-Origin": "*" //CORS
        //     }
        // }

        // Axios.post("http://localhost:5000/api/login", {
        //     email: this.state.email,
        //     senha: this.state.senha
        // }, config)

        let usuario = {
            email : this.state.email,
            senha: this.state.senha
        }

        // usando api
        // trocar em todas as requisições
        api.post("/login", {
            email: this.state.email,
            senha: this.state.senha
        })
        
            // json fal automaticamente a conversão para json
            .then(response => {
                // console.log("Retorno do login: ", Response)

                // caso a requisição retorne um status code 200 salva o token no localStorage
                if (response.status === 200) {
                    localStorage.setItem('usuario-gufos', response.data.token)
                    // se o token foi gerado, a requisição terminou
                    this.setState({ isLoading: false })

                    // exibe somente o token
                    console.log("Meu token é " + response.data.token)

                    // recebe o payload do token
                    var base64 = localStorage.getItem('usuario-gufos').split('.')[1]
                    // exibe no console
                    console.log(base64)

                    // exibe no console convetido para string
                    console.log(window.atob(base64))

                    // exibe no console convertido para json
                    console.log(JSON.parse(window.atob(base64)))

                    // exibe o tipo de usuário logado
                    console.log(parseJWT().Role)

                    // sabendo o tipo de usuário logado, é possível fazer rediecionamento de páginas

                    if (parseJWT().Role === "Administrador") {
                        // definindo a rota de acordo com o tipo de usuário logado]/o0
                        this.props.history.push('/categorias')
                    } else {
                        this.props.history.push('/eventos')
                    }
                }
            })
            .catch(erro => {
                console.log("Erro: ", erro)
                this.setState({ erroMensagem: 'E-mail ou senha inválido!' })
            })
    }
    render() {
        return (
            <div>
                <Header />

                <section className="container flex">
                    <div className="img__login"><div className="img__overlay"></div></div>

                    <div className="item__login">
                        <div className="row">
                            <div className="item">
                                <img src={Logo} className="icone__login" />
                            </div>
                            <div className="item" id="item__title">
                                <p className="text__login" id="item__description">
                                    Bem-vindo! Faça login para acessar sua conta.
                                </p>
                            </div>
                            <form onSubmit={this.realizaLogin}>
                                <div className="item">
                                    <input
                                        className="input__login"
                                        placeholder="username"
                                        type="text"
                                        name="email" // tem que ser igual ao nome no state
                                        value={this.state.email} //acho que era por isso que não funcionou antes
                                        id="login__email"
                                        onChange={this.atualizaEstado}

                                    />
                                </div>
                                <div className="item">
                                    <input
                                        className="input__login"
                                        placeholder="password"
                                        type="password"
                                        name="senha" //mesmo nome do state
                                        value={this.state.senha} //mais uma vez alterando o value
                                        onChange={this.atualizaEstado} //chamando a função quando há mudança
                                        id="login__password"
                                    />
                                </div>
                                <p style={{ color: 'red' }}>{this.state.erroMensagem}</p>

                                {
                                    this.state.isLoading === true &&
                                    <div className="item">
                                        <button type="submit" className="btn btn__login" disabled id="btn__login">
                                            Loading...
                                    </button>
                                    </div>
                                }

                                {
                                    this.state.isLoading === false &&
                                    <div className="item">
                                        <button className="btn btn__login" id="btn__login">
                                            Login
                                    </button>
                                    </div>
                                }

                            </form>
                        </div>
                    </div>
                </section>
            </div>

        )
    }
}
export default Login;