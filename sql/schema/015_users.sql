-- +goose up

CREATE TABLE users (
  id UUID PRIMARY KEY,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  name TEXT NOT NULL,
  user_type VARCHAR(50) NOT NULL DEFAULT 'student',
  api_key VARCHAR(64) NOT NULL DEFAULT encode(sha256(random()::text::bytea), 'hex')
);

-- +goose down

DROP TABLE users;