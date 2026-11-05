-- name: CreateLearningResponse :one

INSERT INTO learning_responses (class_id, user_id, learning_id, total_point, finished_at)
      VALUES ($1, $2, $3, $4, $5)

RETURNING *;

-- name: StartLearningContentResponse :many

INSERT INTO learning_responses (class_id, user_id, learning_id, total_point)
      VALUES ($1, $2, $3, $4)

RETURNING *;

INSERT INTO student_classes (user_id, class_id, learning_status, learning_progress)
      VALUES ($1, $2, $3, $4)

RETURNING *;

-- name: ResumeLearningContentResponse :exec

UPDATE learning_responses SET updated_at = now() WHERE learning_id = $1 AND user_id = $2 AND deleted_at is null;

UPDATE student_classes SET learning_status = $3, learning_proggres = $4 WHERE user_id = $5 AND class_id = $6 AND deleted_at is null;

-- name: CompleteLearningContentResponse :exec

UPDATE learning_responses SET finished_at = now(), updated_at = now() WHERE learning_id = $1 AND user_id = $2 AND deleted_at is null;

UPDATE student_classes SET learning_status = $1, learning_proggres = $2 WHERE user_id = $3 AND class_id = $4 AND deleted_at is null;

-- name: UpdateLearningResponse :exec

UPDATE learning_responses SET total_point = $1, finished_at = $2, updated_at = $3
      WHERE id = $4 AND deleted_at is null;

-- name: GetLearningResponseByUserIDAndLearningID :one

SELECT * FROM learning_responses
      WHERE user_id = $1 AND learning_id = $2 AND deleted_at is null;