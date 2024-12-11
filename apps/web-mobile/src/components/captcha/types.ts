export type turnstileWindow = Window & {
  turnstile?: {
    remove: (string?: string) => void;
    render: (string: string, { sitekey, callback }: turnstileRenderBody) => void;
    getResponse: () => void;
  };
};
type turnstileRenderBody = {
  sitekey: string;
  callback: (token: any) => void;
  appearance: string;
};
