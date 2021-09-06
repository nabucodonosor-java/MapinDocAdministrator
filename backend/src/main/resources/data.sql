INSERT INTO tb_user (name, img_url, email, password) VALUES ('User', 'https://pulis-book.s3.sa-east-1.amazonaws.com/user-padrao.png', 
'user@mapin.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG');

INSERT INTO tb_user (name, img_url, email, password) VALUES ('Admin', 'https://pulis-book.s3.sa-east-1.amazonaws.com/admin.png', 
'admin@mapin.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG');

INSERT INTO tb_role (authority) VALUES ('ROLE_OPERATOR');
INSERT INTO tb_role (authority) VALUES ('ROLE_ADMIN');

INSERT INTO tb_user_role (user_id, role_id) VALUES (1, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 2);

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

INSERT INTO tb_specialty (name) VALUES ('INDEFINIDA');
INSERT INTO tb_specialty (name) VALUES ('ENDOCRINOLOGIA');
INSERT INTO tb_specialty (name) VALUES ('ORTOPEDIA');
INSERT INTO tb_specialty (name) VALUES ('NEUROCIRURGIA');
INSERT INTO tb_specialty (name) VALUES ('NEUROLOGIA');
INSERT INTO tb_specialty (name) VALUES ('REUMATOLOGIA');
INSERT INTO tb_specialty (name) VALUES ('VASCULAR');

INSERT INTO tb_place_service (name, cep, street, complement, district, city, state) VALUES 
('Local Padrão', '14020050', 'RUA AMADEU AMARAL', '684', 'VILA SEIXAS', 'RIBEIRAO PRETO', 'SP');

INSERT INTO tb_place_service (name, cep, street, complement, district, city, state) VALUES 
('Santa Casa Araraquara', '14801150', 'RUA JOSE BONIFACIO', '794', 'CENTRO', 'ARARAQUARA', 'SP');

INSERT INTO tb_place_service (name, cep, street, complement, district, city, state) VALUES 
('IOT Araraquara', '14801250', 'RUA VOLUNTARIOS DA PATRIA', '2199', 'CENTRO', 'ARARAQUARA', 'SP');

INSERT INTO tb_place_service (name, cep, street, complement, district, city, state) VALUES 
('Clínica de Ortopedia e Traumatologia', '14801190', 'AV MAUA', '387', 'CENTRO', 'ARARAQUARA', 'SP');

INSERT INTO tb_place_service (name, cep, street, complement, district, city, state) VALUES 
('Medicina Esportiva Dr Guido Tsuha', '14800360', 'RUA PADRE DUARTE', '151 SALA 145', 'JD NOVA AMERICA', 'ARARAQUARA', 'SP');

INSERT INTO tb_place_service (name, cep, street, complement, district, city, state) VALUES 
('Núcleo de Ortopedia e Coluna', '14800360', 'RUA PADRE DUARTE', '151 SALA 88', 'JD NOVA AMERICA', 'ARARAQUARA', 'SP');

INSERT INTO tb_place_service (name, cep, street, complement, district, city, state) VALUES 
('Instituto de Ortopedia Especializada', '14802408', 'AV DR GASTÃO VIDIGAL', '75', 'JD PRIMAVERA', 'ARARAQUARA', 'SP');

INSERT INTO tb_place_service (name, cep, street, complement, district, city, state) VALUES 
('Clínica Vascular e Estética Dra. Ana Scabello', '14801210', 'AV SÃO GERALDO', '269', 'CENTRO', 'ARARAQUARA', 'SP');

INSERT INTO tb_place_service (name, cep, street, complement, district, city, state) VALUES 
('Dr. Fernando Linares - Consultório Vascular', '14801534', 'AV RODRIGO FERNANDO GRILLO', '207 SALA 208', 'JS DOS MANACÁS', 'ARARAQUARA', 'SP');

INSERT INTO tb_place_service (name, cep, street, complement, district, city, state) VALUES 
('Clínica Dr. Rodrigo Gonçalves', '14801170', 'AV PRUDENTE DE MORAES', '1234', 'SÃO GERALDO', 'ARARAQUARA', 'SP');


INSERT INTO tb_doctor (img_url, crm, name, phone, email, birth_date, resume, 
seg, ter, qua, qui, sex, office_hours, 
specialty_id, place_service_id) VALUES 
('https://doc-admin-jacomo.s3.sa-east-1.amazonaws.com/LUIZ+CLAUDIO+FONTES+MEGA.png', '67598', 'LUIZ CLAUDIO FONTES MEGA', 
'', 'drmegavascular@gmail.com', TIMESTAMP WITH TIME ZONE '2020-07-13T20:50:07.12345Z', 
'Médico chefe da residência médica vascular da Santa Casa de Ribeirão Preto',
false, true, false, true, false, 'TER Das 08:00 às 11:00 / QUI Após às 16:00',
6, 2);

INSERT INTO tb_doctor_specialization (doctor_id, specialization_id) VALUES (1, 1);
INSERT INTO tb_doctor_specialization (doctor_id, specialization_id) VALUES (1, 4);

