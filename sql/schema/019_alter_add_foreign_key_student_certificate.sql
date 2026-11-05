-- +goose up

ALTER TABLE IF EXISTS student_certificates
    ADD CONSTRAINT class_id_fkey FOREIGN KEY (class_id)
    REFERENCES public.classes (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;
CREATE INDEX IF NOT EXISTS fki_class_id_fkey
    ON student_certificates(class_id);

-- ALTER TABLE student_certificates ADD FOREIGN KEY (class_id) REFERENCE id (class.id)

-- -- +goose down

-- ALTER TABLE student_cetificates DELETE FOREIGN KEY (class_id);

ALTER TABLE IF EXISTS student_certificates DROP CONSTRAINT class_id_fkey;