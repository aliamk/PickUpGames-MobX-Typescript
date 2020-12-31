// Creating a Typescript interface that's controlling what the activities' parameters are - this is for type-checking
// Not using a class to do this because Interfaces don't get generated into Javascript the way classes do
// so the final code output will be less this way

export interface IVisit
{
    id: string;
    title: string;
    description: string;
    category: string;
    date: Date | null;       // Temporarily set to string instead of Date to avoid errors in the ActivityForm Submit button
    city: string;
    venue: string;
}