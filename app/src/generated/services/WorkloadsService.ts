/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Pagination } from '../models/Pagination';
import type { Workload } from '../models/Workload';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class WorkloadsService {

    /**
     * List all workloads
     * @returns any OK
     * @throws ApiError
     */
    public static listWorkloads(): CancelablePromise<(Pagination & {
        items?: Array<Workload>;
    })> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/workloads',
        });
    }

    /**
     * Add a new workload
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static addWorkload(
        requestBody: Workload,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/workloads',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get a workload
     * @param id
     * @returns Workload OK
     * @throws ApiError
     */
    public static getWorkload(
        id: string,
    ): CancelablePromise<Workload> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/workloads/{id}',
            path: {
                'id': id,
            },
        });
    }

}
