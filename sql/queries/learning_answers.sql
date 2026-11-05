-- name: CreateLearningAnswer :one

INSERT INTO learning_answers (question_id, option, point)
        VALUES ($1, $2, $3)

RETURNING *;