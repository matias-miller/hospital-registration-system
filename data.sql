INSERT INTO `patient` (
  `first_name`, `last_name`, `date_of_birth`, 
  `gender`, `phone_number`, `address`
) 
VALUES 
  (
    'John', 'Doe', '1985-08-15', 'M', '555-123-4567', 
    '123 Main St'
  ), 
  (
    'Jane', 'Smith', '1990-03-25', 'F', 
    '555-987-6543', '456 Oak St'
  ), 
  (
    'Emily', 'Adams', '1982-11-07', 'F', 
    '555-444-3333', '1234 Elm St'
  ), 
  (
    'Michael', 'Roberts', '1974-06-21', 
    'M', '555-777-8888', '5678 Pine St'
  );

INSERT INTO `pharmacy` (
  `name`, `phone_number`, `address`
) 
VALUES 
  (
    'MediCare Pharmacy', '555-111-2222', 
    '789 Elm St'
  ), 
  (
    'Wellness Pharmacy', '555-333-4444', 
    '111 Maple St'
  ), 
  (
    'Family Pharmacy', '555-222-3333', 
    '2345 Maple St'
  ), 
  (
    'Friendly Pharmacy', '555-444-5555', 
    '6789 Oak St'
  );

INSERT INTO `outstanding_balance` (
  `patient_id`, `outstanding_balance`
) 
VALUES 
  (1, 250.00), 
  (2, 0.00), 
  (3, 100.00), 
  (4, 300.00);

INSERT INTO `doctor` (
  `name`, `phone_number`, `specialty`
) 
VALUES 
  (
    'Dr. Alice Brown', '555-555-5555', 
    'Cardiologist'
  ), 
  (
    'Dr. Bob Johnson', '555-666-7777', 
    'Dermatologist'
  ), 
  (
    'Dr. Carol White', '555-999-1111', 
    'Pediatrician'
  ), 
  (
    'Dr. David Green', '555-222-3333', 
    'Orthopedic Surgeon'
  );

INSERT INTO `clinic` (
  `name`, `address`, `phone_number`
) 
VALUES 
  (
    'Health Clinic', '222 Pine St', '555-888-9999'
  ), 
  (
    'Medical Center', '333 Willow St', 
    '555-000-1111'
  );

INSERT INTO `appointment` (
  `date`, `time`, `clinic_id`, `reason`, 
  `doc_id`, `patient_id`, `patient_checked_in`, 
  `pre_appointment_form`, `appointment_cost`
) 
VALUES 
  (
    '2023-05-01', '10:00:00', 1, 'Heart checkup', 
    1, 1, TRUE, 'Patient has a history of heart issues.', 
    150
  ), 
  (
    '2023-05-02', '14:30:00', 2, 'Skin rash', 
    2, 
-- Patient table
INSERT INTO `patient` (`first_name`, `last_name`, `date_of_birth`, `gender`, `phone_number`, `address`)
VALUES
('Alice', 'Smith', '1990-02-14', 'F', '555-1234', '123 Main St'),
('Bob', 'Jones', '1985-06-30', 'M', '555-5678', '456 Oak St'),
('Charlie', 'Brown', '1992-09-03', 'M', '555-9876', '789 Elm St');

-- Clinic table
INSERT INTO `clinic` (`name`, `address`, `phone_number`)
VALUES
('Main Street Clinic', '123 Main St', '555-5555'),
('Oak Street Clinic', '456 Oak St', '555-5555'),
('Elm Street Clinic', '789 Elm St', '555-5555');

-- Doctor table
INSERT INTO `doctor` (`name`, `phone_number`, `specialty`)
VALUES
('Dr. Johnson', '555-1111', 'General Medicine'),
('Dr. Lee', '555-2222', 'Pediatrics'),
('Dr. Kim', '555-3333', 'Cardiology');

-- Appointment table
INSERT INTO `appointment` (`date`, `time`, `clinic_id`, `reason`, `doc_id`, `patient_id`, `patient_checked_in`, `pre_appointment_form`, `appointment_cost`)
VALUES
('2023-04-20', '10:00:00', 1, 'Annual checkup', 1, 1, 0, 'No', 150.00),
('2023-04-21', '11:00:00', 2, 'Sore throat', 2, 2, 0, 'Yes', 75.00),
('2023-04-22', '12:00:00', 3, 'Chest pain', 3, 3, 0, 'No', 200.00);

-- Appointment summary table
INSERT INTO `appointment_summary` (`appt_id`, `patient_id`, `pres_treatment`, `notes`, `alt_treatment`)
VALUES
(1, 1, 'Blood pressure medication prescribed', 'Patient has high blood pressure', 'N/A'),
(2, 2, 'Antibiotics prescribed', 'Patient has strep throat', 'N/A'),
(3, 3, 'Referral to specialist', 'Patient may have heart condition', 'N/A');

-- Pharmacy table
INSERT INTO `pharmacy` (`name`, `phone_number`, `address`)
VALUES
('Main Street Pharmacy', '555-4444', '234 Main St'),
('Oak Street Pharmacy', '555-5555', '567 Oak St'),
('Elm Street Pharmacy', '555-6666', '890 Elm St');

-- Prescription table
INSERT INTO `prescription` (`quantity`, `drug`, `expiration_date`, `patient_id`)
VALUES
(30, 'Lisinopril', '2023-05-30', 1),
(20, 'Amoxicillin', '2023-06-15', 2),
(60, 'Atorvastatin', '2023-04-30', 3);

-- Outstanding balance table
INSERT INTO `outstanding_balance` (`patient_id`, `outstanding_balance`)
VALUES
(1, 0),
(2, 75.00),
(3, 200.00);

-- Patient primary doctor table
INSERT INTO `patient_primary_doctor` (`doc_id`, `patient