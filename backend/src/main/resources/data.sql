INSERT INTO tb_user (name, email, password) VALUES ('User', 
'user@mapin.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG');

INSERT INTO tb_user (name, email, password) VALUES ('Admin', 
'admin@mapin.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG');

INSERT INTO tb_role (authority) VALUES ('ROLE_OPERATOR');
INSERT INTO tb_role (authority) VALUES ('ROLE_ADMIN');

INSERT INTO tb_user_role (user_id, role_id) VALUES (1, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 2);

INSERT INTO tb_product (name, weight) VALUES ('C-Leg', 5);
INSERT INTO tb_product (name, weight) VALUES ('Pé Ossur', 5);
INSERT INTO tb_product (name, weight) VALUES ('PALMILHA', 3);
INSERT INTO tb_product (name, weight) VALUES ('AFO', 3);


INSERT INTO tb_specialization (name) VALUES ('Pediatria');
INSERT INTO tb_specialization (name) VALUES ('Amputação');
INSERT INTO tb_specialization (name) VALUES ('Coluna');
INSERT INTO tb_specialization (name) VALUES ('Distúrbios do Movimento');
INSERT INTO tb_specialization (name) VALUES ('Escleroterapia');
INSERT INTO tb_specialization (name) VALUES ('Geriatria');
INSERT INTO tb_specialization (name) VALUES ('Membro Inferior');
INSERT INTO tb_specialization (name) VALUES ('Membro Superior');
INSERT INTO tb_specialization (name) VALUES ('Pé');
INSERT INTO tb_specialization (name) VALUES ('Tornozelo');
INSERT INTO tb_specialization (name) VALUES ('Joelho');
INSERT INTO tb_specialization (name) VALUES ('Quadril');
INSERT INTO tb_specialization (name) VALUES ('Mão');
INSERT INTO tb_specialization (name) VALUES ('Ombro');
INSERT INTO tb_specialization (name) VALUES ('Ortopedia Geral');
INSERT INTO tb_specialization (name) VALUES ('Neurofisiologia');
INSERT INTO tb_specialization (name) VALUES ('Cotovelo');

INSERT INTO tb_profession (name) VALUES ('ENDOCRINOLOGISTA');
INSERT INTO tb_profession (name) VALUES ('ORTOPEDISTA');
INSERT INTO tb_profession (name) VALUES ('NEUROCIRURGIÃO');
INSERT INTO tb_profession (name) VALUES ('NEUROLOGISTA');
INSERT INTO tb_profession (name) VALUES ('REUMATOLOGISTA');
INSERT INTO tb_profession (name) VALUES ('VASCULAR');
INSERT INTO tb_profession (name) VALUES ('ASSISTÊNCIA SOCIAL');
INSERT INTO tb_profession (name) VALUES ('FISIOTERAPEUTA');
INSERT INTO tb_profession (name) VALUES ('TERAPEUTA OCUPACIONAL');
INSERT INTO tb_profession (name) VALUES ('DIRETOR(A)');
INSERT INTO tb_profession (name) VALUES ('COORDENADOR(A)');
INSERT INTO tb_profession (name) VALUES ('COMPRADOR(A)');

INSERT INTO tb_place_service (name, phone, cell_phone, cep, logradouro, complemento, bairro, localidade, uf,
clinic, hospital, medical_center, cir, city_hall, apae, description) VALUES 
('Museu de Arte de São Paulo Assis Chateaubriand', '(11)3149-5959', '(11)87452-8965', '01310-200', 'Avenida Paulista', '1578', 'Bela Vsita', 
'São Paulo', 'SP', true, false, true, false, false, false, 'Museu de Arte de São Paulo Assis Chateaubriand');

INSERT INTO tb_place_service (name, phone, cell_phone, cep, logradouro, complemento, bairro, localidade, uf,
clinic, hospital, medical_center, cir, city_hall, apae, description) VALUES 
('Museu Casa de Portinari', '(16)3664-4284', '(11)87452-8965', '14340-000', 'Praça Cândido Portinari', '298', 'Centro', 
'Brodowski', 'SP', false, true, false, true, false, false, 'Museu Casa de Portinari');

INSERT INTO tb_place_service (name, phone, cell_phone, cep, logradouro, complemento, bairro, localidade, uf,
clinic, 
hospital,
medical_center,
cir, 
city_hall, 
apae, 
description) VALUES 
('Museu de Arqueologia Hypólito Barato', '(16)3664-4284', '(11)87452-8965', '15910-000', 'Vila Municipal', '', 'Centro', 
'Brodowski', 'SP', 
false, 
true, 
false, 
true,  
false,
false,
'Museu de Arqueologia Hypólito Barato');

