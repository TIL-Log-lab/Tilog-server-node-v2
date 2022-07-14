export class UploadImageResponseDto {
  path: string;

  constructor(required: Required<UploadImageResponseDto>) {
    Object.assign(this, required);
  }
}
