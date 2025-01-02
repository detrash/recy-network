import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <main className="flex flex-col items-center justify-center w-full h-screen text-center text-gray-800 bg-background">
      <div className="max-w-md">
        <h1 className="mb-4 font-bold text-9xl">404</h1>
        <h1 className="mb-4 text-2xl font-bold">Page Not Found</h1>
        <p className="mb-8 text-lg">The page you’re looking for doesn’t exist or has been moved.</p>
        <div className="flex justify-center">
          <button
            onClick={handleGoBack}
            className="px-4 py-2 text-white transition duration-200 rounded-md bg-primary hover:bg-primary/90"
          >
            Go Back
          </button>
        </div>
      </div>
    </main>
  );
}
