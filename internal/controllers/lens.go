package controllers

import (
	"context"

	"github.com/katallaxie/service-lense/internal/models"
	"github.com/katallaxie/service-lense/internal/ports"
)

// LensController ...
type LensController struct {
	db ports.LensRepository
}

// NewLensController ...
func NewLensController(db ports.LensRepository) *LensController {
	return &LensController{
		db: db,
	}
}

// AddLens ...
func (c *LensController) AddLens(ctx context.Context, id string, lens models.Lens) error {
	return c.db.AddLens(id, lens)
}

// GetLens ...
func (c *LensController) GetLens(ctx context.Context, id string) (models.Lens, error) {
	return c.db.GetLens(id)
}
