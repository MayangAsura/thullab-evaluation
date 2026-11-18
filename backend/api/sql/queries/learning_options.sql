-- name: CreateLearningOption :one

INSERT INTO learning_options (question_id, option, point)
      VALUES ($1, $2, $3)

RETURNING *;

-- name: GetLearningOptionsByQuestionID :many

SELECT * FROM learning_options lo
      WHERE lo.question_id = $1 AND deleted_at is null;

-- name: GetLearningOptionAnswersByQuestionIDAndOptionID :one

SELECT * FROM learning_options lo
      WHERE lo.question_id = $1
      AND lo.id = $2
      AND lo.deleted_at is null;