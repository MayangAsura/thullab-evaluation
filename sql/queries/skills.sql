-- name: CreateSkill :one

INSERT INTO skills (name, created_by)
        VALUES ($1, $2)

RETURNING *;

-- name: GetSkills :many

SELECT * FROM skills
        WHERE deleted_at is null;

-- name: GetSkillByID :one

SELECT * FROM skills
        WHERE id = $1 AND deleted_at is null;