-- +goose up

ALTER TABLE users ADD COLUMN IF NOT EXISTS email VARCHAR(200) NOT NULL;

-- + goose down

ALTER TABLE users DROP COLUMN IF EXISTS email;