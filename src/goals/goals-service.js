const GoalsService = {
    getGoals(knex,id) {
      return knex
        .select("*")
        .from("networth_goals")
        .where("user_id", id)
    },  
    getById(knex, id) {
        return knex
          .from("networth_goals")
          .select("*")
          .where("id", id)
      },
      insertGoal(knex, newGoal) {
          return knex
            .insert(newGoal)
            .into("networth_goals")
            .returning("*")
            .then(rows => {
              return rows[0];
            });
        },
        deleteGoals(knex, id) {
          return knex("networth_goals")
            .where("id", id)
            .delete();
        }
    };
    
    module.exports = GoalsService;
    