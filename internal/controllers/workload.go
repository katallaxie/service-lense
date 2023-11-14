package controllers

import (
	"context"

	"github.com/katallaxie/service-lense/internal/models"
	"github.com/katallaxie/service-lense/internal/ports"
)

// WorkloadController ...
type WorkloadController struct {
	db ports.WorkloadRepository
}

// NewWorkloadController ...
func NewWorkloadController(db ports.WorkloadRepository) *WorkloadController {
	return &WorkloadController{
		db: db,
	}
}

// Get ...
func (c *WorkloadController) Get(ctx context.Context, id string) (*models.Workload, error) {
	return c.db.GetWorkload(ctx, id)
}

// List ...
func (c *WorkloadController) List(ctx context.Context) ([]*models.Workload, error) {
	return c.db.ListWorkload(ctx)
}

// Add ...
func (c *WorkloadController) Add(ctx context.Context, id string, workload *models.Workload) error {
	return c.db.AddWorkload(ctx, id, workload)
}

// Update ...
func (c *WorkloadController) Update(ctx context.Context, id string, workload *models.Workload) error {
	return c.db.UpdateWorkload(ctx, id, workload)
}

// Delete ...
func (c *WorkloadController) Delete(ctx context.Context, id string) error {
	return c.db.DeleteWorkload(ctx, id)
}
