// Package api provides primitives to interact with the openapi HTTP API.
//
// Code generated by github.com/deepmap/oapi-codegen/v2 version v2.0.0 DO NOT EDIT.
package api

import (
	"bytes"
	"compress/gzip"
	"context"
	"encoding/base64"
	"fmt"
	"io"
	"net/url"
	"path"
	"strings"

	"github.com/getkin/kin-openapi/openapi3"
	"github.com/gofiber/fiber/v2"
	"github.com/oapi-codegen/runtime"
)

// ServerInterface represents all server handlers.
type ServerInterface interface {
	// Add a new template
	// (POST /v1/lense/templates)
	AddTemplate(c *fiber.Ctx) error
	// List all workloads
	// (GET /v1/workloads)
	ListWorkloads(c *fiber.Ctx) error
	// Add a new workload
	// (POST /v1/workloads)
	AddWorkload(c *fiber.Ctx) error
	// Get a workload
	// (GET /v1/workloads/{id})
	GetWorkload(c *fiber.Ctx, id string) error
}

// ServerInterfaceWrapper converts contexts to parameters.
type ServerInterfaceWrapper struct {
	Handler ServerInterface
}

type MiddlewareFunc fiber.Handler

// AddTemplate operation middleware
func (siw *ServerInterfaceWrapper) AddTemplate(c *fiber.Ctx) error {

	return siw.Handler.AddTemplate(c)
}

// ListWorkloads operation middleware
func (siw *ServerInterfaceWrapper) ListWorkloads(c *fiber.Ctx) error {

	return siw.Handler.ListWorkloads(c)
}

// AddWorkload operation middleware
func (siw *ServerInterfaceWrapper) AddWorkload(c *fiber.Ctx) error {

	return siw.Handler.AddWorkload(c)
}

// GetWorkload operation middleware
func (siw *ServerInterfaceWrapper) GetWorkload(c *fiber.Ctx) error {

	var err error

	// ------------- Path parameter "id" -------------
	var id string

	err = runtime.BindStyledParameter("simple", false, "id", c.Params("id"), &id)
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, fmt.Errorf("Invalid format for parameter id: %w", err).Error())
	}

	return siw.Handler.GetWorkload(c, id)
}

// FiberServerOptions provides options for the Fiber server.
type FiberServerOptions struct {
	BaseURL     string
	Middlewares []MiddlewareFunc
}

// RegisterHandlers creates http.Handler with routing matching OpenAPI spec.
func RegisterHandlers(router fiber.Router, si ServerInterface) {
	RegisterHandlersWithOptions(router, si, FiberServerOptions{})
}

// RegisterHandlersWithOptions creates http.Handler with additional options
func RegisterHandlersWithOptions(router fiber.Router, si ServerInterface, options FiberServerOptions) {
	wrapper := ServerInterfaceWrapper{
		Handler: si,
	}

	for _, m := range options.Middlewares {
		router.Use(m)
	}

	router.Post(options.BaseURL+"/v1/lense/templates", wrapper.AddTemplate)

	router.Get(options.BaseURL+"/v1/workloads", wrapper.ListWorkloads)

	router.Post(options.BaseURL+"/v1/workloads", wrapper.AddWorkload)

	router.Get(options.BaseURL+"/v1/workloads/:id", wrapper.GetWorkload)

}

type AddTemplateRequestObject struct {
	Body io.Reader
}

type AddTemplateResponseObject interface {
	VisitAddTemplateResponse(ctx *fiber.Ctx) error
}

type AddTemplate200Response struct {
}

func (response AddTemplate200Response) VisitAddTemplateResponse(ctx *fiber.Ctx) error {
	ctx.Status(200)
	return nil
}

type ListWorkloadsRequestObject struct {
}

type ListWorkloadsResponseObject interface {
	VisitListWorkloadsResponse(ctx *fiber.Ctx) error
}

type ListWorkloads200JSONResponse struct {
	Items  *[]Workload `json:"items,omitempty"`
	Limit  *int        `json:"limit,omitempty"`
	Offset *int        `json:"offset,omitempty"`
	Total  *int        `json:"total,omitempty"`
}

func (response ListWorkloads200JSONResponse) VisitListWorkloadsResponse(ctx *fiber.Ctx) error {
	ctx.Response().Header.Set("Content-Type", "application/json")
	ctx.Status(200)

	return ctx.JSON(&response)
}

type AddWorkloadRequestObject struct {
	Body *AddWorkloadJSONRequestBody
}

type AddWorkloadResponseObject interface {
	VisitAddWorkloadResponse(ctx *fiber.Ctx) error
}

type AddWorkload200Response struct {
}

func (response AddWorkload200Response) VisitAddWorkloadResponse(ctx *fiber.Ctx) error {
	ctx.Status(200)
	return nil
}

