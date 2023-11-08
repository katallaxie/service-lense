package spec_test

import (
	"testing"

	"github.com/katallaxie/service-lense/pkg/spec"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func Test_UnmarshalYAML(t *testing.T) {
	tests := []struct {
		desc string
		in   []byte
		out  *spec.Spec
		err  error
	}{
		{
			desc: "valid",
			in:   []byte(`version: 1`),
			out:  &spec.Spec{Version: 1, Name: "", Description: "", Pillars: []*spec.Pillar{}},
		},
	}

	for _, tc := range tests {
		t.Run(tc.desc, func(t *testing.T) {
			s := spec.Default()
			err := s.UnmarshalYAML(tc.in)
			require.NoError(t, err)
			assert.Equal(t, tc.out, s)
		})
	}
}
