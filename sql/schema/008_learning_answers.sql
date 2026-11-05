-- +goose up

CREATE TABLE learning_answers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id UUID NOT NULL,
  option VARCHAR(200) NOT NULL,
  point INT8 NOT NULL DEFAULT 0
);

-- +goose down
DROP TABLE IF EXISTS learning_answers;