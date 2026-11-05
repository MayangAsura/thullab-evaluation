-- +goose up

CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(200) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  created_by UUID NOT NULL,
  deleted_at timestamptz NULL
);

-- +goose down
DROP TABLE if Exists skills;
