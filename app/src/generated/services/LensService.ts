/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddLensBody } from '../models/AddLensBody';
import type { Lens } from '../models/Lens';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LensService {

    /**
     * Add a new lens
     * @param requestBody
     * @returns Lens Success
     * @throws ApiError
     */
    public static addLens(
        requestBody?: AddLensBody,
    ): CancelablePromise<Lens> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/lens',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
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
     * Delete a lens
     * @param id
     * @returns Lens OK
     * @throws ApiError
     */
    public static deleteLens(
        id: string,
    ): CancelablePromise<Lens> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/lens/{id}',
            path: {
                'id': id,
            },
        });
    }

}
