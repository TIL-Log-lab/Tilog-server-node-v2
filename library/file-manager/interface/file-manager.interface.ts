// NOTE: 파일 업로드 서비스 전체는 해당 인터페이스를 준수해야합니다
// 확장성을 위해 DI 시 해당 인터페이스를 명시합니다
export interface FileManagerRepository {
  save: (request: {
    fileName: string;
    fileRaw: Buffer;
    mimeType: string;
  }) => Promise<{
    name: string;
    location: string;
  }>;

  delete: (request: { fileName: string }) => Promise<{ name: string }>;
}
