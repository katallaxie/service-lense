//go:build generate
// +build generate

package main

//go:generate go run -modfile ./tools/go.mod github.com/deepmap/oapi-codegen/v2/cmd/oapi-codegen -config pkg/api/server.cfg.yaml pkg/api/api.yaml
//go:generate go run -modfile ./tools/go.mod github.com/deepmap/oapi-codegen/v2/cmd/oapi-codegen -config pkg/api/types.cfg.yaml pkg/api/api.yaml
