const CalculationsService = {
    getById(knex, user_id ) {
      return knex
        .from("networth_wallets")
        .select("*")
        // .where("user_id", user_id)
        .first();

  }
}
  
  module.exports = WalletsService;
  