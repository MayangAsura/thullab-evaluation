-- +goose up

CREATE TABLE learning_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  option VARCHAR(250) NOT NULL,
  point int64 NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT NULL,
  deleted_at timestamptz DEFAULT NULL,
  created_by UUID NULL,
  deleted_by UUID NULL,
  updated_by UUID NULL
);

-- +goose down

DROP TABLE IF NOT EXIST learning_options;