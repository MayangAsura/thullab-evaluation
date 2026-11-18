-- +goose up

ALTER TABLE speaker_classes ADD COLUMN created_by UUID NOT NULL;

-- +goose down

ALTER TABLE speaker_classes DROP COLUMN IF EXISTS created_by;