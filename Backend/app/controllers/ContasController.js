const db = require('../config/db.conf');
const Conta = db.Conta;
const Op = db.Sequelize.Op;

module.exports = {
    async list(req, res) {
        if (req.query.id) {
            Conta.findByPk(req.query.id)
            .then(conta => {
                return res.status(200).json(conta);
            })
            .catch(err => {
                return res.status(404).json({ reason: err });
            });
        }
        if(req.query.li && req.query.lf) {
            let li = req.query.li.split('/');
            li = await new Date(Date.UTC( parseInt(li[2]), (parseInt(li[1]) -1), parseInt(li[0]) ));
            let lf = req.query.lf.split('/');
            lf = await new Date(Date.UTC( parseInt(lf[2]), (parseInt(lf[1]) -1), parseInt(lf[0]) ));

            Conta.findAll({
                where: {
                    lancamento: {
                        [Op.between]: [li, lf]
                    }
                }
            })
            .then(contas => {
                return res.status(200).json(contas);
            })
            .catch(err => {
                return res.status(404).json({ reason: err });
            });
        }
        if(req.query.vi && req.query.vf) {
            let vi = req.query.vi.split('/');
            vi = await new Date(Date.UTC( parseInt(vi[2]), (parseInt(vi[1]) -1), parseInt(vi[0]) ));
            let vf = req.query.vf.split('/');
            vf = await new Date(Date.UTC( parseInt(vf[2]), (parseInt(vf[1]) -1), parseInt(vf[0]) ));

            Conta.findAll({
                where: {
                    vencimento: {
                        [Op.between]: [vi, vf]
                    }
                }
            })
            .then(contas => {
                return res.status(200).json(contas);
            })
            .catch(err => {
                return res.status(404).json({ reason: err });
            });
        }
       
        //Se não existe nenhum tipo dos parâmetros verificados acima
        Conta.findAll({})
        .then(contas => {
            return res.status(200).json(contas);
        })
        .catch(err => {
            return res.status(404).json({ reason: err });
        });
     
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