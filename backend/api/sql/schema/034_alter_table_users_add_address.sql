-- +goose up

ALTER TABLE users ADD COLUMN address TEXT NULL;

-- +goose down

ALTER TABLE users DROP COLUMN IF EXIST address;