type GetWorkloadRequestObject struct {
	Id string `json:"id"`
}

type GetWorkloadResponseObject interface {
	VisitGetWorkloadResponse(ctx *fiber.Ctx) error
}

type GetWorkload200JSONResponse Workload

func (response GetWorkload200JSONResponse) VisitGetWorkloadResponse(ctx *fiber.Ctx) error {
	ctx.Response().Header.Set("Content-Type", "application/json")
	ctx.Status(200)

	return ctx.JSON(&response)
}

// StrictServerInterface represents all server handlers.
type StrictServerInterface interface {
	// Add a new template
	// (POST /v1/lense/templates)
	AddTemplate(ctx context.Context, request AddTemplateRequestObject) (AddTemplateResponseObject, error)
	// List all workloads
	// (GET /v1/workloads)
	ListWorkloads(ctx context.Context, request ListWorkloadsRequestObject) (ListWorkloadsResponseObject, error)
	// Add a new workload
	// (POST /v1/workloads)
	AddWorkload(ctx context.Context, request AddWorkloadRequestObject) (AddWorkloadResponseObject, error)
	// Get a workload
	// (GET /v1/workloads/{id})
	GetWorkload(ctx context.Context, request GetWorkloadRequestObject) (GetWorkloadResponseObject, error)
}

type StrictHandlerFunc func(ctx *fiber.Ctx, args interface{}) (interface{}, error)

type StrictMiddlewareFunc func(f StrictHandlerFunc, operationID string) StrictHandlerFunc

func NewStrictHandler(ssi StrictServerInterface, middlewares []StrictMiddlewareFunc) ServerInterface {
	return &strictHandler{ssi: ssi, middlewares: middlewares}
}

type strictHandler struct {
	ssi         StrictServerInterface
	middlewares []StrictMiddlewareFunc
}

// AddTemplate operation middleware
func (sh *strictHandler) AddTemplate(ctx *fiber.Ctx) error {
	var request AddTemplateRequestObject

	request.Body = bytes.NewReader(ctx.Request().Body())

	handler := func(ctx *fiber.Ctx, request interface{}) (interface{}, error) {
		return sh.ssi.AddTemplate(ctx.UserContext(), request.(AddTemplateRequestObject))
	}
	for _, middleware := range sh.middlewares {
		handler = middleware(handler, "AddTemplate")
	}

	response, err := handler(ctx, request)

	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	} else if validResponse, ok := response.(AddTemplateResponseObject); ok {
		if err := validResponse.VisitAddTemplateResponse(ctx); err != nil {
			return fiber.NewError(fiber.StatusBadRequest, err.Error())
		}
	} else if response != nil {
		return fmt.Errorf("unexpected response type: %T", response)
	}
	return nil
}

// ListWorkloads operation middleware
func (sh *strictHandler) ListWorkloads(ctx *fiber.Ctx) error {
	var request ListWorkloadsRequestObject

	handler := func(ctx *fiber.Ctx, request interface{}) (interface{}, error) {
		return sh.ssi.ListWorkloads(ctx.UserContext(), request.(ListWorkloadsRequestObject))
	}
	for _, middleware := range sh.middlewares {
		handler = middleware(handler, "ListWorkloads")
	}

	response, err := handler(ctx, request)

	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	} else if validResponse, ok := response.(ListWorkloadsResponseObject); ok {
		if err := validResponse.VisitListWorkloadsResponse(ctx); err != nil {
			return fiber.NewError(fiber.StatusBadRequest, err.Error())
		}
	} else if response != nil {
		return fmt.Errorf("unexpected response type: %T", response)
	}
	return nil
}

// AddWorkload operation middleware
func (sh *strictHandler) AddWorkload(ctx *fiber.Ctx) error {
	var request AddWorkloadRequestObject

	var body AddWorkloadJSONRequestBody
	if err := ctx.BodyParser(&body); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}
	request.Body = &body

	handler := func(ctx *fiber.Ctx, request interface{}) (interface{}, error) {
		return sh.ssi.AddWorkload(ctx.UserContext(), request.(AddWorkloadRequestObject))
	}
	for _, middleware := range sh.middlewares {
		handler = middleware(handler, "AddWorkload")
	}

	response, err := handler(ctx, request)

	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	} else if validResponse, ok := response.(AddWorkloadResponseObject); ok {
		if err := validResponse.VisitAddWorkloadResponse(ctx); err != nil {
			return fiber.NewError(fiber.StatusBadRequest, err.Error())
		}
	} else if response != nil {
		return fmt.Errorf("unexpected response type: %T", response)
	}
	return nil
}

