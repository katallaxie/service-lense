/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Choice } from './Choice';
import type { Resource } from './Resource';
import type { Risk } from './Risk';

export type Question = {
    id?: string;
    title?: string;
    description?: string;
    choices?: Array<Choice>;
    resources?: Array<Resource>;
    risks?: Array<Risk>;
};

