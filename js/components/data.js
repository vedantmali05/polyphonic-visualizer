/* ///////////////
    CONSTANTS DEFINITIONS
/////////////// */

export const STORAGE_KEYS = {
    inputs: "inputs",
    settings: "settings"
}

export const STATUS_HTTP_RESPONSE = {
    // Informational Responses (1xx)
    continue: 100,
    protocolSwitch: 101,
    processing: 102,
    // Successful Responses (2xx)
    ok: 200,
    created: 201,
    accepted: 202,
    noContent: 204,
    resetContent: 205,
    partialContent: 206,
    // Redirection Messages (3xx)
    multipleChoices: 300,
    movedPermanently: 301,
    found: 302,
    seeOther: 303,
    notModified: 304,
    temporaryRedirect: 307,
    permanentRedirect: 308, // Though not recommended, included for completeness
    // Client Error Responses (4xx)
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    methodNotAllowed: 405,
    requestTimeout: 408,
    conflict: 409,
    gone: 410,
    lengthRequired: 411,
    preconditionFailed: 412,
    payloadTooLarge: 413,
    uriTooLong: 414,
    unsupportedMediaType: 415,
    rangeNotSatisfiable: 416,
    expectationFailed: 417,
    // Server Error Responses (5xx)
    internalServerError: 500,
    badGateway: 502,
    serviceUnavailable: 503,
    gatewayTimeout: 504,
    httpVersionNotSupported: 505,
}

// Input Status
export const UI_STATUS_FEEDBACK = {
    info: "info",
    success: "success",
    error: "error",
    warn: "warn"
}

// User THEME
export const UI_THEME = {
    light: 1,
    dark: 2
}

// HTML UIs Classes
export const UI_CLASSES = {
    fieldset: "fieldset",
    info: "info",
    success: "success",
    error: "error",
    warn: "warn",
}

// HTML UI Size
export const UI_SIZE = {
    xs: "extra-small",
    s: "small",
    m: "medium",
    l: "large",
    xl: "extra-large",
}

/* ///////////////
    OTHER DATA
/////////////// */

// DATE AND TIME
export const TIME_WEEK_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const TIME_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];