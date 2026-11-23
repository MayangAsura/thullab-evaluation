-- +goose up

CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(200) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  created_by UUID NOT NULL,
  updated_at TIMESTAMPTZ NULL,
  update_by UUID NULL,
  deleted_at timestamptz NULL,
  deleted_by UUID NULL
);

-- +goose down
DROP TABLE if Exists skills;
