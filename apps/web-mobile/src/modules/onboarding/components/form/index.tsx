'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Icon } from '@iconify/react';
import { useUpdateUser } from '@/services/users';
import { Loader2 } from 'lucide-react';
import { Roles } from '@/constants/index';
import { useRoles } from '@/services/roles';
import { Skeleton } from '@/components/ui/skeleton';

const rolesDescriptions = {
  [Roles.PARTNER]: {
    title: 'Partner',
    description: 'Collaborate with recyclers and waste generators',
    icon: 'mdi:handshake',
  },
  [Roles.RECYCLER]: {
    title: 'Recycler',
    description: 'Process and recycle waste materials',
    icon: 'mdi:recycle',
  },
  [Roles.WASTE_GENERATOR]: {
    title: 'Waste Generator',
    description: 'Produce waste that needs recycling',
    icon: 'mdi:factory',
  },
} as const;

interface OnboardingProps {
  userId: string;
  onClose: () => void;
}

const formSchema = z.object({
  role: z.string().min(1, 'You must select a role.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function OnboardingForm({ userId, onClose }: OnboardingProps) {
  const { updateUser, isSuccess, isPending } = useUpdateUser();
  const { data: rolesData, isLoading: isLoadingRoles } = useRoles();

  const rolesToHidden: string[] = [Roles.NEW_USER, Roles.ADMIN, Roles.AUDITOR];
  const rolesValids = rolesData?.roles ? rolesData.roles.filter((role) => !rolesToHidden.includes(role.name)) : [];

  const rolesCards = rolesValids?.map((role) => {
    const roleDescription = rolesDescriptions[role.name as keyof typeof rolesDescriptions];

    return {
      id: role.id,
      name: role.name,
      title: roleDescription?.title || '',
      description: roleDescription?.description || '',
      icon: roleDescription?.icon || '',
    };
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    const selectedRole = rolesCards.find((role) => role.id === data.role);

    if (selectedRole) {
      await updateUser({
        id: userId,
        data: {
          roleIds: [selectedRole.id],
        },
      });
    }
  };

  if (isSuccess) {
    onClose();
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl">
        <h1 className="mb-2 text-center text-2xl font-bold">Welcome to Our Recycling Platform</h1>
        <p className="mb-6 text-center">Please select your role to get started</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <CardContent className="p-0">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value || ''}
                        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                      >
                        {isLoadingRoles && (
                          <>
                            <Skeleton className="h-[200px] w-full rounded-sm" />
                            <Skeleton className="h-[200px] w-full rounded-sm" />
                            <Skeleton className="h-[200px] w-full rounded-sm" />
                          </>
                        )}

                        {!isLoadingRoles &&
                          rolesCards?.map((role) => (
                            <FormItem key={role.id}>
                              <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                                <FormControl>
                                  <RadioGroupItem value={role.id} className="sr-only" />
                                </FormControl>
                                <Card className="hover:border-primary [&:has([data-state=checked])]:border-primary flex h-full cursor-pointer flex-col justify-between border-2 p-4 transition-colors duration-200 ease-in-out">
                                  <CardHeader className="p-0">
                                    <Icon icon={role.icon} className="text-primary mx-auto mb-2 h-12 w-12" />
                                    <CardTitle className="text-center text-lg">{role.title}</CardTitle>
                                  </CardHeader>
                                  <CardDescription className="flex-grow text-center text-sm">
                                    {role.description}
                                  </CardDescription>
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
            <CardFooter className="mt-6 flex justify-center p-0">
              <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Continue'
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </div>
    </div>
  );
}
