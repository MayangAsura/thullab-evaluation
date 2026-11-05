-- +goose up

CREATE TABLE learning_classes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  learning_id UUID NOT NULL,
  class_id UUID NOT NULL,
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz NULL,
  deleted_at timestamptz NULL,
  created_by UUID NOT NULL,
  updated_by UUID NULL,
  deleted_by UUID NULL
);

-- +goose down

DROP TABLE IF EXISTS learning_classes;
