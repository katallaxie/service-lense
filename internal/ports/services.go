package ports

import (
	"context"

	"github.com/katallaxie/service-lense/pkg/api"
)

var _ LensService = (*LensServiceUnimplemented)(nil)

// LenseService ...
type LensService interface {
	api.StrictServerInterface
}

// LensServiceUnimplemented ...
type LensServiceUnimplemented struct{}

// AddTemplate ...
func (l *LensServiceUnimplemented) AddTemplate(ctx context.Context, request api.AddTemplateRequestObject) (api.AddTemplateResponseObject, error) {
	return api.AddTemplate200Response{}, nil
}
