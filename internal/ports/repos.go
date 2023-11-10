package ports

import (
	"github.com/katallaxie/service-lense/internal/models"
)

// LensRepository ...
type LensRepository interface {
	// Add a new spec.
	Add(id string, lens models.Lens) error
	// Get a spec.
	Get(id string) (models.Lens, error)
	// List returns a list of specs.
	List() ([]models.Lens, error)
	// Update updates a spec.
	Update(id string, lens models.Lens) error
	// Delete deletes a spec.
	Delete(id string) error
}

// LensRepositoryUnimplemented ...
type LensRepositoryUnimplemented struct{}

// Add ...
func (l *LensRepositoryUnimplemented) Add(id string, lens models.Lens) error {
	return nil
}

// Get ...
func (l *LensRepositoryUnimplemented) Get(id string) (models.Lens, error) {
	return models.Lens{}, nil
}

// List ...
func (l *LensRepositoryUnimplemented) List() ([]models.Lens, error) {
	return []models.Lens{}, nil
}

// Update ...
func (l *LensRepositoryUnimplemented) Update(id string, lens models.Lens) error {
	return nil
}

// Delete ...
func (l *LensRepositoryUnimplemented) Delete(id string) error {
	return nil
}
