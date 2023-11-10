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
func New(db ports.LensRepository) *LensController {
	return &LensController{
		db: db,
	}
}

// Get ...
func (c *LensController) Get(id string) (models.Lens, error) {
	return c.db.Get(id)
}
