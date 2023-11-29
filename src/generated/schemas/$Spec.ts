/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Spec = {
    properties: {
        version: {
            type: 'string',
        },
        name: {
            type: 'string',
        },
        description: {
            type: 'string',
        },
        pillars: {
            type: 'array',
            contains: {
                type: 'Pillar',
            },
        },
    },
} as const;
