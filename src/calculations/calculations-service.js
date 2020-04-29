const CalculationsService = {
  getCalculations(knex,id) {
    return knex
      .from("networth_calculations")
      .select("*")
      .where("user_id", id)
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
  