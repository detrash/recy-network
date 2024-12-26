import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Icon } from '@iconify/react';
import { useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { Material, MATERIAL_TYPES, MaterialType } from '@/entities/report';
import { useCreateRecyclingReport } from '../../services/reports';
import { CreateRecyclingReport } from '../../services/reports/types';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';

const wasteIcons = {
  PLASTIC: 'tabler:recycle',
  PAPER: 'fluent:document-24-regular',
  METAL: 'material-symbols:iron',
  GLASS: 'ic:round-local-drink',
  ORGANIC: 'mdi:leaf',
  TEXTILE: 'mdi:tshirt-crew-outline',
  LANDFILL_WASTE: 'material-symbols:delete-forever',
};

const formSchema = z.object({
  materials: z
    .record(z.number().optional())
    .refine((data) => Object.values(data).some((value) => value !== undefined && value > 0), {
      message: 'At least one material must be selected',
    }),
  evidence: z.custom<File>((file) => file instanceof File && file.size > 0, {
    message: 'Evidence file is required and must not be empty',
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function RecyFormSubmission() {
  const { address, isConnected } = useAccount();
  const { mutate: createReport, isPending } = useCreateRecyclingReport();
  const { open } = useWeb3Modal();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      materials: Object.keys(MATERIAL_TYPES).reduce(
        (acc, key) => {
          acc[key] = undefined;
          return acc;
        },
        {} as Record<string, number | undefined>
      ),
      evidence: undefined,
    },
  });

  const onSubmit = async (data: FormValues) => {
    const materialsFormatted: Material[] = Object.keys(data.materials).map((key) => {
      const materialType = key as MaterialType;
      const weightKg = data.materials[key] as number;
      return { materialType, weightKg };
    });

    const formattedData: CreateRecyclingReport = {
      submittedBy: '0779f19c-34a8-40c2-a482-54a353a507c0',
      phone: '+5511999999999',
      materials: materialsFormatted,
      walletAddress: address,
      residueEvidenceFile: data.evidence,
    };

    const formData = new FormData();

    formData.append('materials', JSON.stringify(formattedData.materials));

    formData.append('submittedBy', formattedData.submittedBy);
    formData.append('phone', formattedData.phone);
    formData.append('walletAddress', formattedData.walletAddress);

    formData.append('residueEvidenceFile', data.evidence, data.evidence.name);

    await createReport(formData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Recy Form Submission</CardTitle>
        <CardDescription>
          Here is where you show how you are keeping our world clean and get some cRECYS.
        </CardDescription>
        <p className="mt-2 text-sm text-muted-foreground">
          Remember to fill the form with care. We are a reputation-based system.
        </p>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Button variant={isConnected ? 'outline' : 'default'} onClick={() => open()}>
            {isConnected && address ? `Wallet: ${address.slice(0, 4)}...${address.slice(-4)}` : 'Connect Wallet'}
          </Button>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="materials"
              render={() => (
                <FormItem>
                  <FormLabel>WHAT KINDS OF WASTE ARE YOU REPORTING TODAY?</FormLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.values(MATERIAL_TYPES).map((type) => (
                      <FormItem key={type} className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={form.watch('materials')[type] !== undefined && form.watch('materials')[type] > 0}
                            onCheckedChange={(checked) => {
                              const updatedMaterials = { ...form.getValues('materials') };
                              updatedMaterials[type] = checked ? 0.001 : undefined;
                              form.setValue('materials', updatedMaterials);
                            }}
                          />
                        </FormControl>
                        <FormLabel className="flex items-center font-normal">
                          <Icon icon={wasteIcons[type]} className="w-5 h-5 mr-2" />
                          {type}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            value={form.watch('materials')[type] ?? ''}
                            min="0.001"
                            step="0.001"
                            onChange={(e) => {
                              const updatedMaterials = { ...form.getValues('materials') };
                              const value = e.target.value ? parseFloat(e.target.value) : undefined;
                              updatedMaterials[type] = value;
                              form.setValue('materials', updatedMaterials);
                            }}
                            disabled={form.watch('materials')[type] === undefined}
                          />
                        </FormControl>
                      </FormItem>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="evidence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>UPLOAD YOUR EVIDENCE</FormLabel>
                  <FormControl>
                    <div className="flex justify-center px-6 py-10 mt-2 border border-dashed rounded-lg border-gray-900/25">
                      <div className="text-center">
                        {field.value ? (
                          <div>
                            <p className="text-sm text-gray-700">File uploaded: {field.value.name}</p>
                            {field.value.type.startsWith('image') && (
                              <img src={URL.createObjectURL(field.value)} alt="Preview" className="w-32 h-32 mt-2" />
                            )}
                            {field.value.type.startsWith('video') && (
                              <video controls src={URL.createObjectURL(field.value)} className="w-32 h-32 mt-2">
                                Your browser does not support the video tag.
                              </video>
                            )}
                            <Button
                              variant="destructive"
                              type="button"
                              onClick={() => field.onChange(null)}
                              className="my-4"
                            >
                              Remove file
                            </Button>
                          </div>
                        ) : (
                          <div>
                            <svg
                              className="w-12 h-12 mx-auto text-gray-300"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <div className="flex mt-4 text-sm leading-6 text-gray-600">
                              <label
                                htmlFor="evidence"
                                className="relative font-semibold text-indigo-600 bg-white rounded-md cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="evidence"
                                  type="file"
                                  className="sr-only"
                                  accept=".pdf,.png,.mp4,.mpeg,.mpg"
                                  onChange={(e) => field.onChange(e.target.files?.[0])}
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">
                              Supported formats: PDF, PNG, MP4, MPEG, MPG. Maximum of 1 file.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="animate-spin" />}
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
