export async function makeAPICall(endpoint: string): Promise<unknown> {
  const response = await fetch(endpoint);

  if (response.ok) {
    const pokemonResponse = response.json() as Promise<unknown>;
    return await pokemonResponse;
  }

  return null;
}

export async function makeMultipleAPICalls(endpoints: string[]): Promise<unknown[]> {
  const promises = endpoints.map(makeAPICall);
  const responses = await Promise.all(promises);

  return responses;
}
