package main

import (
	"context"
	"errors"
	"log"
	"os"

	"github.com/katallaxie/pkg/logger"
	"github.com/katallaxie/pkg/server"
	"github.com/katallaxie/service-lense/internal/adapters"
	"github.com/katallaxie/service-lense/internal/adapters/handlers"
	"github.com/katallaxie/service-lense/internal/controllers"
	"github.com/katallaxie/service-lense/internal/ports"
	"github.com/katallaxie/service-lense/internal/services/lense"

	"github.com/gofiber/fiber/v2"
	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	RunE: func(cmd *cobra.Command, args []string) error {
		return run(cmd.Context())
	},
}

func init() {
	rootCmd.SilenceUsage = true
}

func main() {
	if err := rootCmd.Execute(); err != nil {
		panic(err)
	}
}

type srv struct {
	leaseService ports.LenseService

	server.Listener
	server.Unimplemented
}

// Start ...
func (s *srv) Start(ctx context.Context, ready server.ReadyFunc, run server.RunFunc) func() error {
	return func() error {
		app := fiber.New()

		lenseHandler := handlers.NewLenseHandler(s.leaseService)
		app.Get("/lense/:id", lenseHandler.Get)

		return app.Listen(":8080")
	}
}

func run(ctx context.Context) error {
	log.SetFlags(0)
	log.SetOutput(os.Stderr)

	logger.RedirectStdLog(logger.LogSink)

	s := &srv{}
	srv, _ := server.WithContext(ctx)

	ctrl := controllers.New(adapters.NewSQLite())

	leaseService := lense.New(ctrl)
	s.leaseService = leaseService

	srv.Listen(s, true)

	if err := srv.Wait(); errors.Is(err, &server.Error{}) {
		return err
	}

	return nil
}
