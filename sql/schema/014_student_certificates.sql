-- +goose up

CREATE TABLE student_certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(200) NOT NULL,
  file_id UUID NOT NULL,
  user_id UUID NOT NULL,
  class_id UUID NOT NULL
);

-- +goose down
DROP TABLE IF EXISTS student_certificates;