INSERT INTO tb_place_service (name, phone, cell_phone, cep, logradouro, complemento, bairro, localidade, uf,
clinic, 
hospital,
medical_center,
cir, 
city_hall, 
apae, 
description) VALUES 
('Teste endereço Araraquara', '(16)3664-4284', '(11)87452-8965', '14804-404', 'Rua Jofre Rodrigues David', '22', 'Pq Igaçaba', 
'Araraquara', 'SP', 
true, 
true, 
false, 
false, 
false,
false,
'Teste endereço Araraquara');

INSERT INTO tb_place_service (name, phone, cell_phone, cep, logradouro, complemento, bairro, localidade, uf,
clinic, 
hospital,
medical_center,
cir, 
city_hall, 
apae, 
description) VALUES 
('Apae Araraquara', '(16) 3305-6000', '(11)87452-8965', '14801-040', 'Av. Cientista Frederico de Marco', '750', 'Jd. Cristo Rei', 
'Araraquara', 'SP', 
false, 
false, 
false, 
false, 
false,
true,
'Apae Araraquara');

INSERT INTO tb_place_service (name, phone, cell_phone, cep, logradouro, complemento, bairro, localidade, uf,
clinic, 
hospital,
medical_center,
cir, 
city_hall, 
apae, 
description) VALUES 
('Apae São Carlos', '(16) 3305-6000', '(11)87452-8965', '13566-340', 'Av. Profº Luis Augusto de Oliveira', '465', 'Vila Marina', 
'São Carlos', 'SP', 
false, 
false, 
false, 
false, 
false,
true,
'Apae São Carlos');

INSERT INTO tb_secretary (name, birth_date, description, place_service_id) VALUES 
('Renata', TIMESTAMP WITH TIME ZONE '2020-07-13T20:50:07.12345Z', 'Secretária da assist. social de Matão', 1);

INSERT INTO tb_social_assistence (name, description, place_service_id, profession_id) VALUES 
('Márcia', 'Coord. assist. social de Matão', 1, 11);

INSERT INTO tb_social_assistence (name, description, place_service_id, profession_id) VALUES 
('Patrícia', 'Coord. assist. social de Matão', 2, 10);

INSERT INTO tb_social_assistence (name, description, place_service_id, profession_id) VALUES 
('Luiz Felipe', 'Coord. assist. social de Matão', 4, 10);

INSERT INTO tb_social_assistence (name, description, place_service_id, profession_id) VALUES 
('Renato', 'Coord. assist. social de Matão', 4, 12);


INSERT INTO tb_health_professional (card_name, img_url, register, name, phone, email, birth_date, resume, 
seg, seg_period, ter, ter_period, qua, qua_period, qui, qui_period, sex, sex_period, sab, sab_period, office_hours, by_scheduling, partner,
profession_id, place_service_id) VALUES 
('JOSE LADEIRA', 'https://doc-admin-jacomo.s3.sa-east-1.amazonaws.com/padrao-M.png', '637598', 'JOSE LUIZ LADEIRA', 
'(16)99212-7147', 'ladeira@gmail.com', TIMESTAMP WITH TIME ZONE '2020-07-13T20:50:07.12345Z', 
'Médico chefe da residência médica vascular da Santa Casa de Ribeirão Preto',
false, '', false, '', true, 'MANHÃ', false, '', true, 'MANHÃ', true, 'MANHÃ','TER Das 08:00 às 11:00 / QUI Após às 16:00',
false, true, 2, 1);

INSERT INTO tb_professional_specialization (professional_id, specialization_id) VALUES (1, 2);
INSERT INTO tb_professional_specialization (professional_id, specialization_id) VALUES (1, 5);

INSERT INTO tb_health_professional (card_name, img_url, register, name, phone, email, birth_date, resume, 
seg, seg_period, ter, ter_period, qua, qua_period, qui, qui_period, sex, sex_period, sab, sab_period, office_hours, by_scheduling, partner,
profession_id, place_service_id) VALUES 
('GUSTAVO MAXIMIANO', 'https://doc-admin-jacomo.s3.sa-east-1.amazonaws.com/padrao-M.png', '123357', 'GUSTAVO MAXIMIANO', 
'(16)99212-7147', 'gustavo@gmail.com', TIMESTAMP WITH TIME ZONE '2020-07-13T20:50:07.12345Z', 
'Médico chefe da residência médica vascular da Santa Casa de Ribeirão Preto',
true, 'TARDE', true, 'MANHÃ', true, 'MANHÃ', false, '', true, 'MANHÃ', true, 'TARDE', 'TER Das 08:00 às 11:00 / QUI Após às 16:00',
false, true, 3, 2);

