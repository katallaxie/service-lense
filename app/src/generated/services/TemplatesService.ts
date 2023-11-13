/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TemplatesService {

    /**
     * Add a new template
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static addTemplate(
        requestBody: Blob,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/lense/templates',
            body: requestBody,
            mediaType: 'application/octet-stream',
        });
    }

}
