-- name: CreateStudentClasses :one

INSERT INTO student_classes (user_id, class_id, learning_status, learning_progress)
      VALUES ($1, $2, $3, $4)

RETURNING *;