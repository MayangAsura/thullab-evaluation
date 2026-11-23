-- +goose up

CREATE TABLE learning_response_details (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  learning_id UUID NOT NULL,
  class_id UUID NOT NULL,
  user_id UUID NOT NULL,
  response_id UUID NOT NULL,
  question_id UUID NOT NULL,
  answer VARCHAR(250) NOT NULL,
  point INT8 NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  created_by UUID NOT NULL,
  updated_at TIMESTAMPTZ,
  updated_by UUID NULL,
  deleted_at TIMESTAMPTZ NULL,
  deleted_by UUID NULL
);


-- +goose down
DROP TABLE IF EXISTS learning_response_details;

