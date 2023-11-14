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

// AddLens ...
func (s *SrvUnimplemented) AddLens(ctx context.Context, request api.AddLensRequestObject) (api.AddLensResponseObject, error) {
	return api.AddLens200JSONResponse{}, nil
}

// DeleteLens ...
func (s *SrvUnimplemented) DeleteLens(ctx context.Context, request api.DeleteLensRequestObject) (api.DeleteLensResponseObject, error) {
	return api.DeleteLens200JSONResponse{}, nil
}

// GetLens ...
func (s *SrvUnimplemented) GetLens(ctx context.Context, request api.GetLensRequestObject) (api.GetLensResponseObject, error) {
	return api.GetLens200JSONResponse{}, nil
}

// ListLenses ...
func (s *SrvUnimplemented) ListLenses(ctx context.Context, request api.ListLensesRequestObject) (api.ListLensesResponseObject, error) {
	return api.ListLenses200JSONResponse{}, nil
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
