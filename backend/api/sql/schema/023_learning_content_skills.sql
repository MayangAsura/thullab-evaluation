-- +goose up
CREATE TABLE learning_content_skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id UUID NOT NULL,
  learning_content_id UUID NOT NULL,
  skill_id UUID NOT NULL,
  created_at timestamptz DEFAULT now(),
  created_by UUID NULL,
  updated_at timestamptz NULL,
  updated_by UUID NULL,
  deleted_at timestamptz NULL,
  deleted_by UUID NULL
);

-- +goose down

DROP TABLE IF NOT EXIST learning_content_skills;

