module.exports = {
    BAD_REQUEST: {
        httpCode: 400,
        message: 'Operation Unsuccessful'
    },
    SUCCESS: {
        httpCode: 200,
        message: 'Operation Success'
    },
    PAGE_NOT_FOUND: {
        httpCode: 404,
        message: 'invalid page'
    },
    NO_RECORD_FOUND: {
        httpCode: 404,
        message: 'No Record Found'
    },
    EMAIL_EXIST: {
        httpCode: 409,
        message: 'Email Already Exist'
    },
    INVALID_REQUEST_DATA: {
       httpCode: 400,
       message: 'Invalid request data'
    },
    BUSINESS: {
        EXIST: {
            httpCode: 409,
            message: 'Business Name already exist'
        },
        SUCCESS: {
            httpCode: 200,
            message: 'New Business Added'
        },
        SEND_TO_ADMIN: {
            httpCode: 200,
            message: 'Details send for approval'
        },
        PENDING: {
            httpCode: 200,
            message: 'Already on to be approved list'
        },
        CONTACT: {
            httpCode: 205,
            message: 'Your message is sent'
        }
    },
    CATEGORY: {
        EXIST: {
            httpCode: 409,
            message: 'Category Name already exist'
        },
        ADD: {
            httpCode: 200,
            message: 'New Category Added'
        },
        SUCCESS: {
            httpCode: 200,
            message: 'Category Fetch Successful'
        },
        UNSUCCESS: {
            httpCode: 400,
            message: 'Category Cannot Be Fetched'
        }
    },
    LOGIN:{
        SUCCESS: {
            httpCode: 200,
            message: 'Login Successful'
        },

        NOT_MATCHED: {
            httpCode: 400,
            message: 'Email and password not matched'
        }
    },
    RESET: {
        CONTACT: {
            httpCode: 205,
            message: 'Your Email is sent'
        }
    }

}