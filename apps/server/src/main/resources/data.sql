use buddy;

INSERT INTO penalty_type (penalty_type_id, duration) VALUES (1, 600);
INSERT INTO penalty_type (penalty_type_id, duration) VALUES (2, 3600);
INSERT INTO penalty_type (penalty_type_id, duration) VALUES (3, 86400);


-- UPDATE service SET url = 'https://www.netflix.com' WHERE service_id = 1;
-- UPDATE service SET url = 'https://www.wavve.com' WHERE service_id = 2;
-- UPDATE service SET url = 'https://watcha.com' WHERE service_id = 3;
-- UPDATE service SET url = 'https://laftel.net' WHERE service_id = 4;
-- UPDATE service SET url = 'https://www.tving.com/' WHERE service_id = 5;
-- UPDATE service SET url = 'https://www.disneyplus.co' WHERE service_id = 6;
-- UPDATE service SET url = 'https://www.youtube.com' WHERE service_id = 7;
-- UPDATE service SET url = 'https://www.coupang.com' WHERE service_id = 8;
-- UPDATE service SET url = 'https://www.ridibooks.com' WHERE service_id = 9;
-- UPDATE service SET url = 'https://www.millie.co.kr' WHERE service_id = 10;
-- UPDATE service SET url = 'https://company.yes24.com' WHERE service_id = 11;
-- UPDATE service SET url = 'https://spotify.com' WHERE service_id = 12;
-- UPDATE service SET url = 'https://music.apple.com' WHERE service_id = 13;
--
-- --INSERT INTO service (service_id, service_name, tag) VALUES (1, '넷플릭스', 'event');
-- --INSERT INTO service (service_id, service_name, tag) VALUES (2, '웨이브', NULL);
-- --INSERT INTO service (service_id, service_name, tag) VALUES (3, '왓챠', NULL);
-- --INSERT INTO service (service_id, service_name, tag) VALUES (4, '라프텔', 'event');
-- --INSERT INTO service (service_id, service_name, tag) VALUES (5, '티빙', NULL);
-- --INSERT INTO service (service_id, service_name, tag) VALUES (6, '디즈니+', NULL);
-- --INSERT INTO service (service_id, service_name, tag) VALUES (7, '유튜브 프리미엄', NULL);
-- --INSERT INTO service (service_id, service_name, tag) VALUES (8, '쿠팡 플레이', NULL);
-- --INSERT INTO service (service_id, service_name, tag) VALUES (9, '리디 셀렉트', NULL);
-- --INSERT INTO service (service_id, service_name, tag) VALUES (10, '밀리의 서재', NULL);
-- --INSERT INTO service (service_id, service_name, tag) VALUES (11, '예스24 크레마클럽', NULL);
-- --INSERT INTO service (service_id, service_name, tag) VALUES (12, '스포티파이', NULL);
-- --INSERT INTO service (service_id, service_name, tag) VALUES (13, '애플 뮤직', NULL);
--
-- --INSERT INTO plan (plan_id, service_id, plan_name, max_member_num, monthly_fee) VALUES (1, 1, '넷플릭스 스탠다드', 2, 13500);
-- --INSERT INTO plan (plan_id, service_id, plan_name, max_member_num, monthly_fee) VALUES (2, 1, '넷플릭스 프리미엄', 4, 17000);
-- --INSERT INTO plan (plan_id, service_id, plan_name, max_member_num, monthly_fee) VALUES (3, 2, '웨이브 스탠다드', 2, 12900);
-- --INSERT INTO plan (plan_id, service_id, plan_name, max_member_num, monthly_fee) VALUES (4, 2, '웨이브 프리미엄', 4, 13900);
-- --INSERT INTO plan (plan_id, service_id, plan_name, max_member_num, monthly_fee) VALUES (5, 3, '왓챠 프리미엄', 4, 12900);
-- --INSERT INTO plan (plan_id, service_id, plan_name, max_member_num, monthly_fee) VALUES (6, 4, '라프텔 프리미엄', 4, 14900);
-- --INSERT INTO plan (plan_id, service_id, plan_name, max_member_num, monthly_fee) VALUES (7, 5, '티빙 스탠다드', 2, 13500);
-- --INSERT INTO plan (plan_id, service_id, plan_name, max_member_num, monthly_fee) VALUES (8, 5, '티빙 프리미엄', 4, 17000);
-- --INSERT INTO plan (plan_id, service_id, plan_name, max_member_num, monthly_fee) VALUES (9, 6, '디즈니 플러스 스탠다드', 2, 9900);
-- --INSERT INTO plan (plan_id, service_id, plan_name, max_member_num, monthly_fee) VALUES (10, 6, '디즈니 플러스 프리미엄', 4, 13900);
-- --INSERT INTO plan (plan_id, service_id, plan_name, max_member_num, monthly_fee) VALUES (11, 7, '유튜브 프리미엄', 10, 14900);
-- --INSERT INTO plan (plan_id, service_id, plan_name, max_member_num, monthly_fee) VALUES (12, 8, '쿠팡 플레이', 5, 4990);
-- --INSERT INTO plan (plan_id, service_id, plan_name, max_member_num, monthly_fee) VALUES (13, 9, '리디셀렉트', 5, 4990);
-- --INSERT INTO plan (plan_id, service_id, plan_name, max_member_num, monthly_fee) VALUES (14, 10, '밀리의 서재', 3, 9900);
-- --INSERT INTO plan (plan_id, service_id, plan_name, max_member_num, monthly_fee) VALUES (15, 11, '예스24 크레마클럽 스탠다드', 5, 5500);
-- --INSERT INTO plan (plan_id, service_id, plan_name, max_member_num, monthly_fee) VALUES (16, 11, '예스24 크레마클럽 프리미엄', 5, 7700);
-- --INSERT INTO plan (plan_id, service_id, plan_name, max_member_num, monthly_fee) VALUES (17, 12, '스포티파이 듀오', 2, 17985);
-- --INSERT INTO plan (plan_id, service_id, plan_name, max_member_num, monthly_fee) VALUES (18, 13, '애플뮤직', 6, 13500);
