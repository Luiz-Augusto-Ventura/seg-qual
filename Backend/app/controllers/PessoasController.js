const db = require('../config/db.conf');
const Pessoa = db.Pessoa;
const Op = db.Sequelize.Op;

module.exports = {
    create(req, res) {
        if(req.body) {
            Pessoa.create({
                nome: req.body.nome,
                senha: req.body.senha
            })
            .then(pessoa => {
                return res.status(200).json({ message: 'Successfully created' });
            })
            .catch(error => {
                return res.status(500).json({ reason: error });
            });
        }
    },

    find(req, res) {
        if(req.body) {
            const nome = req.body.nome;
            const senha = req.body.senha;
            db.sequelize.query(`SELECT nome, senha FROM seg_qual.pessoas WHERE nome='${nome}' and senha='${senha}'`,
            {
                model: Pessoa,
                mapToModel: true
            })
            .then(pessoa => {
                if(pessoa)
                    return res.status(200).json(pessoa[0]);
                else 
                    return res.status(404).json({ error: 'User not found' });
            })
            .catch(error => {
                return res.status(500).json(error);
            });
        }
    }
}