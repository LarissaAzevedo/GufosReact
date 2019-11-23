// criando um serviço para ver se o usuário está autenticado

// define a constante usuarioAutenticado que verifica de há um token no localStorage (se houver, há alguém logado)
export const usuarioAutenticado = () => localStorage.getItem('usuario-gufos') !== null

export const parseJWT = () => {
    // usa o ponto para separar qual índice do token será chamado "Explode"
    var base64 = localStorage.getItem('usuario-gufos').split('.')[1]

    // conversão retornada
    // pega a base64 e joga para string com o atob
    // se eu usasse btoa eu estaria usando codificando de volta 
    return JSON.parse(window.atob(base64))
}
