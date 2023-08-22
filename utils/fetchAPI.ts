type APIResponse<T> = { error: boolean; data?: T };

export default async function fetchAPI<T>(
  path: string,
  options: RequestInit = {}
): Promise<APIResponse<T>> {
  const response = await fetch(path, options);

  if (response.ok) {
    return await response.json();
  } else {
    return { error: true };
  }
}
