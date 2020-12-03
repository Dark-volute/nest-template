import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
declare const module: any;
import {
  ClientProxyFactory,
  Transport,
  ClientOptions,
} from '@nestjs/microservices';

// const microservicesOptions: ClientOptions = {
//   transport: Transport.TCP,
//   options: {
//     host: '127.0.0.1',
//     port: 8877,
//   },
// };
//
// const client = ClientProxyFactory.create(microservicesOptions);
// client.send<number, number[]>('add', [1, 2, 3]).subscribe(result => console.log(`/add:  [result] = ${result}`));

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
