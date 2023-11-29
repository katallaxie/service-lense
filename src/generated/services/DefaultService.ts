/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Lens } from '../models/Lens';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * Create a new lens.
     * This can only be done by the logged in user.
     *
     * @param requestBody
     * @returns Lens A new lens is created
     * @throws ApiError
     */
    public static postLenses(
        requestBody: Lens,
    ): CancelablePromise<Lens> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/lenses',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Returns a list of users.
     * Optional extended description in CommonMark or HTML.
     * @returns string A JSON array of user names
     * @throws ApiError
     */
    public static getUsers(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users',
        });
    }

}
