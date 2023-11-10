package main

import (
	"context"
	"errors"
	"fmt"
	"log"
	"os"

	"github.com/katallaxie/pkg/logger"
	"github.com/katallaxie/pkg/server"
	"github.com/katallaxie/service-lense/internal/adapters"
	"github.com/katallaxie/service-lense/internal/config"
	"github.com/katallaxie/service-lense/internal/controllers"
	"github.com/katallaxie/service-lense/internal/models"
	"github.com/katallaxie/service-lense/internal/ports"
	"github.com/katallaxie/service-lense/internal/services/lens"
	"github.com/katallaxie/service-lense/pkg/api"

	"github.com/caarlos0/env/v10"
	"github.com/gofiber/fiber/v2"
	middleware "github.com/oapi-codegen/fiber-middleware"
	"github.com/spf13/cobra"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var cfg = config.New()

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
	lensService ports.LensService

	server.Listener
	server.Unimplemented
}

// Start ...
func (s *srv) Start(ctx context.Context, ready server.ReadyFunc, run server.RunFunc) func() error {
	return func() error {
		swagger, err := api.GetSwagger()
		if err != nil {
			return err
		}

		swagger.Servers = nil
		handlers := api.NewStrictHandler(s.lensService, nil)

		app := fiber.New()
		app.Use(middleware.OapiRequestValidator(swagger))

		api.RegisterHandlers(app, handlers)

		return app.Listen(":8080")
	}
}

func run(ctx context.Context) error {
	log.SetFlags(0)
	log.SetOutput(os.Stderr)

	logger.RedirectStdLog(logger.LogSink)

	if err := env.Parse(cfg); err != nil {
		return err
	}

	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		cfg.Flags.DatabaseHost, cfg.Flags.DatabasePort, cfg.Flags.DatabaseUser, cfg.Flags.DatabasePassword, cfg.Flags.DatabaseName)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return err
	}

	db.AutoMigrate(&models.Lens{}, &models.Workflow{})

	s := &srv{}
	srv, _ := server.WithContext(ctx)

	ctrl := controllers.New(adapters.NewDB(db))

	leaseService := lens.New(ctrl)
	s.lensService = leaseService

	srv.Listen(s, true)

	if err := srv.Wait(); errors.Is(err, &server.Error{}) {
		return err
	}

	return nil
}
