const request = require('supertest');

const app = require('../../app');

jest.mock('../../models/launches.model');
const mockedLaunchesModel = require('../../models/launches.model');

describe('GET /launches', () => {
  it('should respond with 200 success', async () => {
    const response = await request(app)
      .get('/launches')
      .expect('Content-type', /json/)
      .expect(200);
  });
});

describe('POST /launches', () => {
  const completeLaunchData = {
    mission: 'USS Enterprise',
    rocket: 'NCC 1701-D',
    target: 'Kepler-186 f',
    launchDate: 'January 4, 2028',
  };

  const launchDataWithoutDate = {
    mission: 'USS Enterprise',
    rocket: 'NCC 1701-D',
    target: 'Kepler-186 f',
  };

  const launchWithInvalidDate = {
    mission: 'USS Enterprise',
    rocket: 'NCC 1701-D',
    target: 'Kepler-186 f',
    launchDate: 'invalidData',
  };

  it('should respond with 201 success', async () => {
    const response = await request(app)
      .post('/launches')
      .send(completeLaunchData)
      .expect('Content-type', /json/)
      .expect(201);

    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(responseDate).toBe(requestDate);

    expect(response.body).toMatchObject(launchDataWithoutDate);
  });

  it('should catch missing requires properties', async () => {
    const response = await request(app)
      .post('/launches')
      .send(launchDataWithoutDate)
      .expect('Content-type', /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: 'Missing required launch property',
    });
  });

  it('should catch invalid dates', async () => {
    const response = await request(app)
      .post('/launches')
      .send(launchWithInvalidDate)
      .expect('Content-type', /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: 'Invalid launch date',
    });
  });
});

describe('DELETE /launches', () => {
  const mockLaunches = [
    {
      flightNumber: 100,
      mission: 'Test 1',
      rocket: 'TST 1',
      launchDate: '2030-12-26T23:00:00.000Z',
      target: 'Kepler',
      customer: ['ZTM', 'NASA'],
      upcoming: true,
      success: true,
    },
    {
      flightNumber: 101,
      mission: 'Test 2',
      rocket: 'TST 2',
      target: 'Kepler-186 f',
      launchDate: '2030-01-16T23:00:00.000Z',
      customer: ['Zero to Mastery', 'Nasa'],
      upcoming: true,
      success: true,
    },
  ];

  beforeEach(() => {
    mockedLaunchesModel.existsLaunchWithId.mockImplementation(() => true);
    mockedLaunchesModel.abortLaunchById.mockImplementation(
      () => mockLaunches[1],
    );
  });

  it('should delete a launch by setting upcoming and success to false', async () => {
    const response = await request(app)
      .delete('/launches/101')
      .expect('Content-type', /json/)
      .expect(200);

    console.dir(response.body);
    expect(response.body).toMatchObject({
      flightNumber: 101,
      mission: 'Test 2',
      rocket: 'TST 2',
      target: 'Kepler-186 f',
      launchDate: '2030-01-16T23:00:00.000Z',
      customer: ['Zero to Mastery', 'Nasa'],
      upcoming: true,
      success: true,
    });
  });
});
