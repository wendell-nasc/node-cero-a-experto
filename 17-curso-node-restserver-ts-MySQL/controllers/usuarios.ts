import { Request, Response } from "express";
import Usuario from '../models/usuario';

export const getUsuarios = async ( req: Request,  res: Response ) => { ///Exportando direto
    
    const usuarios = await Usuario.findAll(); ///Estancia usuario com o modelo de banco de dados

    res.json ( { usuarios }  ); // Sem bigode envia OBJETo, com bigode ARRAY
    /*
    res.json ({
        msg: 'getUsuarios',
        
    })
    */

}



export const getUsuario = async( req: Request,  res: Response ) => { ///Exportando direto

    const { id } = req.params;

    ///Verifica se existe o usuario
    const usuario = await Usuario.findByPk(id); ///Estancia usuario com o modelo de banco de dados

    if ( usuario ) { ///Validar se o usuario existe... se retornar o resultado é verdadeiro
        res.json ( { usuario }  ); // Sem bigode envia OBJETo, com bigode ARRAY

    }else{
        res.status(404).json({

            msg: `No existe um usuario com o id ${ id }`
        })

    }

    

    /*
    res.json ({
        msg: 'getUsuario',
        id
    })
    */

}


export const postUsuario = async ( req: Request,  res: Response ) => { ///Exportando direto
   
    const { body  } = req;


    try {

       ///Validar existencia do email duplicidade        
        const existeEmail = await Usuario.findOne({///Verifica se o e-mail existe... foi definido o campo como unico para não permitir 
            where: {
                email: body.email
            }
        });

        if ( existeEmail ){

            return res.status(400).json({

                msg: "Ya existe un usuario con el email " + body.email
            })
        }

         const usuario = new Usuario(body); /// Estancia e passa os dados envaidos do POST para gravar no banco

        await usuario.save(); ///Grava no banco

        res.json( usuario ); /// REposta .... Envia os dados do usuario criado

        
    } catch (error) {
        
        console.log(error); ///Exibir erro no console

        res.status(500).json ({
            msg: 'Hable con el administrador /n' + error
        })
        
    }

        /*
        res.json ({
        msg: 'postUsuario',
        body     

        })
          */

   

}


export const putUsuario = async ( req: Request,  res: Response ) => { ///Exportando direto
   
    const { id } = req.params;
    const { body  } = req;


    try {

        ///Validar existencia do email duplicidade
        const existeEmail = await Usuario.findOne({///Verifica se o e-mail existe... foi definido o campo como unico para não permitir 
            where: {
                email: body.email
            }
        });

        if ( existeEmail ){

            return res.status(400).json({

                msg: "Ya existe un usuario con el email " + body.email
            })
        }

        ///Verifica se existe o usuario

        const usuario = await Usuario.findByPk( id ); /// Pesquisa o usuario correspondente ao ID
        
      
        if ( !usuario ){ ///Se o osuario existir for false

            return res.status(404).json({

                msg: 'No existe un usuario con el id' + id
            });
        }

        ///Espera usuario 
        await usuario.update( body ); ///Grava e atualiza no banco

        res.json( usuario ); /// REposta .... Envia os dados do usuario atualizado e alterado

        
    } catch (error) {
        
        console.log(error); ///Exibir erro no console

        res.status(500).json ({
            msg: 'Hable con el administrador /n' + error
        })
        
    }

    /*
    res.json ({
        msg: 'putUsuario',
        body,
        id
    })
    */

}


export const deleteUsuario = async ( req: Request,  res: Response ) => { ///Exportando direto
   
    const { id } = req.params;

    

    //Verifica se existe o usuario

    const usuario = await Usuario.findByPk( id ); /// Pesquisa o usuario correspondente ao ID
        
      ///SE não existe
    if ( !usuario ){ ///Se o osuario existir for false

        return res.status(404).json({

            msg: 'No existe un usuario con el id' + id
        });
    }



    ///Eliminização fisica 

    /// await usuario.destroy(); //// Super importante


    ///Eliminização LOGICA para evitar registros orfaos e demais probolemas de banco

    await usuario.update( { estado: false })



    res.json( usuario ); /// REposta .... Envia os dados do usuario atualizado e alterado



    
    /*
    res.json ({
        msg: 'deleteUsuario',
        id
    })
    
    */

}
