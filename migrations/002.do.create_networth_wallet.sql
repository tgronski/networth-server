DROP TABLE IF EXISTS networth_wallet;


CREATE TABLE networth_wallet (
  id SERIAL PRIMARY KEY,
  wallet_categories TEXT,
  assets BOOLEAN,
  date_created TIMESTAMP DEFAULT now() NOT NULL,
  icon TEXT,
  user_id INTEGER
        REFERENCES networth_users(id) ON DELETE CASCADE
);



