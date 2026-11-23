-- +goose up

ALTER TABLE users ADD COLUMN IF NOT EXISTS registrant_id UUID NOT NULL;

-- +goose down

ALTER TABLE users DROP COLUMN IF EXISTS registrant_id;