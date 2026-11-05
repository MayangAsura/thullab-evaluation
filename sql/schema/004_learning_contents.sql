-- +goose up

CREATE TABLE learning_contents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(200) NOT NULL,
  content_type VARCHAR(200) NOT NULL,
  level VARCHAR(200) NOT NULL,
  learning_hour INT8 NOT NULL,
  duration INT8 NOT NULL,
  num_questions INT8 NOT NULL,
  is_random_questions BOOLEAN NOT NULL DEFAULT false,
  is_random_answers BOOLEAN NOT NULL DEFAULT true,
  question_types VARCHAR(200) NOT NULL,
  status VARCHAR(200) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NULL,
  deleted_at TIMESTAMPTZ NULL,
  created_by UUID NULL,
  updated_by UUID NULL,
  deleted_by UUID NULL
);

-- +goose down
DROP TABLE IF EXISTS learning_contents;