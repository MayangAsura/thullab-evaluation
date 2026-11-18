-- +goose up

ALTER TABLE learning_options ALTER COLUMN point TYPE int64;

-- +goose down

ALTER TABLE learning_options ALTER COLUMN point TYPE int32;