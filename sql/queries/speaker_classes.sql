-- name: CreateSpeakerClass :one

INSERT INTO speaker_classes (class_id, user_id, created_by)
      VALUES ($1, $2, $3)

RETURNING *;

-- name: GetSpeakerClasses :many
SELECT * FROM speaker_classes
      WHERE deleted_at is null;

-- name: GetSpeakersByClass :many

SELECT sc.user_id, u.name, u.phone_number FROM speaker_classes sc
            LEFT JOIN classes c ON c.id = sc.class_id
            LEFT JOIN users u ON u.id = sc.user_id
      WHERE sc.class_id = $1 AND sc.deleted_at is null AND c.deleted_at is null;
