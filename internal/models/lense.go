package models

// Lense is a service lense.
type Lense struct {
	// ID is the lense ID.
	ID string `json:"id,omitempty" yaml:"id" db:"id"`
	// Name is the lense name.
	Name string `json:"name,omitempty" yaml:"name" db:"name"`
	// Description is a description of the lense.
	Description string `json:"description,omitempty" yaml:"description" db:"description"`
}
