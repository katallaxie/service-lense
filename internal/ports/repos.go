package ports

import (
	"github.com/katallaxie/service-lense/internal/models"
)

// LenseRepository ...
type LenseRepository interface {
	// Add a new spec.
	Add(id string, lense models.Lense) error
	// Get a spec.
	Get(id string) (models.Lense, error)
	// List returns a list of specs.
	List() ([]models.Lense, error)
	// Update updates a spec.
	Update(id string, lense models.Lense) error
	// Delete deletes a spec.
	Delete(id string) error
}

// LeaseRepositoryUnimplemented ...
type LeaseRepositoryUnimplemented struct{}

// Add ...
func (l *LeaseRepositoryUnimplemented) Add(id string, lense models.Lense) error {
	return nil
}

// Get ...
func (l *LeaseRepositoryUnimplemented) Get(id string) (models.Lense, error) {
	return models.Lense{}, nil
}

// List ...
func (l *LeaseRepositoryUnimplemented) List() ([]models.Lense, error) {
	return []models.Lense{}, nil
}

// Update ...
func (l *LeaseRepositoryUnimplemented) Update(id string, lense models.Lense) error {
	return nil
}

// Delete ...
func (l *LeaseRepositoryUnimplemented) Delete(id string) error {
	return nil
}
