-- +goose up

ALTER TABLE users ADD COLUMN created_by UUID NOT NULL;

-- +goose down

ALTER TABLE users DROP COLUMN IF EXISTS created_by;