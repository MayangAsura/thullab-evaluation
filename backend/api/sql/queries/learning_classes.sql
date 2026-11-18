-- name: CreateLearningClasses :one

INSERT INTO learning_classes ( learning_id, class_id, created_at, updated_at, deleted_at, created_by, updated_by, deleted_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)

RETURNING *;