export interface Message {
    id: string;
    content: string;
    created_at: string;
  }
  
  export interface CreateMessageRequest {
    content: string;
  }
  
  export interface CreateMessageResponse {
    error?: string;
    data?: Message;
  }