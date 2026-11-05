-- name: CreateUser :one

INSERT INTO users (id, created_at, updated_at, created_by, name, phone_number, password, user_type, api_key, registrant_id)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,
        encode(sha256(random()::text::bytea), 'hex')
        )

RETURNING *;

-- name: GetUserApiKey :one
SELECT * FROM users WHERE api_key = $1;

-- name: GetStudents :many

SELECT u.id, u.name, u.phone_number, u.created_at, u.updated_at, u.created_by, rg.address FROM users u
        LEFT JOIN registrants rg ON rg.id = u.registrant_id
        WHERE u.deleted_at is null AND u.user_type = 'student' AND rg.deleted_at is null;

-- name: GetUserByUsername :one

SELECT * FROM users
        WHERE deleted_at is null AND phone_number = $1;

-- name: UpdateUserPassword :exec

UPDATE users SET password = $2, updated_at = $3
        WHERE phone_number = $1 AND deleted_at is null;



