package controllers

import (
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

// GetLens ...
func (c *LensController) GetLens(id string) (models.Lens, error) {
	return c.db.GetLens(id)
}
