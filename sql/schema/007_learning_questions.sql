-- +goose up

CREATE TABLE learning_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id UUID NOT NULL,
  learning_id UUID NOT NULL,
  question_order INT64 NOT NULL,
  question VARCHAR(255) NOT NULL,
  question_type VARCHAR(200) NOT NULL,
  answer VARCHAR(200) NOT NULL,
  score INT64 NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NULL,
  deleted_at TIMESTAMPTZ NULL,
  created_by UUID NULL,
  updated_by UUID NULL,
  deleted_by UUID NULL
);

-- +goose down
DROP TABLE IF EXISTS learning_questions;