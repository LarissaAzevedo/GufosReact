import React, { Component } from 'react';
import '../../../assets/css/cabecalho.css';
import Logo from '../../img/icon-login.png';
import { Link, withRouter } from 'react-router-dom';
import { usuarioAutenticado, parseJWT } from '../../services/auth'

class Header extends Component {
    logout = () => {
        localStorage.removeItem('usuario-gufos')

        // redimensiona para o endereço /
        this.PaymentResponse.history.push("/")
    }


    render() {
        return (
            // React.Fragment => Div melhorada, não tem valor semântico

            <header className="cabecalhoPrincipal">
                <div className="container">
                    <img src={Logo} />

                    <nav className="cabecalhoPrincipal-nav">
                        <Link to="/">Home</Link>
                        {usuarioAutenticado() && parseJWT().Role === "Administrador" ? (
                            // se user for administrador
                            <React.Fragment>
                                <Link to="/categorias">Categorias</Link>
                                <a onClick={this.logout}>Sair</a>
                            </React.Fragment>
                        ) : (
                                usuarioAutenticado() && parseJWT().Role === "Aluno" ? (
                                    <React.Fragment>
                                        <Link to="/eventos">Eventos</Link>
                                        <a onClick={this.logout}>Sair</a>
                                    </React.Fragment>
                                    // se for aluno
                                ) : (
                                        // se não estiver logado
                                        <React.Fragment>
                                            <Link to="/login" className="cabecalhoPrincipal-nav-login">Login</Link>
                                        </React.Fragment>
                                    )
                            )}
                    </nav>
                </div>
            </header >
        );
    }
}
export default withRouter(Header);