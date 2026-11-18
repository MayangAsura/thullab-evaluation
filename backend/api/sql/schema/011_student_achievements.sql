-- +goose up

CREATE TABLE student_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  class_id UUID NOT NULL,
  skill_id UUID NOT NULL,
  point INT8 NOT NULL
);


-- +goose down
DROP TABLE IF EXISTS student_achievements;