package lense

import (
	"github.com/katallaxie/service-lense/internal/controllers"
	"github.com/katallaxie/service-lense/internal/models"
	"github.com/katallaxie/service-lense/internal/ports"
)

var _ ports.LenseService = (*LenseSrv)(nil)

// LenseSrv ...
type LenseSrv struct {
	ctrl *controllers.LenseController
	ports.LenseServiceUnimplemented
}

// New ...
func New(ctrl *controllers.LenseController) *LenseSrv {
	return &LenseSrv{
		ctrl: ctrl,
	}
}

// Get ...
func (s *LenseSrv) Get(id string) (models.Lense, error) {
	return s.ctrl.Get(id)
}
