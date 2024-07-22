import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

class HuxApiService {
  private api: AxiosInstance;
  private token: string | null;

  constructor(baseURL: string, defaultHeaders: Record<string, string> = {}) {
    this.api = axios.create({
      baseURL: baseURL,
      headers: defaultHeaders,
    });

    // Initialize token
    this.token = null;

    // Request interceptor
    this.api.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // Add token to headers if it exists
        if (this.token) {
          config.headers = config.headers ?? {};
          config.headers["Authorization"] = `Bearer ${this.token}`;
        }
        return config;
      },
      (error: AxiosError) => {
        // Handle request error
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        // Any status code that lies within the range of 2xx causes this function to trigger
        return response;
      },
      (error: AxiosError) => {
        // Any status codes that falls outside the range of 2xx causes this function to trigger
        return Promise.reject(this.handleError(error));
      }
    );
  }

  // Handle error responses
  private handleError(error: AxiosError): any {
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error("Response Error:", error.response.data);
      return error.response.data;
    } else if (error.request) {
      // Request was made but no response was received
      console.error("Request Error:", error.request);
      return { message: "No response received from server" };
    } else {
      // Something happened in setting up the request
      console.error("Error:", error.message);
      return { message: error.message };
    }
  }

  // Set headers (e.g., auth token)
  public setHeaders(headers: Record<string, string>): void {
    Object.assign(this.api.defaults.headers, headers);
  }

  // Set authentication token
  public setToken(token: string | null): void {
    this.token = token;
  }

  // GET request
  public async get(
    endpoint: string,
    params: Record<string, any> = {}
  ): Promise<AxiosResponse> {
    return this.api.get(endpoint, { params });
  }

  // POST request
  public async post(
    endpoint: string,
    data: Record<string, any> = {}
  ): Promise<AxiosResponse> {
    return this.api.post(endpoint, data);
  }

  // PUT request
  public async put(
    endpoint: string,
    data: Record<string, any> = {}
  ): Promise<AxiosResponse> {
    return this.api.put(endpoint, data);
  }

  // DELETE request
  public async delete(endpoint: string): Promise<AxiosResponse> {
    return this.api.delete(endpoint);
  }

  // PATCH request
  public async patch(
    endpoint: string,
    data: Record<string, any> = {}
  ): Promise<AxiosResponse> {
    return this.api.patch(endpoint, data);
  }

  // Custom request
  public async request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.api.request(config);
  }
}

export default HuxApiService;
