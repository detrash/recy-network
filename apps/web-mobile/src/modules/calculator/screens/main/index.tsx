import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function CalculatorScreen() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleAcquireCertificate = () => {
    navigate('/calculator/steps');
  };

  return (
    <>
      <section className="flex justify-center bg-[url('/assets/bg/ocean-dark.jpg')] bg-cover bg-center p-6 text-center text-white">
        <div className="border-md flex flex-col gap-4 p-2">
          <p className="max-w-96 text-lg">{t('calculator.main.hero')}</p>

          <div>
            <Button size="lg" onClick={handleAcquireCertificate}>
              {t('calculator.main.cta')}
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto my-6 flex max-w-2xl flex-col gap-6">
        <Card className="sm:rounded-xl sm:shadow-xl">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <h2 className="text-lg lg:text-2xl">{t('calculator.main.paragraph.one.title')}</h2>
          </CardHeader>
          <CardContent>
            <p className="text-sm lg:text-base">{t('calculator.main.paragraph.one.text')}</p>
          </CardContent>
        </Card>

        <Card className="sm:rounded-xl sm:shadow-xl">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <h2 className="text-lg lg:text-2xl">{t('calculator.main.paragraph.two.title')}</h2>
          </CardHeader>

          <CardContent>
            <p className="text-sm lg:text-base">{t('calculator.main.paragraph.two.text')}</p>
          </CardContent>
        </Card>

        <Card className="sm:rounded-xl sm:shadow-xl">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <h2 className="text-lg lg:text-2xl">{t('calculator.main.paragraph.three.title')}</h2>
          </CardHeader>

          <CardContent>
            <p className="text-sm lg:text-base">{t('calculator.main.paragraph.three.text')}</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
