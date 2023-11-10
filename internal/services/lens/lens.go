package lens

import (
	"context"
	"fmt"
	"io"

	"github.com/katallaxie/service-lense/internal/controllers"
	"github.com/katallaxie/service-lense/internal/ports"
	"github.com/katallaxie/service-lense/pkg/api"
	"github.com/katallaxie/service-lense/pkg/spec"
)

var _ ports.LensService = (*LensSrv)(nil)

// LensSrv ...
type LensSrv struct {
	ctrl *controllers.LensController
	ports.LensServiceUnimplemented
}

// New ...
func New(ctrl *controllers.LensController) *LensSrv {
	return &LensSrv{
		ctrl: ctrl,
	}
}

// AddTemplate ...
func (l *LensSrv) AddTemplate(ctx context.Context, request api.AddTemplateRequestObject) (api.AddTemplateResponseObject, error) {
	tpl := spec.Default()

	v, err := io.ReadAll(request.Body)
	if err != nil {
		return api.AddTemplate200Response{}, err
	}

	fmt.Println(string(v))

	err = tpl.UnmarshalYAML(v)
	if err != nil {
		return api.AddTemplate200Response{}, err
	}

	fmt.Println(tpl)

	return api.AddTemplate200Response{}, nil
}
