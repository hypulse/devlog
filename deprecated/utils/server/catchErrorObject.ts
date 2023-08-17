export default function catchErrorObject(error: unknown) {
  if (error instanceof Error) {
    return { success: false, message: error.message };
  } else {
    return { success: false, message: "Internal Server Error" };
  }
}
