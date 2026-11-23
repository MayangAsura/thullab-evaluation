-- +goose up

ALTER TABLE registrants ALTER COLUMN created_by DROP NOT NULL;


-- +goose down

ALTER TABLE registrants ALTER COLUMN IF EXISTS created_by ADD NOT NULL;