package ports

import (
	"context"

	"github.com/katallaxie/service-lense/pkg/api"
)

var _ Srv = (*SrvUnimplemented)(nil)

// Srv ...
type Srv interface {
	api.StrictServerInterface
}

// SrvUnimplemented ...
type SrvUnimplemented struct{}

// AddTemplate ...
func (s *SrvUnimplemented) AddTemplate(ctx context.Context, request api.AddTemplateRequestObject) (api.AddTemplateResponseObject, error) {
	return api.AddTemplate200Response{}, nil
}

// AddWorkload ...
func (w *SrvUnimplemented) AddWorkload(ctx context.Context, request api.AddWorkloadRequestObject) (api.AddWorkloadResponseObject, error) {
	return api.AddWorkload200Response{}, nil
}

// ListWorkloads ...
func (w *SrvUnimplemented) ListWorkloads(ctx context.Context, request api.ListWorkloadsRequestObject) (api.ListWorkloadsResponseObject, error) {
	return api.ListWorkloads200JSONResponse{}, nil
}

// GetWorkload ...
func (w *SrvUnimplemented) GetWorkload(ctx context.Context, request api.GetWorkloadRequestObject) (api.GetWorkloadResponseObject, error) {
	return api.GetWorkload200JSONResponse{}, nil
}
