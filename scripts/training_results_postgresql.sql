-- PostgreSQL version of training_results database
-- Converted from MySQL for Neon deployment

-- Create the training_results table
CREATE TABLE IF NOT EXISTS training_results (
  id SERIAL PRIMARY KEY,
  staff_id VARCHAR(20) UNIQUE NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  department VARCHAR(100) NOT NULL,
  acls_theory_marks INTEGER DEFAULT NULL,
  acls_practical_marks INTEGER DEFAULT NULL,
  bls_theory_marks INTEGER DEFAULT NULL,
  bls_practical_marks INTEGER DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create index on staff_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_staff_id ON training_results(staff_id);

-- Insert training data
INSERT INTO training_results (id, staff_id, full_name, department, acls_theory_marks, acls_practical_marks, bls_theory_marks, bls_practical_marks, created_at, updated_at) VALUES
(151, 'GH-056', 'Laat Peter Puondak', 'Admission', 72, 96, 98, 93, '2025-11-14 07:41:11', '2025-11-14 07:41:11'),
(152, 'GH-0327', 'Filberto Ponis Mboru', 'Pharmacy', 70, 68, 96, 80, '2025-11-14 07:41:11', '2025-11-14 07:41:11'),
(153, 'TEMP001', 'Martin Pitia Hilliary', '', 68, 92, 94, 87, '2025-11-14 07:41:11', '2025-11-14 07:41:11'),
(154, 'TEMP002', 'Levi Kondo Stephen', '', 67, 92, 90, 87, '2025-11-14 07:41:11', '2025-11-14 07:41:11'),
(155, 'TEMP003', 'Yokwe Lobor Lado', '', 65, 92, 90, 87, '2025-11-14 07:41:11', '2025-11-14 07:41:11'),
(156, 'TEMP004', 'Oloya James Taban', '', 65, 92, 88, 87, '2025-11-14 07:41:11', '2025-11-14 07:41:11'),
(157, 'GH-0255', 'Hellen Juston Anter', 'Nursing', 63, 92, 88, 87, '2025-11-14 07:41:11', '2025-11-14 07:41:11'),
(158, 'TEMP005', 'Young Malesh Aritab', '', 61, 60, 82, 67, '2025-11-14 07:41:11', '2025-11-14 07:41:11'),
(159, 'TEMP006', 'Taban Joshua Lasu', '', 60, 60, 80, 67, '2025-11-14 07:41:11', '2025-11-14 07:41:11'),
(160, 'GH-0301', 'Deng Simon Tut', 'Administration', NULL, NULL, 78, 0, '2025-11-14 07:41:11', '2025-11-14 07:41:11'),
(161, 'TEMP007', 'Matilda Joungle Clement', '', NULL, NULL, 78, 0, '2025-11-14 07:41:11', '2025-11-14 07:41:11'),
(162, 'TEMP008', 'Awatil Elia Saleh', '', 60, 96, 74, 93, '2025-11-14 07:41:11', '2025-11-14 07:41:11'),
(163, 'TEMP009', 'Sunday Wilson Lemi', '', 58, 60, 72, 67, '2025-11-14 07:41:11', '2025-11-14 07:41:11'),
(164, 'GH-083', 'Areng Abuot Manyang', 'Clinical Services', 57, 96, 72, 93, '2025-11-14 07:41:11', '2025-11-14 07:41:11'),
(165, 'GH-0391', 'Nelson Wani Alex Sokiri', 'Nurse', 55, 68, 70, 80, '2025-11-14 07:41:11', '2025-11-14 07:41:11'),
(166, 'TEMP010', 'Ganya Amos', '', 51, 60, 70, 67, '2025-11-14 07:41:11', '2025-11-14 07:41:11'),
(167, 'TEMP011', 'Emmanuella Juan Martin', '', 50, 68, 68, 80, '2025-11-14 07:41:11', '2025-11-14 07:41:11'),
(168, 'GH-0333', 'Madit Ngeny Wol', 'Clinical Services', 49, 60, 64, 67, '2025-11-14 07:41:11', '2025-11-14 07:41:11'),
(169, 'GH-0347', 'Akoc Achuil Ngor', 'Clinical Services', 48, 96, 62, 93, '2025-11-14 07:41:11', '2025-11-14 07:41:11'),
(170, 'GH-0392', 'Emmanuella John Francis', 'Nursing', 44, 60, 60, 67, '2025-11-14 07:41:11', '2025-11-14 07:41:11'),
(171, 'TEMP012', 'Meshcat Bashir Adam', '', 43, 92, 58, 87, '2025-11-14 07:41:11', '2025-11-14 07:41:11'),
(172, 'TEMP013', 'Khalda Garang Akot', '', 43, 96, 58, 93, '2025-11-14 07:41:11', '2025-11-14 07:41:11'),
(173, 'GH-0281', 'Suna Cireno Adaha', 'Nursing', NULL, NULL, 56, 0, '2025-11-14 07:41:11', '2025-11-14 07:41:11'),
(174, 'GH-0197', 'Susan Tingba Daniel', 'Nursing', 42, 68, 56, 80, '2025-11-14 07:41:11', '2025-11-14 07:41:11'),
(175, 'GH-0312', 'Mike Wuoi Achiek', 'Nursing', 42, 60, 54, 67, '2025-11-14 07:41:11', '2025-11-14 07:41:11'),
(176, 'GH-0353', 'Zuhur Omar', 'Nursing', 39, 68, 52, 80, '2025-11-14 07:41:11', '2025-11-14 07:41:11'),
(177, 'GH-0161', 'Martha Edward Kisanga', 'Nursing', 33, 60, 46, 67, '2025-11-14 07:41:11', '2025-11-14 07:41:11'),
(178, 'GH-0121', 'Rema Elias Angelo', 'Admission', 33, 96, 42, 93, '2025-11-14 07:41:11', '2025-11-14 07:41:11'),
(179, 'GH-0188', 'Firyal Ahmed', 'OR', 29, 68, 36, 80, '2025-11-14 07:41:11', '2025-11-14 07:41:11'),
(180, 'GH-0260', 'Maha Osman', 'OR', 25, 68, 32, 80, '2025-11-14 07:41:11', '2025-11-14 07:41:11');

-- Update the sequence to continue from the last ID
SELECT setval('training_results_id_seq', (SELECT MAX(id) FROM training_results));
