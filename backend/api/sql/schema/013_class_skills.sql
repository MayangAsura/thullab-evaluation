-- +goose up


CREATE TABLE class_skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id UUID NOT NULL,
  skill_id UUID NOT NULL,
  point INT8 NOT NULL DEFAULT 0
);


-- +goose down
DROP TABLE IF EXISTS class_skills;