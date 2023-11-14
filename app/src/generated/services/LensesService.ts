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
     * Add a new lens
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static addLens(
        requestBody: any,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/lens',
            body: requestBody,
        });
    }

    /**
     * Get a lens
     * @param id
     * @returns Lens OK
     * @throws ApiError
     */
    public static getLens(
        id: string,
    ): CancelablePromise<Lens> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/lens/{id}',
            path: {
                'id': id,
            },
        });
    }

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
