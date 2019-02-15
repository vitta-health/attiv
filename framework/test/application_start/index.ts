import Application from '../../application/application';
import container from '../../application/config/Container';

const app = container.resolve('app') as Application;

app.start().catch(error => {
  console.log(error);
  process.exit();
});
