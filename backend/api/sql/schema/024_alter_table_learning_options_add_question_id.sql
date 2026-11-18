-- +goose up

ALTER TABLE learning_options ADD COLUMN question_id UUID NOT NULL;

-- +goose down

ALTER TABLE learning_options DROP COLUMN IF EXISTS question_id;