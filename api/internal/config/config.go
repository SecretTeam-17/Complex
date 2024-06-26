package config

import (
	"log"
	"os"
	"time"

	"github.com/ilyakaznacheev/cleanenv"
)

// Структура конфига
type Config struct {
	Env           string `yaml:"env" env-default:"prod"`
	StoragePath   string `yaml:"storage_path" env-required:"true"`
	StorageUser   string `yaml:"storage_user" env:"DB_USER" env-required:"true"`
	StoragePasswd string `yaml:"storage_passwd" env:"DB_PASSWD" env-required:"true"`
	// CertPath      string `yaml:"cert_path" env:"CERT_PATH" env-required:"true"`
	// CertKeyPath   string `yaml:"cert_key_path" env:"CERT_KEY_PATH" env-required:"true"`
	AuthUser      string `yaml:"auth_user" env:"AUTH_USER" env-required:"true"`
	AuthPasswd    string `yaml:"auth_passwd" env:"AUTH_PASSWD" env-required:"true"`
	HTTPServer    `yaml:"http_server"`
}
type HTTPServer struct {
	Address      string        `yaml:"address" env-default:"0.0.0.0:80"`
	AddressTLS   string        `yaml:"addressTLS" env-default:"0.0.0.0:443"`
	ReadTimeout  time.Duration `yaml:"read_timeout" env-default:"4s"`
	WriteTimeout time.Duration `yaml:"write_timeout" env-default:"4s"`
	IdleTimeout  time.Duration `yaml:"idle_timeout" env-default:"60s"`
}

// MustLoad - инициализируем данные из конфига. Если не смогли, то завершаем приложение с ошибкой.
func MustLoad() *Config {
	// Берем путь к файлу конфига из переменной окружения
	configPath := os.Getenv("CONFIG_PATH")

	if configPath == "" {
		log.Fatal("CONFIG_PATH is not set")
	}

	// Проверяем, существует ли файл конфига
	if _, err := os.Stat(configPath); os.IsNotExist(err) {
		log.Fatalf("config file does not exist: %s", configPath)
	}

	// Читаем из файла конфига в структуру и возвращаем ее
	var cfg Config
	if err := cleanenv.ReadConfig(configPath, &cfg); err != nil {
		log.Fatalf("cannot read config: %s", err)
	}

	return &cfg
}
