import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './assets/pages/Home/App';
import * as serviceWorker from './serviceWorker';
import Categorias from './assets/pages/Categorias/Categorias';
import Eventos from './assets/pages/Eventos/Eventos'
import NotFound from './assets/pages/NotFound/NotFound';
import Login from './assets/pages/Login/Login';
import Home from './assets/pages/Home/App';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

// importando o css padrão
import './assets/css/flexbox.css'
import './assets/css/reset.css'
import './assets/css/style.css'

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { usuarioAutenticado, parseJWT } from './assets/services/auth';
// iniciando a criação das rotas

const PermissaoAdmin = ({ component: Component }) => (
    <Route
        render={props =>
            usuarioAutenticado() && parseJWT().Role === "Administrador" ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: "/login" }} />
                )}
    />
)

const PermissaoAluno = ({ component: Component }) => (
    <Route
        render={props =>
            usuarioAutenticado() && parseJWT().Role === "Aluno" ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: "/login" }} />
                )}
    />
)

const Rotas = (
    <Router>
        <div>
            {/* encapsulado em uma div, o caminho exato ao digitar / é App
            Route é a rota efetivamente
            Router é a url, apelido do BrowserRouter
            O caminho ao digitar /categorias é a página Categorias*/}
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/categorias" component={(Categorias)} />
                <Route path="/eventos" component={(Eventos)} />
                <Route path="/login" component={(Login)} />
                <Route path="/home" component={(Home)} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
);

ReactDOM.render(Rotas, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
