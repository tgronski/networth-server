BEGIN;

TRUNCATE
  networth_advice,
  networth_wallet,
  networth_calculations,
  networth_users
  RESTART IDENTITY CASCADE;

INSERT INTO networth_users (user_name, full_name, nickname, password)
VALUES
 ('tess123', 'Tess Gronski', 'tess', '$2a$12$lHK6LVpc15/ZROZcKU00QeiD.RyYq5dVlV/9m4kKYbGibkRc5l4Ne');

INSERT INTO networth_wallet (wallet_categories, assets ,user_id)
VALUES
('credits',false ,null),
('loans',false,null),
('savings',true,null),
('investments',true,null);

INSERT INTO networth_advice (
  category,
  content) 
  VALUES
  ( 1,'www.sofi.com'),
  ( 2,'www.vanguard.com');

COMMIT;
