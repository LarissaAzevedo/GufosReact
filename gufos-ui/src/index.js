import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './assets/pages/Home/App';
import * as serviceWorker from './serviceWorker';
// importa a página categoria
import Categorias from './assets/pages/Categorias/Categorias';
// importando o componente not found
import NotFound from './assets/pages/NotFound/NotFound';
// importa a biblioteca react route dom
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
// iniciando a criação das rotas
const Rotas = (
    <Router>
        <div>
            {/* encapsulado em uma div, o caminho exato ao digitar / é App
            Route é a rota efetivamente
            Router é a url, apelido do BrowserRouter
            O caminho ao digitar /categorias é a página Categorias*/}
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/categorias" component={() => <Categorias titulo_pagina='Categorias Gufos' />} />
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
