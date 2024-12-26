import { useNavigate } from 'react-router-dom';

export default function NotFoundScreen() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <main className="bg-background flex h-screen w-full flex-col items-center justify-center text-center text-gray-800">
      <div className="max-w-md">
        <h1 className="mb-4 text-9xl font-bold">404</h1>
        <h1 className="mb-4 text-2xl font-bold">Page Not Found</h1>
        <p className="mb-8 text-lg">The page you’re looking for doesn’t exist or has been moved.</p>
        <div className="flex justify-center">
          <button
            onClick={handleGoBack}
            className="bg-primary hover:bg-primary/90 rounded-md px-4 py-2 text-white transition duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    </main>
  );
}
