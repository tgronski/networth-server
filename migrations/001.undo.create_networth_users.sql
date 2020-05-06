ALTER TABLE networth_wallet
  DROP COLUMN IF EXISTS user_id;

ALTER TABLE networth_calculations
  DROP COLUMN IF EXISTS user_id;

DROP TABLE IF EXISTS networth_users CASCADE;
