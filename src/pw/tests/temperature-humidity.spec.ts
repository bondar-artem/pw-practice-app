import {test} from '../fixtures/base';

const testCases = [
  // {value: 12},
  {value: 13},
  {value: 14},
  {value: 15},
  {value: 16},
  {value: 17},
  {value: 18},
  {value: 19},
  {value: 20},
  {value: 21},
  {value: 22},
  {value: 23},
  {value: 24},
  {value: 25},
  {value: 26},
  {value: 27},
  {value: 28},
  {value: 29},
  // {value: 30},
];

testCases.forEach(({value}) => {
  test(`Should set and verify temperature to ${value} degrees`, async ({temperaturePage}) => {
    await temperaturePage.setTemperature(value)
    await temperaturePage.checkTemperature(value);
  });
})
