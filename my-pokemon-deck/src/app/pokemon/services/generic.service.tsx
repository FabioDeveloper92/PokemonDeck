export async function makeAPICall<T>(endpoint: string): Promise<T> {
  const response = await fetch(endpoint);

  if (response.ok) {
    const pokemonResponse = response.json() as Promise<T>;
    return await pokemonResponse;
  }

  return null;
}

export async function makeMultipleAPICalls<T>(
  endpoints: string[]
): Promise<T[]> {
  const promises = endpoints.map(makeAPICall<T>);
  const responses = await Promise.all(promises);

  return responses;
}
