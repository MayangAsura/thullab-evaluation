-- +goose up

ALTER TABLE users ADD password VARCHAR(200) NOT NULL;

-- +goose down

ALTER TABLE users DROP COLUMN IF EXISTS password;