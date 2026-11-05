-- name: CreateLearningContentSkill :one

INSERT INTO learning_content_skills (class_id, learning_content_id, skill_id)
      VALUES($1, $2, $3)

RETURNING *;

-- name: SelectLearningContent :one

SELECT lcs.learning_content_id, lcs.skill_id, s.name FROM learning_content_skills lcs
      LEFT JOIN skills s ON s.id = lcs.skill_id
      LEFT JOIN classes c ON c.id = lcs.class_id
WHERE lcs.learning_content_id = $1 AND s.deleted_at is null;