export type turnstileWindow = Window & {
  turnstile?: {
    remove: (string?: string) => void;
    render: (string: string, options: turnstileRenderBody) => void;
    getResponse: () => void;
  };
};
type turnstileRenderBody = {
  sitekey: string;
  callback: (token: string) => void;
  appearance: string;
  language?: string;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact';
};
