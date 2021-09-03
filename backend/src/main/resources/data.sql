INSERT INTO tb_user (name, img_url, email, password) VALUES ('User', 'https://pulis-book.s3.sa-east-1.amazonaws.com/user-padrao.png', 
'user@mapin.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG');

INSERT INTO tb_user (name, img_url, email, password) VALUES ('Admin', 'https://pulis-book.s3.sa-east-1.amazonaws.com/admin.png', 
'admin@mapin.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG');

INSERT INTO tb_role (authority) VALUES ('ROLE_OPERATOR');
INSERT INTO tb_role (authority) VALUES ('ROLE_ADMIN');

INSERT INTO tb_user_role (user_id, role_id) VALUES (1, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 2);

INSERT INTO tb_place_service (name, cep, street, complement, district, city, state) VALUES 
('Santa Casa Rib. Preto', '14085000', 'AV SAUDADE', '456', 'CAMPOS ELISIOS', 'RIBEIRAO PRETO', 'SP');

INSERT INTO tb_place_service (name, cep, street, complement, district, city, state) VALUES 
('CEORT', '14025020', 'RUA ELISEU GUILHERME', '708', 'JD SUMARE', 'RIBEIRAO PRETO', 'SP');

INSERT INTO tb_place_service (name, cep, street, complement, district, city, state) VALUES 
('Santa Casa Araraquara', '14801150', 'RUA JOSE BONIFACIO', '794', 'CENTRO', 'ARARAQUARA', 'SP');

INSERT INTO tb_place_service (name, cep, street, complement, district, city, state) VALUES 
('IOT Araraquara', '14801250', 'RUA VOLUNTARIOS DA PATRIA', '2199', 'CENTRO', 'ARARAQUARA', 'SP');

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

INSERT INTO tb_specialty (name) VALUES ('ENDOCRINOLOGIA');
INSERT INTO tb_specialty (name) VALUES ('ORTOPEDIA');
INSERT INTO tb_specialty (name) VALUES ('NEUROCIRURGIA');
INSERT INTO tb_specialty (name) VALUES ('NEUROLOGIA');
INSERT INTO tb_specialty (name) VALUES ('REUMATOLOGIA');
INSERT INTO tb_specialty (name) VALUES ('VASCULAR');

INSERT INTO tb_office_hours (seg, ter, qua, qui, sex, description, place_service_id) VALUES 
(true, false, true, false, true, 'SEG Das 08:00 às 11:00 / QUA e SEX Após às 16:00', 1);

INSERT INTO tb_office_hours (seg, ter, qua, qui, sex, description, place_service_id) VALUES 
(false, true, false, true, false, 'TER Das 08:00 às 11:00 / QUI Após às 16:00', 1);

INSERT INTO tb_office_hours (seg, ter, qua, qui, sex, description, place_service_id) VALUES 
(true, false, true, false, true, 'SEG Das 08:00 às 11:00 / QUA e SEX Após às 16:00', 2);

INSERT INTO tb_office_hours (seg, ter, qua, qui, sex, description, place_service_id) VALUES 
(false, true, false, true, false, 'TER Das 08:00 às 11:00 / QUI Após às 16:00', 2);

INSERT INTO tb_office_hours (seg, ter, qua, qui, sex, description, place_service_id) VALUES 
(true, false, true, false, true, 'SEG Das 08:00 às 11:00 / QUA e SEX Após às 16:00', 3);

INSERT INTO tb_office_hours (seg, ter, qua, qui, sex, description, place_service_id) VALUES 
(false, true, false, true, false, 'TER Das 08:00 às 11:00 / QUI Após às 16:00', 3);

INSERT INTO tb_office_hours (seg, ter, qua, qui, sex, description, place_service_id) VALUES 
(true, false, true, false, true, 'SEG Das 08:00 às 11:00 / QUA e SEX Após às 16:00', 4);

INSERT INTO tb_office_hours (seg, ter, qua, qui, sex, description, place_service_id) VALUES 
(false, true, false, true, false, 'TER Das 08:00 às 11:00 / QUI Após às 16:00', 4);

INSERT INTO tb_doctor (img_url, crm, name, phone, email, birth_date, resume, specialty_id, office_hours_id) VALUES 
('https://doc-admin-jacomo.s3.sa-east-1.amazonaws.com/LUIZ+CLAUDIO+FONTES+MEGA.png', '67598', 'LUIZ CLAUDIO FONTES MEGA', 
'', 'drmegavascular@gmail.com', TIMESTAMP WITH TIME ZONE '2020-07-13T20:50:07.12345Z', 
'Médico chefe da residência médica vascular da Santa Casa de Ribeirão Preto', 6, 1);

INSERT INTO tb_doctor_specialization (doctor_id, specialization_id) VALUES (1, 1);
INSERT INTO tb_doctor_specialization (doctor_id, specialization_id) VALUES (1, 4);

INSERT INTO tb_doctor (img_url, crm, name, phone, email, birth_date, resume, specialty_id, office_hours_id) VALUES 
('https://doc-admin-jacomo.s3.sa-east-1.amazonaws.com/RENAN+DE+PAULA+SILVEIRA+RE.png', '140517', 'RENAN DE PAULA SILVEIRA RE', 
'', '', TIMESTAMP WITH TIME ZONE '2020-07-13T20:50:07.12345Z', 
'Médico preceptor da residência médica vascular da Santa Casa de Ribeirão Preto', 6, 2);

INSERT INTO tb_doctor_specialization (doctor_id, specialization_id) VALUES (2, 1);
INSERT INTO tb_doctor_specialization (doctor_id, specialization_id) VALUES (2, 4);