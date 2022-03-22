// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (typeof err === "string") {
    // custom application error
    return res.status(400).json({ status: "error", message: err });
  }

  // default to 500 server error
  return res.status(500).json({ status: "error", message: err.message });
};

export default errorHandler;
