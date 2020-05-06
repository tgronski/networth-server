CREATE TABLE networth_goals (
  id SERIAL PRIMARY KEY,
  user_id INTEGER
        REFERENCES networth_users(id) ON DELETE cascade,
  goal_name TEXT NOT NULL,
  goal_value INTEGER not NULL
);