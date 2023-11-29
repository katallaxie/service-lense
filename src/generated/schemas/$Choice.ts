/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Choice = {
    properties: {
        id: {
            type: 'string',
            isRequired: true,
        },
        title: {
            type: 'string',
            isRequired: true,
        },
        resources: {
            type: 'array',
            contains: {
                type: 'Resource',
            },
        },
        improvements: {
            type: 'array',
            contains: {
                type: 'Improvement',
            },
        },
    },
} as const;
