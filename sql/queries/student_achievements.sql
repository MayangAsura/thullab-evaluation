-- name: CreateStudentAchievement :one

INSERT INTO student_achievements (user_id, class_id, skill_id, point)
      VALUES ($1, $2, $3, $4)

RETURNING *;


-- name: GetStudentAchievements :many

SELECT sa.*, c.name AS class_name, s.name AS skill_name FROM student_achievements sa
            LEFT JOIN skills s ON s.id = sa.skill_id
            LEFT JOIN classes c ON c.id = sa.class_id
            WHERE sa.user_id = $1 AND sa.deleted_at is null
            GROUP BY sa.class_id;