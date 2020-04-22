DROP TABLE IF EXISTS networth_advice;

CREATE TABLE networth_advice (
  id SERIAL PRIMARY KEY,
  category INTEGER NOT NULL,
  content TEXT,
  date_created TIMESTAMP DEFAULT now() NOT NULL
);
