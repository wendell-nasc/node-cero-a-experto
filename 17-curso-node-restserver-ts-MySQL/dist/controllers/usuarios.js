"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll(); ///Estancia usuario com o modelo de banco de dados
    res.json({ usuarios }); // Sem bigode envia OBJETo, com bigode ARRAY
    /*
    res.json ({
        msg: 'getUsuarios',
        
    })
    */
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    ///Verifica se existe o usuario
    const usuario = yield usuario_1.default.findByPk(id); ///Estancia usuario com o modelo de banco de dados
    if (usuario) { ///Validar se o usuario existe... se retornar o resultado é verdadeiro
        res.json({ usuario }); // Sem bigode envia OBJETo, com bigode ARRAY
    }
    else {
        res.status(404).json({
            msg: `No existe um usuario com o id ${id}`
        });
    }
    /*
    res.json ({
        msg: 'getUsuario',
        id
    })
    */
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        ///Validar existencia do email duplicidade        
        const existeEmail = yield usuario_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (existeEmail) {
            return res.status(400).json({
                msg: "Ya existe un usuario con el email " + body.email
            });
        }
        const usuario = new usuario_1.default(body); /// Estancia e passa os dados envaidos do POST para gravar no banco
        yield usuario.save(); ///Grava no banco
        res.json(usuario); /// REposta .... Envia os dados do usuario criado
    }
    catch (error) {
        console.log(error); ///Exibir erro no console
        res.status(500).json({
            msg: 'Hable con el administrador /n' + error
        });
    }
    /*
    res.json ({
    msg: 'postUsuario',
    body

    })
      */
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        ///Validar existencia do email duplicidade
        const existeEmail = yield usuario_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (existeEmail) {
            return res.status(400).json({
                msg: "Ya existe un usuario con el email " + body.email
            });
        }
        ///Verifica se existe o usuario
        const usuario = yield usuario_1.default.findByPk(id); /// Pesquisa o usuario correspondente ao ID
        if (!usuario) { ///Se o osuario existir for false
            return res.status(404).json({
                msg: 'No existe un usuario con el id' + id
            });
        }
        ///Espera usuario 
        yield usuario.update(body); ///Grava e atualiza no banco
        res.json(usuario); /// REposta .... Envia os dados do usuario atualizado e alterado
    }
    catch (error) {
        console.log(error); ///Exibir erro no console
        res.status(500).json({
            msg: 'Hable con el administrador /n' + error
        });
    }
    /*
    res.json ({
        msg: 'putUsuario',
        body,
        id
    })
    */
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    //Verifica se existe o usuario
    const usuario = yield usuario_1.default.findByPk(id); /// Pesquisa o usuario correspondente ao ID
    ///SE não existe
    if (!usuario) { ///Se o osuario existir for false
        return res.status(404).json({
            msg: 'No existe un usuario con el id' + id
        });
    }
    ///Eliminização fisica 
    /// await usuario.destroy(); //// Super importante
    ///Eliminização LOGICA para evitar registros orfaos e demais probolemas de banco
    yield usuario.update({ estado: false });
    res.json(usuario); /// REposta .... Envia os dados do usuario atualizado e alterado
    /*
    res.json ({
        msg: 'deleteUsuario',
        id
    })
    
    */
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.js.map