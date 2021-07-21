///Importar esquema para validar a ROLE do banco de dados
const Role = require('../models/role');
const Usuario = require('../models/usuario');



////FUNCAO PARA VALIDAR O CAMPO ROLE DA TABELA
const esRoleValido = async (role = '') => { //valida o campo da tabela role models
    
    const existeRol = await Role.findOne({ role }); ///findOne verifica se a role buscada existe no banco de dados
    if ( !existeRol ){
        throw new Error(`El rol ${ role } no está registrado en la BD`); ///Não exite entrar na condicao de erro
    }
}



///FUNCAO PARA VALIDAR O CAMPO E-MAIL

 //Verificar si el correo existe
    
   //Função para validar se existe o e-mail com a mesma informação cadastrada anteriormente


   const esCorreoValido = async (correo = '') => { //valida o campo da tabela role models
    
    const existeCorreo = await Usuario.findOne({ correo:correo}); ///findOne verifica se a role buscada existe no banco de dados
    if ( existeCorreo ){

        throw new Error(`El correo ${ correo  },  já está registrado en la BD` ); ///Não exite entrar na condicao de erro
    }    
    
    }


    const existeUsuarioPorId = async( id ) => {

        ///verificar si el correo existe
        const existeUsuario = await Usuario.findById ( id ); ///O findById verifica se o ID é valido do Mongodb
        if ( !existeUsuario ){

            throw new Error(`El id no existe  ${ id }`);
        }

    }



module.exports = {

esRoleValido,
esCorreoValido,
existeUsuarioPorId

}