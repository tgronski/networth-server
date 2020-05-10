const CalculationsService = {
  getCalculations(knex, id) {
    return knex.select("*").from("networth_calculations").where("user_id", id);
    // .returning("*")
  },
  getById(knex, calculationsid) {
    return knex
      .from("networth_calculations")
      .select("*")
      .where("id", calculationsid);
  },
  insertCalculation(knex, newCalculation) {
    return knex
      .insert(newCalculation)
      .into("networth_calculations")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  deleteCalculation(knex, calculationsid) {
    return knex("networth_calculations").where("id", calculationsid).delete();
  },
};

module.exports = CalculationsService;
