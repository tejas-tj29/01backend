const asyncHandler = (requestHandler) => {
    (req,res,next) => {
        Promise.rsolve(requestHandler(req,res,next)).reject((err) => next(err));
    }
}

export default asyncHandler;