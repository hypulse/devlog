type APIResponse<T> = { error: boolean; data?: T; message?: string };

export default async function fetchAPI<T>(
  path: string,
  options: RequestInit = {}
): Promise<APIResponse<T>> {
  const controller = new AbortController();
  const { signal } = controller;

  setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(path, { ...options, signal });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Server returned a ${response.status} status.`);
    }
  } catch (err) {
    console.error(err);
    let message: string;
    if (err instanceof Error) {
      if (err.name === "AbortError") {
        message = "The request was aborted due to a timeout.";
      } else {
        message = err.message;
      }
    } else {
      message = "Unknown error";
    }
    return {
      error: true,
      message: `An error has occurred: ${message}`,
    };
  }
}
