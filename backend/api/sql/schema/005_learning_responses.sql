-- +goose up

CREATE TABLE learning_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  learning_id UUID NOT NULL,
  class_id UUID NOT NULL,
  user_id UUID NOT NULL,
  total_point int64 NULL DEFAULT 0,
  finished_at timestamptz NULL,
  updated_at timestamptz NULL
);

-- +goose down
DROP TABLE IF EXISTS learning_responses;