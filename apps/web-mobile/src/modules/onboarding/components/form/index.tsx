import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Icon } from '@iconify/react';
import { useUpdateUser } from '@/services/users';
import { Dispatch, SetStateAction } from 'react';
import { Loader2 } from 'lucide-react';

const roles = [
  {
    id: 'partner',
    roleId: '4',
    title: 'Partner',
    description: 'Collaborate with recyclers and waste generators',
    icon: 'mdi:handshake',
  },
  {
    id: 'recycler',
    roleId: '2',
    title: 'Recycler',
    description: 'Process and recycle waste materials',
    icon: 'mdi:recycle',
  },
  {
    id: 'waste-generator',
    roleId: '3',
    title: 'Waste Generator',
    description: 'Produce waste that needs recycling',
    icon: 'mdi:factory',
  },
] as const;

const formSchema = z.object({
  role: z.enum(['partner', 'recycler', 'waste-generator'], {
    required_error: 'You must select a role.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface OnboardingProps {
  userId: string; // Pass the user ID as a prop
  onClose: () => void;
}

export default function OnboardingForm({ userId, onClose }: OnboardingProps) {
  const { updateUser, isSuccess, isPending } = useUpdateUser();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    const selectedRole = roles.find((role) => role.id === data.role);

    if (!selectedRole) {
      return;
    }

    await updateUser({
      id: userId,
      data: {
        roleIds: ['2'],
      },
    });
  };

  if (isSuccess) onClose();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-2 bg-gray-100">
      <h1 className="text-2xl font-bold text-center">Welcome to Our Recycling Platform</h1>
      <p className="text-center">Please select your role to get started</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent>
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid gap-8 pt-2 sm:grid-cols-3"
                    >
                      {roles.map((role) => (
                        <FormItem key={role.id}>
                          <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                            <FormControl>
                              <RadioGroupItem value={role.id} className="sr-only" />
                            </FormControl>
                            <Card className="[&:has([data-state=checked])]:border-primary cursor-pointer border-2">
                              <CardHeader>
                                <Icon icon={role.icon} className="w-12 h-12 mx-auto text-primary" />
                                <CardTitle className="text-center">{role.title}</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-center text-gray-600">{role.description}</p>
                              </CardContent>
                            </Card>
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-center gap-2">
            {isPending && <Loader2 className="animate-spin" />}
            <Button type="submit" disabled={isPending}>
              Continue
            </Button>
          </CardFooter>
        </form>
      </Form>
    </div>
  );
}
