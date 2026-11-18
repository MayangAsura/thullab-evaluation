-- +goose up

-- ALTER TABLE speaker_classes ADD COLUMN class_id UUID NOT NULL;

-- +goose down

-- ALTER TABLE speaker_classes DROP COLUMN IF EXISTS class_id;