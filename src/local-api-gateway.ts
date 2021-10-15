import { LocalApiGateway } from '@greeninvoice/lambda-backend-tools'; 

const run = async () => {
    const api = new LocalApiGateway({port:3100, resource: '/v1/{proxy+}'});
    const handler = require('./index').handler;
    await api.listen(handler);
}

run()
  .then(() => {
    console.log('api listener up');
  })
  .catch(err => {
    console.log('api listener error!', err);
  });

