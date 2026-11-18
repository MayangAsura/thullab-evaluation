-- +goose up

CREATE TABLE student_classes (
  user_id UUID NOT NULL,
  class_id UUID NOT NULL,
  learning_status VARCHAR(100) NOT NULL,
  learning_progress INT8 NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by UUID NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  updated_by UUID NOT NULL,
  deleted_at TIMESTAMPTZ NOT NULL,
  deleted_by UUID NOT NULL
);

-- +goose down

DROP TABLE IF EXISTS student_classes;