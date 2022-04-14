export class GetAccessTokenUsingRefreshTokenResponse {
  accessToken: string;

  constructor(required: Required<GetAccessTokenUsingRefreshTokenResponse>) {
    Object.assign(required, this);
  }
}
