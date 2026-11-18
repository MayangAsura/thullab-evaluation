-- +goose up

ALTER TABLE registrants ADD COLUMN password VARCHAR(200) NOT NULL;

-- +goose down

ALTER TABLE registrants DROP COLUMN IF EXISTS password;
