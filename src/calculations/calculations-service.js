const CalculationsService = {
  getCalculations(knex) {
    return knex
      .from("networth_calculations")
      .select("*")
      // .where("user_id", user_id)
      .first();
  },  
  getById(knex, calculationsid) {
      return knex
        .from("networth_calculations")
        .select("*")
        .where("id", calculationsid)
        .first();
    },
    insertCalculation(knex, newCalculation) {
        return knex
          .insert(newCalculation)
          .into("networth_calculations")
          .returning("*")
          .then(rows => {
            return rows[0];
          });
      },
      deleteCalculation(knex, calculationsid) {
        return knex("networth_calculations")
          .where("calculationsid", calculationsid)
          .delete();
      }
  };
  
  module.exports = CalculationsService;
  