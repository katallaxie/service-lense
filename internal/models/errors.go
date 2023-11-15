package models

// Error ...
type Error struct {
	Code    error
	Message string
}

// FromError ...
func FromError(err error) Error {
	return Error{
		Code:    err,
		Message: err.Error(),
	}
}

// BadRequest ...
type BadRequest Error
