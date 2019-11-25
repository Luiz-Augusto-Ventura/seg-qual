module.exports = (sequelize, Sequelize) => {
	const Pessoa = sequelize.define('Pessoas', {
	  nome: {
		  type: Sequelize.STRING(30)
    },
    senha: {
        type: Sequelize.STRING(15)
    }
  });

    return Pessoa;
}