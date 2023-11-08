package controllers

import (
	"github.com/katallaxie/service-lense/internal/models"
	"github.com/katallaxie/service-lense/internal/ports"
)

// LenseController ...
type LenseController struct {
	db ports.LenseRepository
}

// NewLenseController ...
func New(db ports.LenseRepository) *LenseController {
	return &LenseController{
		db: db,
	}
}

// Get ...
func (c *LenseController) Get(id string) (models.Lense, error) {
	return c.db.Get(id)
}
