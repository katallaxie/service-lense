package spec

import (
	"reflect"
	"strings"

	"github.com/pkg/errors"

	"github.com/go-playground/validator/v10"
	"gopkg.in/yaml.v3"
)

// Spec is a service lense specifiction.
type Spec struct {
	// Version is the version of the spec.
	Version int `json:"version" yaml:"version"`
	// Name is the name of the service.
	Name string `json:"name" yaml:"name"`
	// Description is a description of the service.
	Description string `json:"description" yaml:"description"`
	// Pillars is a list of pillars.
	Pillars []*Pillar `json:"pillars" yaml:"pillars"`
}

// Pillar is a pillar of the service.
type Pillar struct {
	// ID is the pillar ID.
	ID string `json:"id" yaml:"id"`
	// Name is the pillar name.
	Name string `json:"name" yaml:"name"`
	// Description is a description of the pillar.
	Description string `json:"description" yaml:"description"`
	// Questions is a list of questions.
	Questions []*Question `json:"questions" yaml:"questions"`
	// Resources is a list of resources.
	Resources []*Resource `json:"resources" yaml:"resources"`
}

// Question is a question of the service.
type Question struct {
	// ID is the question ID.
	ID string `json:"id" yaml:"id"`
	// Title is the question title.
	Title string `json:"title" yaml:"title"`
	// Description is a description of the question.
	Description string `json:"description" yaml:"description"`
	// Choices is a list of choices.
	Choices []*Choice `json:"choices" yaml:"choices"`
	// Resources is a list of resources.
	Resources []*Resource `json:"resources" yaml:"resources"`
	// Risks is a list of risks.
	Risks []*Risk `json:"risks" yaml:"risks"`
}

// Risk is a risk of the service.
type Risk struct {
	// Risk is the risk.
	Risk string `json:"risk" yaml:"risk"`
	// Condition is the condition of the risk.
	Condition string `json:"condition" yaml:"condition"`
}

// Choice is a choice of the service.
type Choice struct {
	// ID is the choice ID.
	ID string `json:"id" yaml:"id"`
	// Title is the choice title.
	Title string `json:"title" yaml:"title"`
	// Resources is a list of resources.
	Resources []*Resource `json:"resources" yaml:"resources"`
	// Improvements is a list of improvements.
	Improvements []*Improvement `json:"improvements" yaml:"improvements"`
}

// Improvement is an improvement of the service.
type Improvement struct {
	// Description is a description of the improvement.
	Description string `json:"description" yaml:"description"`
	// URL is the URL of the improvement.
	URL string `json:"url" yaml:"url"`
}

// Resource is a resource of the service.
type Resource struct {
	// Description is a description of the resource.
	Description string `json:"description" yaml:"description"`
	// URL is the URL of the resource.
	URL string `json:"url" yaml:"url"`
}

// UnmarshalYAML overrides the default unmarshaler for the spec.
func (s *Spec) UnmarshalYAML(data []byte) error {
	spec := struct {
		Version     string    `json:"version" yaml:"version"`
		Name        string    `json:"name" yaml:"name"`
		Description string    `json:"description" yaml:"description"`
		Pillars     []*Pillar `json:"pillars" yaml:"pillars"`
	}{}

	if err := yaml.Unmarshal(data, &spec); err != nil {
		return errors.WithStack(err)
	}

	return nil
}

// Validate validates the spec.
func (s *Spec) Validate() error {
	v := validator.New()

	v.RegisterTagNameFunc(func(fld reflect.StructField) string {
		name := strings.SplitN(fld.Tag.Get("yaml"), ",", 2)[0]
		if name == "-" {
			return ""
		}
		return name
	})

	err := v.Struct(s)
	if err != nil {
		return err
	}

	return v.Struct(s)
}

// Default is the default spec.
func Default() *Spec {
	return &Spec{
		Version: 1,
		Pillars: []*Pillar{},
	}
}
