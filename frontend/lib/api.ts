/**
 * API Client for Ads Quality Rater Backend
 */

import axios, { AxiosInstance } from "axios";
import type { AnalysisRequest, AnalysisResponse } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      timeout: 120000, // 2 minutes (analysis can take up to 60s)
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Health check
   */
  async healthCheck() {
    const response = await this.client.get("/health");
    return response.data;
  }

  /**
   * Start analysis
   */
  async analyzeAd(request: AnalysisRequest): Promise<AnalysisResponse> {
    const response = await this.client.post<AnalysisResponse>(
      "/api/v1/analyze",
      request
    );
    return response.data;
  }

  /**
   * Get analysis by ID
   */
  async getAnalysis(analysisId: string): Promise<AnalysisResponse> {
    const response = await this.client.get<AnalysisResponse>(
      `/api/v1/analysis/${analysisId}`
    );
    return response.data;
  }

  /**
   * Start analysis with streaming logs
   */
  analyzeAdStream(
    request: AnalysisRequest,
    adFile: File | null,
    onLog: (log: string) => void,
    onResult: (report: any) => void,
    onError: (error: string) => void
  ): () => void {
    // Use fetch with SSE (EventSource doesn't support POST)
    const controller = new AbortController();

    // Create FormData for multipart upload
    const formData = new FormData();
    formData.append("landing_page_url", request.landing_page_url);

    if (adFile) {
      // Direct file upload (no base64 encoding!)
      formData.append("ad_file", adFile);
    } else if (request.ad_url) {
      // URL fallback
      formData.append("ad_url", request.ad_url);
    }

    if (request.brand_guidelines) {
      formData.append("brand_guidelines", JSON.stringify(request.brand_guidelines));
    }

    if (request.target_audience) {
      formData.append("target_audience", request.target_audience);
    }

    fetch(`${API_URL}/api/v1/analyze/stream`, {
      method: "POST",
      body: formData,  // Send FormData directly (no Content-Type header needed)
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          throw new Error("No reader available");
        }

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              try {
                const event = JSON.parse(data);

                if (event.type === "log") {
                  onLog(event.data);
                } else if (event.type === "result") {
                  onResult(event.data);
                } else if (event.type === "error") {
                  onError(event.data);
                }
              } catch (e) {
                // Ignore parse errors for heartbeat or malformed data
              }
            }
          }
        }
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          onError(error.message);
        }
      });

    // Return cleanup function
    return () => controller.abort();
  }
}

export const apiClient = new ApiClient();
