import messages from "../messages/message";

export default class ResponseRequest<T> {
  total: number | null;
  page: number | null;
  pageSize: number | null;
  pages: number | null;
  data: T;
  status: number = 200;
  message: string = messages.successHandler.SUCCESS;
  detais: any = {};
}
