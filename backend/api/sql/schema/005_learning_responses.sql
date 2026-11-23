-- +goose up

CREATE TABLE learning_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  learning_id UUID NOT NULL,
  class_id UUID NOT NULL,
  user_id UUID NOT NULL,
  total_point INT8 NULL DEFAULT 0,
  finished_at timestamptz NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  created_by UUID NOT NULL,
  updated_at TIMESTAMPTZ,
  updated_by UUID NULL,
  deleted_at TIMESTAMPTZ NULL,
  deleted_by UUID NULL
);

-- +goose down
DROP TABLE IF EXISTS learning_responses;