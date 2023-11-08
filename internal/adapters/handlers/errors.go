package handlers

import (
	"errors"

	"github.com/gofiber/fiber/v2"
)

// DefaultErrorHandler ...
var DefaultErrorHandler = func(c *fiber.Ctx, err error) error {
	code := fiber.StatusInternalServerError // 500

	var e *fiber.Error
	if errors.As(err, &e) {
		code = e.Code
	}

	c.Set(fiber.HeaderContentType, fiber.MIMEApplicationJSON)

	return c.Status(code).JSON(e)
}
