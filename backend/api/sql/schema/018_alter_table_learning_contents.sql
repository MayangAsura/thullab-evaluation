-- +goose up

ALTER TABLE learning_contents ADD COLUMN max_points INT8 DEFAULT 0;

-- +goose down

ALTER TABLE learning_contents DROP COLUMN max_points;