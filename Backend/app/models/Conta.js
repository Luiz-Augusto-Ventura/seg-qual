module.exports = (sequelize, Sequelize) => {
    const Conta = sequelize.define('Contas', {
        tipo: {
            type: Sequelize.STRING(1)
        },
        descricao: {
            type: Sequelize.STRING()
        },
        valor: {
            type: Sequelize.FLOAT()
        },
        lancamento: {
            type: Sequelize.DATE()
        },
        vencimento: {
            type: Sequelize.DATE()
        },
        quitada: {
            type: Sequelize.BOOLEAN()
        },
    });

    return Conta;
}