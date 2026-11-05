-- +goose up

CREATE TABLE speaker_classes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id UUID NOT NULL,
  user_id UUID NOT NULL
);

-- +goose down
DROP TABLE IF EXISTS speaker_classes;