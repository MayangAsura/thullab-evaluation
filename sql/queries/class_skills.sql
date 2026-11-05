-- name: CreateClassSkill :one

INSERT INTO class_skills (class_id, skill_id, point)
        VALUES ($1, $2, $3)

RETURNING *;

-- name: GetSkillByClass :many

SELECT s.id, s.name FROM class_skills cs
        LEFT JOIN skills s ON s.id = cs.skill_id
        WHERE cs.class_id = $1 AND cs.deleted_at is null;