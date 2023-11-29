/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Pillar = {
    properties: {
        id: {
            type: 'string',
            isRequired: true,
        },
        name: {
            type: 'string',
            isRequired: true,
        },
        description: {
            type: 'string',
        },
        questions: {
            type: 'array',
            contains: {
                type: 'Question',
            },
        },
        resources: {
            type: 'array',
            contains: {
                type: 'Resource',
            },
        },
    },
} as const;
