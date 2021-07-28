///Referencias do arquivo index.hmtl

const miFormulario = document.querySelector('form');






       // console.log(window.location.hostname.includes('localhost'))

        const url = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:8081/api/auth/'
            : 'https://webserver-node2021.herokuapp.com/api/auth/';





///::::::::::::::FORMULARIO MANUAL::::::::::::::
///Define a ação que deve escutar o Formulariuo

miFormulario.addEventListener('submit', ev => {/// ação do botão ingressar do index.html

    ev.preventDefault(); ///Evita fazer reflash do bronwser
    const formData = { };

    for ( let el of miFormulario.elements ){///For para extrair os dados dos elementos do formulario
        if (el.name.length > 0 ) ///Condição para extrauir somente se for maior que zero a qtde de elementos
            formData[ el.name ]= el.value //Le os objetos do formulario e armazena na variavel el
        
    }
  
  
    console.log(formData ) //Testar os dados enviados pelo formulario

///Enviar as informações pro backend
fetch( url + 'login', {
    method: 'POST',
    body: JSON.stringify ( formData ),
    headers: { 'Content-Type': 'application/json' }
})

.then ( resp => resp.json() )
//.then ( data => {//Retorna todos os dados retornados da requisição
.then ( ({ msg, token }) => {

//Desestrutura 'data' e retrona apenas msg e token
if ( msg ) {
    return console.log( msg ) //
}
localStorage.setItem('token', token );
window.location = 'chat.html' /// Redirecionada para a pagina de chat se o usuario estiver logado


//console.log(data) //Exibe todos os dados da variavel data
console.log( token, msg ) //Exibe todos os dados da variavel data

})
.catch ( err => {
    console.log(err)
})

}) 

///::::::::::::::FORMULARIO GOOGLE::::::::::::::

        function onSignIn(googleUser) {

            //var profile = googleUser.getBasicProfile();//Comentado as linhas abaixo com os dados do usuario
            //console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
            //console.log('Name: ' + profile.getName());
            //console.log('Image URL: ' + profile.getImageUrl());
           // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

            var id_token = googleUser.getAuthResponse().id_token;
            const data = { id_token };

            fetch( url + 'google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( data )
            })
            .then( resp => resp.json() )
            //.then( data => console.log( 'Nuestro server', data ) )//Traz todas informações do servidor e credenciais do cliente. Porém, foi desestruturada para trazer apenas o token conforme segue abaixo
      
            .then( ({ token })  => {

               // console.log( token );
               localStorage.setItem('token', token );
               window.location = 'chat.html' /// Redirecionada para a pagina de chat se o usuario estiver logado

            })
            .catch( console.log );
            
        }

        function signOut() {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
            console.log('User signed out.');
            });
        }