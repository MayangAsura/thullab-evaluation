-- +goose up

ALTER TABLE users ADD COLUMN user_type VARCHAR(100) DEFAULT 'student';

-- +goose down

ALTER TABLE users DROP COLUMN IF EXISTS user_type;