/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Report } from '../models/Report';
import type { ReportInsert } from '../models/ReportInsert';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FeedbackService {
    /**
     * List all the reports
     * @param limit amount of items to get
     * @param skip skip amount of items to get
     * @returns Report The reports
     * @throws ApiError
     */
    public static list(
        limit?: number | null,
        skip?: number | null,
    ): CancelablePromise<Array<Report>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/feedback',
            query: {
                'limit': limit,
                'skip': skip,
            },
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Create one report
     * @param requestBody a report object
     * @returns any New report
     * @throws ApiError
     */
    public static create(
        requestBody?: ReportInsert,
    ): CancelablePromise<Report> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/feedback',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                500: `Internal server error`,
            },
        });
    }
}
