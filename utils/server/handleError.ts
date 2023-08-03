const handleError = (error: unknown) => {
  if (error instanceof Error) {
    return { success: false, message: error.message };
  }
  return { success: false, message: "An unexpected error occurred" };
};

export default handleError;
