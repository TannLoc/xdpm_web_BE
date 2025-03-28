import {SetMetadata} from '@nestjs/common';

// Define constant for pagination metadata
export const PAGINATION_RESPONSE_METADATA = 'paginationResponse';

// Create the PaginationResponse decorator
export const PaginationResponse = () => SetMetadata(PAGINATION_RESPONSE_METADATA, true);
