type APIResponse = { error: false; data: any } | { error: true };

export default async function fetchAPI(
  path: string,
  options: RequestInit = {}
): Promise<APIResponse> {
  const response = await fetch(path, options);

  if (response.ok) {
    return await response.json();
  } else {
    return { error: true };
  }
}
