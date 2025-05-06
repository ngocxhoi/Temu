interface MessageResponse {
  message: string;
}

export interface DeleteBlobResponse extends MessageResponse {
  pathname: string;
}

export interface UserCreateResponse extends MessageResponse {
  data: any;
}
