-- +goose upp

ALTER TABLE users ADD COLUMN registrant_id UUID NOT NULL;

-- +goose down

ALTER TABLE users DROP COLUMN IF EXISTS registrant_id;