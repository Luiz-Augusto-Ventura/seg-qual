const db = require('../config/db.conf');
const Conta = db.Conta;
const Op = db.Sequelize.Op;

module.exports = {
    list(req, res) {
        if (req.query.id) {
            Conta.findByPk(req.query.id)
            .then(conta => {
                return res.status(200).json(conta);
            })
            .catch(err => {
                return res.status(404).json({ reason: err });
            });
        }
        else {
            Conta.findAll({})
            .then(contas => {
                return res.status(200).json(contas);
            })
            .catch(err => {
                return res.status(404).json({ reason: err });
            });
        }
    },

    create(req, res) {     
        if(req.body) {
            const l = req.body.lancamento.split('/');
            const v = req.body.vencimento.split('/');
            Conta.create({
                tipo: req.body.tipo,
                descricao: req.body.descricao,
                valor: req.body.valor,
                lancamento: new Date(Date.UTC( parseInt(l[2]), (parseInt(l[1]) -1), parseInt(l[0]) )),
                vencimento: new Date(Date.UTC( parseInt(v[2]), (parseInt(v[1]) -1), parseInt(v[0]) )),
                quitada: req.body.quitada 
            })
            .then(conta => {
                return res.status(200).json(conta);
            })
            .catch(err => {
                return res.status(500).json({ reason: err });
            });
        }
    },

    update(req, res) {
        if(req.body) {
            const l = req.body.lancamento.split('/');
            const v = req.body.vencimento.split('/');
            Conta.findByPk(req.body.id)
            .then(conta => {
                if(req.query.quitar) {
                    conta.update({
                        quitada: req.body.quitada 
                    })
                    .then(updated => {
                        return res.status(200).json(updated);
                    })
                    .catch(err => {
                        return res.status(500).json({ reason: err });
                    });
                }
                else {
                    conta.update({
                        tipo: req.body.tipo,
                        descricao: req.body.descricao,
                        valor: req.body.valor,
                        lancamento: new Date(Date.UTC( parseInt(l[2]), (parseInt(l[1]) -1), parseInt(l[0]) )),
                        vencimento: new Date(Date.UTC( parseInt(v[2]), (parseInt(v[1]) -1), parseInt(v[0]) )),
                        quitada: req.body.quitada 
                    })
                    .then(updated => {
                        return res.status(200).json(updated);
                    })
                    .catch(err => {
                        return res.status(500).json({ reason: err });
                    });
                }
            })
            .catch(err => {
                return this.status(404).json({ reason: err });
            });
        }
    },

    delete(req, res) {
        if(req.query.id) {
            Conta.findByPk(req.query.id)
            .then(conta => {
                conta.destroy()
                .then(() => {
                    return res.status(200).json({ ok: true });
                })
                .catch(err => {
                    return res.status(500).json({ reason: err });
                })
            })
            .catch(err => {
                return res.status(500).json({ reason: err });
            })
        }
    }
}