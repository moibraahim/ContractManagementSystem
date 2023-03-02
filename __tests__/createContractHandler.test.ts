import { handler } from '../src/functions/createContract';
import { describe, expect, it } from '@jest/globals';


describe('createContractHandler', () => {
  const mockEvent = {
    body: {
      title: 'Contract Title',
      description: 'Contract Description',
      userId: 'user123',
      templateId: 'template123'
    },
    headers: {
      Authorization: 'user123'
    }
  };

  const mockContext = {};

  it('should return 201 status code with created contract on success', async () => {
    const response = await handler(mockEvent, mockContext,);
    expect(response.statusCode).toBe(201);
    expect(response.body).toBeDefined();
  });

  it('should return 401 status code with "Unauthorized Header" message when Authorization header is missing', async () => {
    const invalidEvent = { ...mockEvent, headers: {} };
    const response = await handler(invalidEvent, mockContext);
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Unauthorized Header');
  });

  it('should return 401 status code with "Unauthorized" message when Authorization header does not match userId', async () => {
    const invalidEvent = { ...mockEvent, headers: { Authorization: 'user456' } };
    const response = await handler(invalidEvent, mockContext);
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Unauthorized');
  });

  it('should return 400 status code with error message on failure', async () => {
    const invalidEvent = { ...mockEvent, body: {} };
    const response = await handler(invalidEvent, mockContext);
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeDefined();
  });
});
