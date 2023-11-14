package ports

import (
	"context"

	"github.com/katallaxie/service-lense/internal/models"
)

// LensRepository ...
type LensRepository interface {
	// AddLens a new spec.
	AddLens(ctx context.Context, id string, lens *models.Lens) error
	// GetLens a spec.
	GetLens(ctx context.Context, id string) (*models.Lens, error)
	// ListLens returns a list of specs.
	ListLens(ctx context.Context) ([]*models.Lens, error)
	// Update updates a spec.
	UpdateLens(ctx context.Context, id string, lens *models.Lens) error
	// Delete deletes a spec.
	DeleteLens(ctx context.Context, id string) error
}

// LensRepositoryUnimplemented ...
type LensRepositoryUnimplemented struct{}

// Add ...
func (l *LensRepositoryUnimplemented) AddLens(ctx context.Context, id string, lens *models.Lens) error {
	return nil
}

// Get ...
func (l *LensRepositoryUnimplemented) GetLens(ctx context.Context, id string) (*models.Lens, error) {
	return &models.Lens{}, nil
}

// List ...
func (l *LensRepositoryUnimplemented) ListLens(ctx context.Context) ([]*models.Lens, error) {
	return []*models.Lens{}, nil
}

// Update ...
func (l *LensRepositoryUnimplemented) UpdateLens(ctx context.Context, id string, lens *models.Lens) error {
	return nil
}

// Delete ...
func (l *LensRepositoryUnimplemented) DeleteLens(ctx context.Context, id string) error {
	return nil
}

// WorkloadRepository ...
type WorkloadRepository interface {
	// AddWorkload a new workload.
	AddWorkload(ctx context.Context, id string, workload *models.Workload) error
	// GetWorkload a workload.
	GetWorkload(ctx context.Context, id string) (*models.Workload, error)
	// ListWorkload returns a list of workloads.
	ListWorkload(ctx context.Context) ([]*models.Workload, error)
	// UpdateWorkload updates a workload.
	UpdateWorkload(ctx context.Context, id string, workload *models.Workload) error
	// DeleteWorkload deletes a workload.
	DeleteWorkload(ctx context.Context, id string) error
}

// WorkloadRepositoryUnimplemented ...
type WorkloadRepositoryUnimplemented struct{}

// Add ...
func (w *WorkloadRepositoryUnimplemented) AddWorkload(ctx context.Context, id string, workload *models.Workload) error {
	return nil
}

// Get ...
func (w *WorkloadRepositoryUnimplemented) GetWorkload(ctx context.Context, id string) (*models.Workload, error) {
	return &models.Workload{}, nil
}

// List ...
func (w *WorkloadRepositoryUnimplemented) ListWorkload(ctx context.Context) ([]*models.Workload, error) {
	return []*models.Workload{}, nil
}

// Update ...
func (w *WorkloadRepositoryUnimplemented) UpdateWorkload(ctx context.Context, id string, workload *models.Workload) error {
	return nil
}

// Delete ...
func (w *WorkloadRepositoryUnimplemented) DeleteWorkload(ctx context.Context, id string) error {
	return nil
}
