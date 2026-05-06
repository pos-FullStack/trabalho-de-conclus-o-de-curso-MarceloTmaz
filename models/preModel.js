const {db} = require("../bd/db_config");

const pre = {
  select: async () => {
    const [result] = await db.query(
      "SELECT * FROM tipo_combustivel;",
    );
    return result;
  }
};

module.exports = pre;