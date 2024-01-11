 // this method can be used when the function handled with promises
const AsyncHandler = (requestHandler) => {
 return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export default AsyncHandler ;

/*

// const AsyncHandler = ()=>{}
// const AsyncHandler = (fun)=> ()=>{}
// const AsyncHandler = async (fun)=> ()=>{}

const AsyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    res.status(err.code || 500).json({
      success: false,
      message: err.message,
    });
  }
};

It is like rapper of database 

this method can be used when the function handled with try-catch

*/
