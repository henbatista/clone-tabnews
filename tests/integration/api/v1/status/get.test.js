test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parseUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parseUpdatedAt);

  expect(responseBody.max_connections).toBeDefined();
  expect(Number.isInteger(parseInt(responseBody.max_connections))).toBe(true);

  expect(responseBody.opened_connections).toBeDefined();
  expect(Number.isInteger(parseInt(responseBody.opened_connections))).toBe(
    true,
  );

  expect(responseBody.version).toBeDefined();
  expect(typeof responseBody.version).toBe(`string`);
});
