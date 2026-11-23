package sqlnullint64util

import (

	"database/sql"
)

func ToNullInt64(i int64) sql.NullInt64 {

	return sql.NullInt64{
		Int64: int64(i),
		Valid: true,
	}
}