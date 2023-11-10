package models

// Lens is a service lense.
type Lens struct {
	// ID is the lense ID.
	ID string `json:"id,omitempty" yaml:"id" db:"id"`
	// Name is the lense name.
	Name string `json:"name,omitempty" yaml:"name" db:"name"`
	// Description is a description of the lens.
	Description string `json:"description,omitempty" yaml:"description" db:"description"`
}

// Workflow ...
type Workflow struct {
	// ID is the workflow ID.
	ID string `json:"id,omitempty" yaml:"id" db:"id"`
	// Name is the workflow name.
	Name string `json:"name,omitempty" yaml:"name" db:"name"`
	// Description is a description of the workflow.
	Description string `json:"description,omitempty" yaml:"description" db:"description"`
	// Environment is the environment the workflow is running in.
	Environment string `json:"environment,omitempty" yaml:"environment" db:"environment"`
}
