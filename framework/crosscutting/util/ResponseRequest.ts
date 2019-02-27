import messages from '../messages/message';

export default class ResponseRequest<T> {
  data: T;
  status: number = 200;
  message: string = messages.successHandler.SUCCESS;
  detais: any = {};
}
