import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MATERIAL_TYPES, Materials, MaterialType } from '@/entities/report';
import { CreateRecyclingReport } from '../../../../services/reports/types';
import { z } from 'zod';
import { wasteIcons } from '../reports-modal/constants';
import { Icon } from '@iconify/react';
import { materialColors } from '@/modules/dashboard/componentes/chart/constants';

export const formSchema = z.object({
  materials: z
    .record(
      z.enum(Object.values(MATERIAL_TYPES) as [MaterialType, ...MaterialType[]]),
      z.number().min(0.001).optional()
    )
    .refine((materials) => Object.values(materials).some((value) => value > 0), {
      message: 'At least one material must be selected',
    }),
  evidence: z.custom<File>((file) => file instanceof File && file.size > 0, {
    message: 'Evidence file is required and must not be empty',
  }),
});
type FormValues = z.infer<typeof formSchema>;

interface RecyFormSubmissionProps {
  onCreateReport: (formData: FormData) => void;
}

export default function RecyFormSubmission({ onCreateReport }: RecyFormSubmissionProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      materials: Object.values(MATERIAL_TYPES).reduce(
        (acc, type) => {
          acc[type] = undefined;
          return acc;
        },
        {} as Record<MaterialType, number | undefined>
      ),
      evidence: undefined,
    },
  });

  const onSubmit = async (data: FormValues) => {
    const formattedData: CreateRecyclingReport = {
      submittedBy: '0779f19c-34a8-40c2-a482-54a353a507c0',
      materials: data.materials as Materials,
      // TODO: add user values
      // phone: '+5511999999999',
      // walletAddress: '0x0ss',
      residueEvidenceFile: data.evidence,
    };

    const formData = new FormData();

    formData.append('materials', JSON.stringify(formattedData.materials));

    formData.append('submittedBy', formattedData.submittedBy);

    // TODO: add user values
    // formData.append('phone', formattedData.phone);
    // formData.append('walletAddress', formattedData.walletAddress);

    formData.append('residueEvidenceFile', data.evidence, data.evidence.name);

    await onCreateReport(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" id="recy-form">
        <FormField
          control={form.control}
          name="materials"
          render={() => (
            <FormItem className="flex flex-col gap-4">
              <FormLabel>WHAT KINDS OF WASTE ARE YOU REPORTING TODAY?</FormLabel>
              <div className="grid grid-cols-2 gap-4">
                {Object.values(MATERIAL_TYPES).map((type) => (
                  <FormItem key={type} className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={form.watch(`materials.${type}`) !== undefined}
                          onCheckedChange={(checked) => {
                            form.setValue(`materials.${type}`, checked ? 0.001 : undefined);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="flex items-center font-normal">
                        <Icon
                          icon={wasteIcons[type]}
                          className="w-5 h-5 mr-2"
                          style={{ color: materialColors[type] }} // Apply the color dynamically
                        />
                        {type}
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        type="number"
                        value={form.watch(`materials.${type}`) ?? ''}
                        min="0.001"
                        step="0.001"
                        onChange={(e) => {
                          const value = e.target.value ? parseFloat(e.target.value) : undefined;
                          form.setValue(`materials.${type}`, value);
                        }}
                        disabled={form.watch(`materials.${type}`) === undefined}
                        className="w-full"
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
      </form>
    </Form>
  );
}
