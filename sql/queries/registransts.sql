-- name: CreateRegistrant :one

INSERT INTO registrants (
  name,
  phone_number,
  email,
  address,
  password
)
VALUES ( $1, $2, $3, $4, $5)

RETURNING *;


-- name: GetRegistrants :many

SELECT * FROM registrants
  WHERE deleted_at is null;
