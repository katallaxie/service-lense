package ports

import (
	"github.com/katallaxie/service-lense/internal/models"
)

// LensRepository ...
type LensRepository interface {
	// AddLens a new spec.
	AddLens(id string, lens models.Lens) error
	// GetLens a spec.
	GetLens(id string) (models.Lens, error)
	// ListLens returns a list of specs.
	ListLens() ([]models.Lens, error)
	// Update updates a spec.
	UpdateLens(id string, lens models.Lens) error
	// Delete deletes a spec.
	DeleteLens(id string) error
}

// LensRepositoryUnimplemented ...
type LensRepositoryUnimplemented struct{}

// Add ...
func (l *LensRepositoryUnimplemented) AddLens(id string, lens models.Lens) error {
	return nil
}

// Get ...
func (l *LensRepositoryUnimplemented) GetLens(id string) (models.Lens, error) {
	return models.Lens{}, nil
}

// List ...
func (l *LensRepositoryUnimplemented) ListLens() ([]models.Lens, error) {
	return []models.Lens{}, nil
}

// Update ...
func (l *LensRepositoryUnimplemented) UpdateLens(id string, lens models.Lens) error {
	return nil
}

// Delete ...
func (l *LensRepositoryUnimplemented) DeleteLens(id string) error {
	return nil
}

// WorkloadRepository ...
type WorkloadRepository interface {
	// AddWorkload a new workload.
	AddWorkload(id string, workload models.Workload) error
	// GetWorkload a workload.
	GetWorkload(id string) (models.Workload, error)
	// ListWorkload returns a list of workloads.
	ListWorkload() ([]models.Workload, error)
	// UpdateWorkload updates a workload.
	UpdateWorkload(id string, workload models.Workload) error
	// DeleteWorkload deletes a workload.
	DeleteWorkload(id string) error
}

// WorkloadRepositoryUnimplemented ...
type WorkloadRepositoryUnimplemented struct{}

// Add ...
func (w *WorkloadRepositoryUnimplemented) AddWorkload(id string, workload models.Workload) error {
	return nil
}

// Get ...
func (w *WorkloadRepositoryUnimplemented) GetWorkload(id string) (models.Workload, error) {
	return models.Workload{}, nil
}

// List ...
func (w *WorkloadRepositoryUnimplemented) ListWorkload() ([]models.Workload, error) {
	return []models.Workload{}, nil
}

// Update ...
func (w *WorkloadRepositoryUnimplemented) UpdateWorkload(id string, workload models.Workload) error {
	return nil
}

// Delete ...
func (w *WorkloadRepositoryUnimplemented) DeleteWorkload(id string) error {
	return nil
}
