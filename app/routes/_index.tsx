import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MultiSelectCombobox } from '@/components/ui/multiselect-combobox';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, json } from "@remix-run/react";
import type { ActionFunctionArgs, MetaFunction } from "@vercel/remix";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import * as z from 'zod';


const commonInterests = [
  "Reading",
  "Gardening",
  "Cooking",
  "Traveling",
  "Photography",
  "Hiking",
  "Painting",
  "Yoga",
  "Watching movies",
  "Playing sports",
  "Writing",
  "DIY projects",
  "Meditation",
  "Cycling",
  "Playing musical instruments",
  "Dancing",
  "Fishing",
  "Collecting items",
  "Volunteering",
  "Camping",
  "Knitting or crocheting",
  "Gaming",
  "Birdwatching",
  "Scrapbooking",
  "Astronomy",
  "Home improvement",
  "Wine tasting",
  "Journalling"
];


export const meta: MetaFunction = () => {
  return [
    { title: "Replica Counterfeit Investigator Profiles" },
    { name: "description", content: "Keep track of the aliases you use for investigating counterfeiting" },
  ];
};

const addProfileSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  interests: z.array(z.string().min(1)),
  location: z.string().min(1),
});

type AddProfileSchema = z.infer<typeof addProfileSchema>
const resolver = zodResolver(addProfileSchema);

export const action = async ({ request }: ActionFunctionArgs) => {
  const { errors, data, receivedValues: defaultValues } =
    await getValidatedFormData<FormData>(request, resolver);
  if (errors) {
    return json({ errors, defaultValues });
  }

  // TODO: Handle submission
  // Get weather from location
  return json(data);
};

export default function Index() {
  const {
    handleSubmit,
    // TODO: Bake error handling into Input components
    // formState: { errors },
    register,
  } = useRemixForm<AddProfileSchema>({
    mode: "onSubmit",
    resolver,
  });

  return (
    <Card className='max-w-900 m-4 mt-8 max-w-screen-lg'>
      <CardHeader>
        <CardTitle>Add Investigator Profile</CardTitle>
        <CardDescription>Keep track of who your alias' personal details to ensure you keep your story straight.</CardDescription>
      </CardHeader>
      <CardContent>

        <Form method="post" onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-96">
          <Input label="First Name" {...register('firstName')} type="text" />
          <Input label="Last Name" {...register('lastName')} type="text" />
          {/* TODO: Create location autocomplete using Google Maps or another location API */}
          <Input label="Location" {...register('location')} type="text" placeholder="Search for location" />
          {/* TODO: Add remix-form handling */}
          <MultiSelectCombobox label="List of Interests" list={commonInterests}   />
          <Button type="submit">Create Profile</Button>
        </Form>
      </CardContent>
    </Card>
  );
}
