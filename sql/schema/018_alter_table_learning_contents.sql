-- +goose up

ALTER TABLE learning_contents ADD COLUMN max_points INT8 DEFAULT 0;
-- ALTER TABLE learning_contents ADD COLUMN question_types VARCHAR(100) NULL;

-- +goose down

ALTER TABLE learning_contents DROP COLUMN max_points;
-- ALTER TABLE DROP COLUMN question_types;