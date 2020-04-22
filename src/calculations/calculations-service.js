const CalculationsService = {
    getAllCalculations(knex) {
      return knex.select("*").from("networth_calculations");
    },
    getById(knex, calculationsid) {
      return knex
        .from("networth_calculations")
        .select("*")
        .where("id", calculationsid)
        .first();
    },
    insertCalculation(knex, newStore) {
        return knex
          .insert(newCalculation)
          .into("networth_calculations")
          .returning("*")
          .then(rows => {
            return rows[0];
          });
      },
      deleteStore(knex, calculationsid) {
        return knex("networth_calculations")
          .where("calculationsid", calculationsid)
          .delete();
      },
      updateStore(knex, calculationsid, editCalculation) {
        return knex("networth_calculations")
          .where("calculationsid", calculationsid)
          .update(editCalculation, returning=true)
          .returning("*")
      },
  };
  
  module.exports = CalculationsService;
  