export interface HttpClient {
  (url: string|URL, init?: RequestInit): Promise<Response>;
}
