/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Lens = {
    properties: {
        id: {
            type: 'string',
        },
        name: {
            type: 'string',
            isRequired: true,
        },
        description: {
            type: 'string',
        },
        spec: {
            type: 'Spec',
            isRequired: true,
        },
        created_at: {
            type: 'string',
            format: 'date-time',
        },
        updated_at: {
            type: 'string',
            format: 'date-time',
        },
        deleted_at: {
            type: 'string',
            format: 'date-time',
        },
    },
} as const;
