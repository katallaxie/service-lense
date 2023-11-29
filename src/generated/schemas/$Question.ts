/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Question = {
    properties: {
        id: {
            type: 'string',
            isRequired: true,
        },
        title: {
            type: 'string',
            isRequired: true,
        },
        description: {
            type: 'string',
        },
        choices: {
            type: 'array',
            contains: {
                type: 'Choice',
            },
        },
        resources: {
            type: 'array',
            contains: {
                type: 'Resource',
            },
        },
        risks: {
            type: 'array',
            contains: {
                type: 'Risk',
            },
        },
    },
} as const;
