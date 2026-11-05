-- name: CreateLearningContent :one

INSERT INTO learning_contents (
  name, content_type, level, learning_hour, duration, is_random_questions, is_random_answers, num_questions, question_types, status, created_at, updated_at, deleted_at, created_by, updated_by, deleted_by
)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)

RETURNING *;

-- name: GetLearningContents :many
SELECT * FROM learning_contents lc
          WHERE lc.deleted_at is null;


-- name: GetClassLearningContents :many

SELECT lc.* FROM learning_contents lc
            LEFT JOIN learning_classes lcl ON lcl.learning_id = lc.id
            RIGHT JOIN classes c ON c.id = lcl.class_id
        WHERE c.id = $1
        AND lc.deleted_at is null;

-- name: GetLearningContentByID :many

SELECT * FROM learning_contents WHERE id = $1 AND deleted_at is null;

-- name: GetLearningContentStudentResponse :many

SELECT * FROM learning_contents lc
      LEFT JOIN learning_responses lr ON lc.id = lr.learning_id
      WHERE lr.user_id = $1 AND lr.id = $2 AND lr.deleted_at is null AND lc.deleted_at is null;








