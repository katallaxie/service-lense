package adapters

import (
	"github.com/katallaxie/service-lense/internal/ports"
)

var _ ports.LenseRepository = (*SQLite)(nil)

// SQLite ...
type SQLite struct {
	ports.LeaseRepositoryUnimplemented
}

// NewSQLite ...
func NewSQLite() *SQLite {
	return &SQLite{}
}
