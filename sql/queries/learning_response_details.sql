-- name: CreateLearningResponseDetail :one

INSERT INTO learning_response_details (response_id, learning_id, user_id, class_id, question_id, answer, point)
      VALUES ($1, $2, $3, $4, $5, $6, $7)

RETURNING *;

-- name: GetLearningResponseDetailByResponseIDAndQuestionID :one

SELECT * FROM learning_response_details lrd
      WHERE lrd.response_id = $1 AND lrd.question_id = $2 AND lrd.deleted_at is null;