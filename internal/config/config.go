package config

// Config is the configuration.
type Config struct {
	// Flags contains the command line flags.
	Flags *Flags
}

// Flags contains the command line flags.
type Flags struct {
	// Verbose toggles the verbosity.
	Verbose bool
	// DatabaseUser is the database user.
	DatabaseUser string `env:"DATABASE_USER" envDefault:"example"`
	// DatabasePassword is the database password.
	DatabasePassword string `env:"DATABASE_PASSWORD" envDefault:"example"`
	// DatabaseHost is the database host.
	DatabaseHost string `env:"DATABASE_HOST" envDefault:"host.docker.internal"`
	// DatabasePort is the database port.
	DatabasePort string `env:"DATABASE_PORT" envDefault:"5432"`
	// DatabaseName is the database name.
	DatabaseName string `env:"DATABASE_NAME" envDefault:"example"`
}

// New returns a new Config.
func New() *Config {
	return &Config{
		Flags: &Flags{},
	}
}
