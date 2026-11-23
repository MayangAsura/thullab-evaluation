package sqlnulltimeutil

import (

	"time"

	"database/sql"
)

func ToNullTime(t time.Time) sql.NullTime {
	return sql.NullTime{
		Time:  t,
		Valid: !t.IsZero(),
	}
}