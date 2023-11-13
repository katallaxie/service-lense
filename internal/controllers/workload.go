package controllers

import (
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
func (c *WorkloadController) Get(id string) (models.Workload, error) {
	return c.db.GetWorkload(id)
}

// List ...
func (c *WorkloadController) List() ([]models.Workload, error) {
	return c.db.ListWorkload()
}

// Add ...
func (c *WorkloadController) Add(id string, workload models.Workload) error {
	return c.db.AddWorkload(id, workload)
}

// Update ...
func (c *WorkloadController) Update(id string, workload models.Workload) error {
	return c.db.UpdateWorkload(id, workload)
}

// Delete ...
func (c *WorkloadController) Delete(id string) error {
	return c.db.DeleteWorkload(id)
}
