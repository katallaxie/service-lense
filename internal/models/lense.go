package models

import (
	"github.com/katallaxie/service-lense/pkg/spec"
)

// Lense is a service lense.
type Lense struct {
	// ID is the lense ID.
	ID string `json:"id,omitempty" yaml:"id"`
	// Name is the lense name.
	Name string `json:"name,omitempty" yaml:"name"`
	// Description is a description of the lense.
	Description string `json:"description,omitempty" yaml:"description"`
	// Spec is the lense spec.
	Spec *spec.Spec `json:"spec,omitempty" yaml:"spec"`
}
