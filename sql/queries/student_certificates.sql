-- name: CreateCertificate :one

INSERT INTO student_certificates (name, class_id, user_id, file_id)
        VALUES ($1, $2, $3, $4)

RETURNING *;

-- name: GetUserCertificates :many

SELECT sc.*, c.name AS class_name, f.file_type, f.size AS file_size, f.file_url FROM student_certificates sc
        LEFT JOIN classes c ON c.id = sc.class_id
        LEFT JOIN files f ON f.id = sc.file_id
        WHERE sc.user_id = $1;
