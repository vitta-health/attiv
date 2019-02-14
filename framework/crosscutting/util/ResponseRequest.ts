export default class ResponseRequest<T> {
  data: T;
  status: number = 200;
  message: string = 'SUCCESS';
  detais: any = {};
}
