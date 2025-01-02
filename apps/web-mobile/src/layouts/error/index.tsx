import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function Error() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <main className="flex flex-col items-center justify-center w-full h-screen text-center text-gray-800 bg-background">
      <div className="max-w-lg">
        <h1 className="mb-4 text-4xl font-bold">Oops, Something went wrong!</h1>
        <p className="mb-8 text-lg">
          We're sorry, but an unexpected error has occurred. Please try again later or contact support if the issue
          persists
        </p>
        <div className="flex justify-center">
          <Button variant="default" onClick={handleGoBack}>
            Try Again
          </Button>
        </div>
      </div>
    </main>
  );
}
