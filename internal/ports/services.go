package ports

import "github.com/katallaxie/service-lense/internal/models"

// LenseService ...
type LenseService interface {
	// Get a spec.
	Get(id string) (models.Lense, error)
}

// LenseServiceUnimplemented ...
type LenseServiceUnimplemented struct{}

// Get ...
func (l *LenseServiceUnimplemented) Get(id string) (models.Lense, error) {
	return models.Lense{}, nil
}
