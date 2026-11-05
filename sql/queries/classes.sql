-- name: CreateClasses :one

INSERT INTO classes (name, level, category_id, image, learning_hour, created_by)
          VALUES ($1, $2, $3, $4, $5, $6)

RETURNING *;

-- name: GetClassByID :one
SELECT * FROM classes WHERE id = $1 AND deleted_at is null;

-- name: GetClasses :many
SELECT * FROM classes WHERE deleted_at is null;

-- name: GetClassesInprogress :one
SELECT c.id, c.name, c.level, c.category_id, c.learning_hour FROM classes c
        LEFT JOIN student_classes sc ON sc.class_id = c.id
        WHERE c.deleted_at is null AND sc.user_id = $1
            AND sc.learning_status = 'inprogress';

-- name: GetClassesCompleted :one
SELECT c.id, c.name, c.level, c.category_id, c.learning_hour FROM classes c
        LEFT JOIN student_classes sc ON sc.class_id = c.id
        WHERE c.deleted_at is null AND sc.user_id = $1
            AND sc.learning_status = 'completed';

        --     s.*, sp.*
        -- LEFT JOIN (
        --   SELECT cs.class_id, s.name FROM class_skills cs
        --           LEFT JOIN skills s ON s.id = cs.skill_id
        -- ) as s ON c.id = s.class_id
        -- LEFT JOIN (
        --   SELECT sc.class_id, sc.user_id, u.name, u.phone_number FROM speaker_classes sc
        --           LEFT JOIN users u ON u.id = sc.user_id
        -- ) as sp ON c.id = sp.class_id


