function createErrorResult(error) {
    return {
        status: 'error',
        error
    }
}
function createSuccessResult(data) {
    return {
        status: 'success',
        data
    }
}

function createResult(error, data) {
    return error ? createErrorResult(error) : createSuccessResult(data)
}

// function createResult(error, data) {
//     if (error) {
//         return createErrorResult(error)
//     } else {
//         createSuccessResult(data)
//     }
// }

module.exports = {
    createResult,
    createErrorResult,
    createSuccessResult,
}