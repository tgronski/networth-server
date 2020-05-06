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

INSERT INTO networth_calculations (user_id, networth_credits, networth_investments, networth_savings, networth_loans, networth_total, networth_total_value)
VALUES( 1, 0,10,0,0,'10',10);

INSERT INTO networth_wallet (wallet_categories, icon, assets ,user_id)
VALUES
('credits','faCreditCard',false ,null),
('loans','faHandHoldingUsd',false,null),
('savings','faPiggyBank',true,null),
('investments','faLandmark',true,null);

INSERT INTO networth_advice (
  category,
  content) 
  VALUES
  ( 1,'www.sofi.com'),
  ( 2,'www.vanguard.com');

COMMIT;





