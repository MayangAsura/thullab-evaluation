-- +goose up

ALTER TABLE classes ALTER COLUMN learning_hour TYPE int64;


-- +goose down

ALTER TABLE classes ALTER COLUMN learning_hour TYPE int8;