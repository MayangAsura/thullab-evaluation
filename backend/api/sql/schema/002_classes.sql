-- +goose up

CREATE TABLE classes (
  id UUID PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  level VARCHAR(200) NOT NULL,
  category_id UUID NOT NULL,
  image VARCHAR(200) NOT NULL,
  learning_hour int64 NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  created_by UUID NOT NULL,
  updated_at TIMESTAMPTZ,
  updated_by UUID NULL,
  deleted_at TIMESTAMPTZ NULL,
  deleted_by UUID NULL
);

-- +goose down

DROP TABLE IF EXISTS classes;