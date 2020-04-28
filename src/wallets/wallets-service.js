const WalletsService = {
    getWallets(knex ) {
      return knex
        .select("*")
        .from("networth_wallet")
  }
}
  
  module.exports = WalletsService;
  