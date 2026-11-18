-- +goose up

ALTER TABLE users ADD COLUMN phone_number VARCHAR(200) NOT NULL;

-- +goose down

ALTER TABLE users DROP COLUMN IF EXISTS phone_number;