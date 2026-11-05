-- name: CreateFiles :one

INSERT INTO files (name, file_type, file_url, size)
        VALUES ($1, $2, $3, $4)

RETURNING *;

-- name: GetFileByID :one

SELECT * FROM files
        WHERE deleted_at is null AND id = $1;