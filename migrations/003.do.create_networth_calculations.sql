DROP TABLE IF EXISTS networth_calculations;

CREATE TABLE networth_calculations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER
        REFERENCES networth_users(id) ON DELETE CASCADE NOT NULL,
    networth_credits INTEGER NOT NULL,
    networth_investments INTEGER NOT NULL,
    networth_savings INTEGER NOT NULL,
    networth_loans INTEGER NOT NULL,
    networth_total TEXT NOT NULL,
    networth_total_value INTEGER NOT NULL,
    date_created TIMESTAMPTZ DEFAULT now() NOT NULL
);