// GetWorkload operation middleware
func (sh *strictHandler) GetWorkload(ctx *fiber.Ctx, id string) error {
	var request GetWorkloadRequestObject

	request.Id = id

	handler := func(ctx *fiber.Ctx, request interface{}) (interface{}, error) {
		return sh.ssi.GetWorkload(ctx.UserContext(), request.(GetWorkloadRequestObject))
	}
	for _, middleware := range sh.middlewares {
		handler = middleware(handler, "GetWorkload")
	}

	response, err := handler(ctx, request)

	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	} else if validResponse, ok := response.(GetWorkloadResponseObject); ok {
		if err := validResponse.VisitGetWorkloadResponse(ctx); err != nil {
			return fiber.NewError(fiber.StatusBadRequest, err.Error())
		}
	} else if response != nil {
		return fmt.Errorf("unexpected response type: %T", response)
	}
	return nil
}

// Base64 encoded, gzipped, json marshaled Swagger object
var swaggerSpec = []string{

	"H4sIAAAAAAAC/6yUTW+bQBCG/wqa9kiD0964pZcoaqREaqUcIh8mMDiT7ld3J7Ysi/9e7YINNbi21N6W",
	"+WDfeXiHHVRWO2vISIByB6F6JY3p+IgrNihsTXxy3jrywpRyijVLPMjWEZTARmhFHtocbNMEOpETK6jm",
	"UjHXhezLG1USi5+s/6ks1tPbawqVZ7eX1ncG8WxWsZPMmo23RpOR2QKuZ8MGNc0kpuJiiE1jJ2LgnkzI",
	"bh7vIAdhUbHpO/k1V5SNUmvyoau/vlpcLRI2RwYdQwlfUigHh/Kaxi3W14UiE6gQ0k6hdBScDWm6SCZ9",
	"prsaSrip6x99FeTg6dc7Bflq620srayRngk6p7hKfYWthORTEE+oBxPEU2O9RoESXtig30I+YdN2l7Cn",
	"Gkrx75QCwVkTOpmfF4sppodvCWt41zq+NsnOMDO0yWRQL7gKUD7DMPYydkUem94c6YoVzYC45yBPh6p5",
	"USd4vIXOWAMHVOqhgfJ5Bx89NVDCh2LYm6JfmmK0MW1+bFoW0n8e/vaqg/kH86H3uJ1z4zJ9hTOAI44M",
	"lco2IyZ7wENs2eanjXUQdamxpiAvm/n/u2ozSJ8b+thVxY7r9qS1bklGKBx61CTkQzIIRyVxd2H/Q4m/",
	"m+N58hGT45Va/qNZL2d8Bt8tSYZn0bXt7wAAAP//qw+g8EUGAAA=",
}

// GetSwagger returns the content of the embedded swagger specification file
// or error if failed to decode
func decodeSpec() ([]byte, error) {
	zipped, err := base64.StdEncoding.DecodeString(strings.Join(swaggerSpec, ""))
	if err != nil {
		return nil, fmt.Errorf("error base64 decoding spec: %w", err)
	}
	zr, err := gzip.NewReader(bytes.NewReader(zipped))
	if err != nil {
		return nil, fmt.Errorf("error decompressing spec: %w", err)
	}
	var buf bytes.Buffer
	_, err = buf.ReadFrom(zr)
	if err != nil {
		return nil, fmt.Errorf("error decompressing spec: %w", err)
	}

	return buf.Bytes(), nil
}

var rawSpec = decodeSpecCached()

// a naive cached of a decoded swagger spec
func decodeSpecCached() func() ([]byte, error) {
	data, err := decodeSpec()
	return func() ([]byte, error) {
		return data, err
	}
}

// Constructs a synthetic filesystem for resolving external references when loading openapi specifications.
func PathToRawSpec(pathToFile string) map[string]func() ([]byte, error) {
	res := make(map[string]func() ([]byte, error))
	if len(pathToFile) > 0 {
		res[pathToFile] = rawSpec
	}

	return res
}

// GetSwagger returns the Swagger specification corresponding to the generated code
// in this file. The external references of Swagger specification are resolved.
// The logic of resolving external references is tightly connected to "import-mapping" feature.
// Externally referenced files must be embedded in the corresponding golang packages.
// Urls can be supported but this task was out of the scope.
func GetSwagger() (swagger *openapi3.T, err error) {
	resolvePath := PathToRawSpec("")

	loader := openapi3.NewLoader()
	loader.IsExternalRefsAllowed = true
	loader.ReadFromURIFunc = func(loader *openapi3.Loader, url *url.URL) ([]byte, error) {
		pathToFile := url.String()
		pathToFile = path.Clean(pathToFile)
		getSpec, ok := resolvePath[pathToFile]
		if !ok {
			err1 := fmt.Errorf("path not found: %s", pathToFile)
			return nil, err1
		}
		return getSpec()
	}
	var specData []byte
	specData, err = rawSpec()
	if err != nil {
		return
	}
	swagger, err = loader.LoadFromData(specData)
	if err != nil {
		return
	}
	return
}