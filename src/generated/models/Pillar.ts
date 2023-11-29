/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Question } from './Question';
import type { Resource } from './Resource';

export type Pillar = {
    id: string;
    name: string;
    description?: string;
    questions?: Array<Question>;
    resources?: Array<Resource>;
};

