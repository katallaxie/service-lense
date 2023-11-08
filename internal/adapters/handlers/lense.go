package handlers

import (
	"github.com/katallaxie/service-lense/internal/ports"

	"github.com/gofiber/fiber/v2"
)

// LenseHandler ...
type LenseHandler struct {
	svc ports.LenseService
}

// NewLenseHandler ...
func NewLenseHandler(svc ports.LenseService) *LenseHandler {
	return &LenseHandler{
		svc: svc,
	}
}

// Get ...
func (h *LenseHandler) Get(ctx *fiber.Ctx) error {
	id := ctx.Params("id")

	lense, err := h.svc.Get(id)
	if err != nil {
		return fiber.NewError(fiber.StatusNotFound, err.Error())
	}

	return ctx.Status(fiber.StatusOK).JSON(lense)
}
