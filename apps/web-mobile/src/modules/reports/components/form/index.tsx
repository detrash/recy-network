import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MATERIAL_TYPES, Materials, MaterialType } from '@/entities/report';
import { CreateRecyclingReport } from '../../../../services/reports/types';
import { z } from 'zod';
import { wasteIcons } from '../reports-modal/constants';
import { Icon } from '@iconify/react';
import { materialColors } from '@/modules/dashboard/componentes/chart/constants';
import { EvidenceUploader } from './evidence-uploader';

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
                <EvidenceUploader field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
