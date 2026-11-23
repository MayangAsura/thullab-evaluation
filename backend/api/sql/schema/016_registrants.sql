-- +goose up

CREATE TABLE registrants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(200) NOT NULL,
  phone_number VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL,
  address VARCHAR(200) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  created_by UUID NOT NULL,
  updated_at TIMESTAMPTZ,
  updated_by UUID NULL,
  deleted_at TIMESTAMPTZ NULL,
  deleted_by UUID NULL
);

-- +goose down
DROP TABLE IF EXISTS registrants;