-- +goose up

ALTER TABLE users ALTER COLUMN id SET DEFAULT uuid_generate_v4();

-- +goose down

ALTER TABLE users ALTER COLUMN id DROP DEFAULT;