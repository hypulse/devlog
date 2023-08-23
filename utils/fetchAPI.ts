type APIResponse<T> = { error: boolean; data?: T; message?: string };

export default async function fetchAPI<T>(
  path: string,
  options: RequestInit = {}
): Promise<APIResponse<T>> {
  try {
    const response = await fetch(path, options);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Server returned a ${response.status} status.`);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return {
      error: true,
      message: `An error has occurred: ${message}`,
    };
  }
}
