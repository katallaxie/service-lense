package services

import (
	"context"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/google/uuid"
	"github.com/katallaxie/service-lense/internal/controllers"
	"github.com/katallaxie/service-lense/internal/models"
	"github.com/katallaxie/service-lense/internal/ports"
	"github.com/katallaxie/service-lense/pkg/api"
	"github.com/katallaxie/service-lense/pkg/spec"

	"github.com/katallaxie/pkg/server"
	middleware "github.com/oapi-codegen/fiber-middleware"
)

var _ ports.Srv = (*Srv)(nil)

// Srv ...
type Srv struct {
	lc *controllers.LensController
	wc *controllers.WorkloadController
	ports.SrvUnimplemented

	server.Listener
	server.Unimplemented
}

// New ...
func New(lc *controllers.LensController, wc *controllers.WorkloadController) *Srv {
	return &Srv{
		lc: lc,
		wc: wc,
	}
}

// AddLense ...
func (s *Srv) AddLens(ctx context.Context, request api.AddLensRequestObject) (api.AddLensResponseObject, error) {
	tpl := spec.Default()

	id := uuid.New()

	err := tpl.UnmarshalYAML([]byte(*request.Body.Spec))
	if err != nil {
		return api.AddLens200JSONResponse{}, err
	}

	l := models.Lens{
		ID:          id.String(),
		Description: *request.Body.Description,
	}

	err = s.lc.AddLens(ctx, id.String(), l)
	if err != nil {
		return nil, err
	}

	return api.AddLens200JSONResponse(api.Lens{
		Id: &l.ID,
	}), nil
}

// Start ...
func (s *Srv) Start(ctx context.Context, ready server.ReadyFunc, run server.RunFunc) func() error {
	return func() error {
		swagger, err := api.GetSwagger()
		if err != nil {
			return err
		}

		swagger.Servers = nil
		handlers := api.NewStrictHandler(s, nil)

		app := fiber.New()
		app.Use(cors.New())
		app.Use(middleware.OapiRequestValidator(swagger))

		api.RegisterHandlers(app, handlers)

		return app.Listen(":8080")
	}
}
