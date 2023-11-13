package models

// Workload defines a workload.
type Workload struct {
	// ID is the workload ID.
	ID string `json:"id,omitempty" yaml:"id" db:"id"`
	// Name is the workload name.
	Name string `json:"name,omitempty" yaml:"name" db:"name"`
	// Description is a description of the workload.
	Description string `json:"description,omitempty" yaml:"description" db:"description"`
	// Environment is the environment the workload is running in.
	Environment string `json:"environment,omitempty" yaml:"environment" db:"environment"`
	// Tags is a list of tags associated with the workload.
	Tags []string `json:"tags,omitempty" yaml:"tags" db:"tags"`
}
