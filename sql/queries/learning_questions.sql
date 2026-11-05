-- name: CreateLearningQuestion :one

INSERT INTO learning_questions (class_id, learning_id, question_order, question, question_type, answer, created_at, updated_at, deleted_at, created_by, updated_by, deleted_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)

RETURNING *;

-- name: GetLearningQuestionsByLearningContent :many

SELECT * FROM learning_questions lq
      LEFT JOIN learning_options lo ON lo.question_id = lq.id
      WHERE lq.learning_id = $1
      AND lq.deleted_at is null
      AND lo.deleted_at is null;