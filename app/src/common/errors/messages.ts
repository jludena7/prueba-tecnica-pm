import { HTTP } from "../constants/app";

export const ERROR_500 = {
  UNKNOWN: {
    error: true,
    message: "Unknown error",
    status: HTTP.STATUS_500,
    data: null,
  },
};

export const ERROR_404 = {
  UNKNOWN_VALIDATION: {
    error: true,
    message: "Unknown error validation",
    status: HTTP.STATUS_404,
    data: null,
  },
  NOT_FOUND: {
    error: true,
    message: "Not found resource",
    status: HTTP.STATUS_404,
    data: null,
  },
  PROVIDER_ERROR: {
    error: true,
    message: "Provider temporarily disabled",
    status: HTTP.STATUS_404,
    data: null,
  },
  RATE_ID_NOT_FOUND: {
    error: true,
    message: "Rate id not found",
    status: HTTP.STATUS_404,
    data: null,
  },
  COLLECTION_NOT_FOUND: {
    error: true,
    message: "Collection not found, was not delete",
    status: HTTP.STATUS_404,
    data: null,
  },
};

export const ERROR_401 = {
  TOKEN_GENERATION: {
    error: true,
    message: "Token generation error",
    status: HTTP.STATUS_401,
    data: null,
  },
};

export const ERROR_400 = {
  USER_EXISTS: {
    error: true,
    message: "User already exists, please enter another email",
    status: HTTP.STATUS_400,
    data: null,
  },
  INVALID_USER_PASS: {
    error: true,
    message: "User or password is invalid",
    status: HTTP.STATUS_400,
    data: null,
  },
};

export const ERROR_403 = {
  INVALID_CREDENTIALS: {
    error: true,
    message: "You do not have permissions for this action",
    status: HTTP.STATUS_403,
    data: null,
  },
  MISSING_USER: {
    error: true,
    message: "User is not authenticated",
    status: HTTP.STATUS_403,
    data: null,
  },
};