INSERT INTO tb_professional_specialization (professional_id, specialization_id) VALUES (2, 1);
INSERT INTO tb_professional_specialization (professional_id, specialization_id) VALUES (2, 3);

INSERT INTO tb_health_professional (card_name, img_url, register, name, phone, email, birth_date, resume, 
seg, seg_period, ter, ter_period, qua, qua_period, qui, qui_period, sex, sex_period, sab, sab_period, office_hours, by_scheduling, partner,
profession_id, place_service_id) VALUES 
('PAULO EGYDIO', 'https://doc-admin-jacomo.s3.sa-east-1.amazonaws.com/padrao-M.png', '951753', 'PAULO SERGIO EGYDIO', 
'(16)99212-7147', 'paulo@gmail.com', TIMESTAMP WITH TIME ZONE '2020-07-13T20:50:07.12345Z', 
'Médico chefe da residência médica vascular da Santa Casa de Ribeirão Preto',
true, 'MANHÃ', true, 'MANHÃ', true, 'MANHÃ', false, '', true, 'MANHÃ', true, 'MANHÃ', 'TER Das 08:00 às 11:00 / QUI Após às 16:00',
false, true, 6, 2);

INSERT INTO tb_professional_specialization (professional_id, specialization_id) VALUES (3, 2);
INSERT INTO tb_professional_specialization (professional_id, specialization_id) VALUES (3, 5);

INSERT INTO tb_health_professional (card_name, img_url, register, name, phone, email, birth_date, resume, 
seg, seg_period, ter, ter_period, qua, qua_period, qui, qui_period, sex, sex_period, sab, sab_period, office_hours, by_scheduling, partner,
profession_id, place_service_id) VALUES 
('LUIZ MEGA', 'https://doc-admin-jacomo.s3.sa-east-1.amazonaws.com/padrao-M.png', '658423', 'LUIZ CLAUDIO MEGA', 
'(16)99212-7147', 'paulo@gmail.com', TIMESTAMP WITH TIME ZONE '2020-07-13T20:50:07.12345Z', 
'Médico chefe da residência médica vascular da Santa Casa de Ribeirão Preto',
true, 'MANHÃ', true, 'MANHÃ', true, 'MANHÃ', false, '', true, 'MANHÃ', true, 'MANHÃ', 'TER Das 08:00 às 11:00 / QUI Após às 16:00',
false, true, 2, 1);

INSERT INTO tb_professional_specialization (professional_id, specialization_id) VALUES (4, 2);
INSERT INTO tb_professional_specialization (professional_id, specialization_id) VALUES (4, 5);

INSERT INTO tb_health_professional (card_name, img_url, register, name, phone, email, birth_date, resume, 
seg, seg_period, ter, ter_period, qua, qua_period, qui, qui_period, sex, sex_period, sab, sab_period, office_hours, by_scheduling, partner,
profession_id, place_service_id) VALUES 
('WILLIAM PAULA', 'https://doc-admin-jacomo.s3.sa-east-1.amazonaws.com/padrao-M.png', '95961', 'WILLIAM VAGNER DE PAULA', 
'(16)99212-7147', 'paulo@gmail.com', TIMESTAMP WITH TIME ZONE '2020-07-13T20:50:07.12345Z', 
'Médico chefe da residência médica vascular da Santa Casa de Ribeirão Preto',
true, 'TARDE', true, 'TARDE', false, '', true, 'TARDE', false, '', true, 'MANHÃ', 'TER Das 08:00 às 11:00 / QUI Após às 16:00',
false, true, 4, 1);

INSERT INTO tb_professional_specialization (professional_id, specialization_id) VALUES (5, 4);

INSERT INTO tb_health_professional (card_name, img_url, register, name, phone, birth_date, resume, 
seg, seg_period, ter, ter_period, qua, qua_period, qui, qui_period, sex, sex_period, sab, sab_period, office_hours, by_scheduling, partner,
profession_id, place_service_id) VALUES 
('FERNANDO SILVA', 'https://doc-admin-jacomo.s3.sa-east-1.amazonaws.com/padrao-M.png', '65852', 'FERNANDO CESAR SILVA', 
'(16)99212-7147', TIMESTAMP WITH TIME ZONE '2020-07-13T20:50:07.12345Z', 
'Médico chefe da residência médica vascular da Santa Casa de Ribeirão Preto',
false, '', true, 'MANHÃ', false, '', true, 'MANHÃ', false, '', true, 'MANHÃ', 'TER Das 08:00 às 11:00 / QUI Após às 16:00',
false, true, 12, 4);

