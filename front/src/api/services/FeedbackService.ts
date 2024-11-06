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
     * @returns Report The reports
     * @throws ApiError
     */
    public static listReports({
        limit,
        skip,
        feedbacktype,
    }: {
        /**
         * amount of items to get
         */
        limit?: number | null,
        /**
         * skip amount of items to get
         */
        skip?: number | null,
        /**
         * skip amount of items to get
         */
        feedbacktype?: 'bug' | 'suggestion' | 'all',
    }): CancelablePromise<Array<Report>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/feedback',
            query: {
                'limit': limit,
                'skip': skip,
                'feedbacktype': feedbacktype,
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
     * @returns any New report
     * @throws ApiError
     */
    public static createReport({
        requestBody,
    }: {
        /**
         * a report object
         */
        requestBody?: ReportInsert,
    }): CancelablePromise<Report> {
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
    /**
     * Delete a report
     * @returns any Deleted report successfully
     * @throws ApiError
     */
    public static removeReport({
        id,
    }: {
        /**
         * the id of the task
         */
        id: string,
    }): CancelablePromise<{
        id: string;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/feedback/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                500: `Internal server error`,
            },
        });
    }
}
