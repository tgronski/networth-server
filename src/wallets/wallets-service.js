const WalletsService = {
    getById(knex, user_id ) {
      return knex
        .from("networth_wallet")
        .select("*")
        // .where("user_id", user_id)
        // .first();

  }
}
  
  module.exports = WalletsService;
  