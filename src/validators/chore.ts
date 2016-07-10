import schema = require('valiate');

const choreSchema = schema({
  name: {
    type: 'string',
    required: true
  },
  startDate: {
    type: 'date',
    required: true
  }
});

export class ChoreValidator {

}
