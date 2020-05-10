const AdviceService = {
  getAllAdvice(knex) {
    return knex.select("*").from("networth_advice");
  },
  getById(knex, adviceid) {
    return knex
      .from("networth_advice")
      .select("*")
      .where("id", adviceid)
      .first();
  },
};

module.exports = AdviceService;
