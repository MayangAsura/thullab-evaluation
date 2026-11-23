-- +goose up

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email VARCHAR(200) NOT NULL,
  phone_number VARCHAR(200) NOT NULL,
  password VARCHAR(200) NOT NULL,
  address TEXT NULL,
  api_key VARCHAR(64) NOT NULL DEFAULT encode(sha256(random()::text::bytea), 'hex'),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  created_by UUID NOT NULL,
  updated_at TIMESTAMPTZ,
  updated_by UUID NULL,
  deleted_at TIMESTAMPTZ NULL,
  deleted_by UUID NULL
);

-- +goose down

DROP TABLE IF EXISTS users;