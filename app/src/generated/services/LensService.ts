/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Lens } from '../models/Lens';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LensService {

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
