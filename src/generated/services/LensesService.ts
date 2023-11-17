/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Lens } from '../models/Lens';
import type { Pagination } from '../models/Pagination';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LensesService {

    /**
     * List all lenses
     * @returns any OK
     * @throws ApiError
     */
    public static listLenses(): CancelablePromise<(Pagination & {
        items?: Array<Lens>;
    })> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/lenses',
        });
    }

}