INSERT INTO tb_professional_specialization (professional_id, specialization_id) VALUES (6, 17);

INSERT INTO tb_health_professional (card_name, img_url, register, name, phone, email, birth_date, resume, 
seg, seg_period, ter, ter_period, qua, qua_period, qui, qui_period, sex, sex_period, sab, sab_period, office_hours, by_scheduling, partner,
profession_id, place_service_id) VALUES 
('FRANCISCO CARDOSO', 'https://doc-admin-jacomo.s3.sa-east-1.amazonaws.com/padrao-M.png', '36745', 'FRANCISCO JOSE CARDOSO', 
'(16)99212-7147', 'paulo@gmail.com', TIMESTAMP WITH TIME ZONE '2020-07-13T20:50:07.12345Z', 
'Médico chefe da residência médica vascular da Santa Casa de Ribeirão Preto',
false, '', true, 'MANHÃ', false, '', true, 'MANHÃ', false, '', false, '', 'TER Das 08:00 às 11:00 / QUI Após às 16:00',
false, true, 8, 4);

INSERT INTO tb_professional_specialization (professional_id, specialization_id) VALUES (7, 3);

INSERT INTO tb_health_professional (card_name, img_url, register, name, phone, email, birth_date, resume, 
seg, seg_period, ter, ter_period, qua, qua_period, qui, qui_period, sex, sex_period, sab, sab_period, office_hours, by_scheduling, partner,
profession_id, place_service_id) VALUES 
('FRANCO BRASIL', 'https://doc-admin-jacomo.s3.sa-east-1.amazonaws.com/padrao-M.png', '45258', 'FRANCO CANIZO BRASIL', 
'(16)99212-7147', 'paulo@gmail.com', TIMESTAMP WITH TIME ZONE '2020-07-13T20:50:07.12345Z', 
'Médico chefe da residência médica vascular da Santa Casa de Ribeirão Preto',
true, 'MANHÃ', true, 'MANHÃ', true, 'MANHÃ', false, '', true, 'MANHÃ', true, 'MANHÃ', 'TER Das 08:00 às 11:00 / QUI Após às 16:00',
false, true, 12, 6);

INSERT INTO tb_professional_specialization (professional_id, specialization_id) VALUES (8, 17);

INSERT INTO tb_health_professional (card_name, img_url, register, name, phone, email, birth_date, resume, 
seg, seg_period, ter, ter_period, qua, qua_period, qui, qui_period, sex, sex_period, sab, sab_period, office_hours, by_scheduling, partner,
profession_id, place_service_id) VALUES 
('WILLER MADUREIRA', 'https://doc-admin-jacomo.s3.sa-east-1.amazonaws.com/padrao-M.png', '357985', 'WILLER MADUREIRA', 
'(16)99212-7147', 'paulo@gmail.com', TIMESTAMP WITH TIME ZONE '2020-07-13T20:50:07.12345Z', 
'Médico chefe da residência médica vascular da Santa Casa de Ribeirão Preto',
true, 'TARDE', true, 'MANHÃ', true, 'MANHÃ', false, '', true, 'MANHÃ', true, 'MANHÃ', 'TER Das 08:00 às 11:00 / QUI Após às 16:00',
false, true, 6, 5);

INSERT INTO tb_professional_specialization (professional_id, specialization_id) VALUES (9, 5);

INSERT INTO tb_medical_visit (visit_date, success, description, health_pro_id) VALUES (
'2021-10-18', true, 'Teste 2021-10-18', 3);

INSERT INTO tb_medical_visit (visit_date, success, description, health_pro_id) VALUES (
'2021-10-18', true, 'Teste 2021-10-18', 1);

INSERT INTO tb_medical_visit (visit_date, success, description, health_pro_id) VALUES (
'2021-10-19', true, 'Teste 2021-10-19', 4);

INSERT INTO tb_medical_visit (visit_date, success, description, health_pro_id) VALUES (
'2021-10-19', false, 'Teste 2021-10-19', 1);

INSERT INTO tb_medical_visit (visit_date, success, description, health_pro_id) VALUES (
'2021-10-19', false, 'Teste 2021-10-19', 3);

INSERT INTO tb_social_visit (visit_date, success, description, social_pro_id) VALUES (
'2021-10-19', false, 'Teste 2021-10-19', 3);