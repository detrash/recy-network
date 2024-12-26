import { useNavigate } from 'react-router-dom';

export default function ErrorScreen() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <main className="bg-background flex h-screen w-full flex-col items-center justify-center text-center text-gray-800">
      <div className="max-w-lg">
        <h1 className="mb-4 text-4xl font-bold">Oops, Something went wrong!</h1>
        <p className="mb-8 text-lg">
          We're sorry, but an unexpected error has occurred. Please try again later or contact support if the issue
          persists
        </p>
        <div className="flex justify-center">
          <button
            onClick={handleGoBack}
            className="bg-foreground hover:bg-secondary-foreground rounded-lg px-4 py-2 text-white transition duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    </main>
  );
}
