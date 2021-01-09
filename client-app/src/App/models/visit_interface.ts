// Creating a Typescript interface that's controlling what the visits' parameters are - this is for type-checking
// Not using a class to do this because Interfaces don't get generated into Javascript the way classes do
// so the final code output will be less this way

export interface IVisitsEnvelope {
    visits: IVisit[];
    visitCount: number;
  }

export interface IVisit
{
    id: string;
    title: string;
    description: string;
    // category: string;
    date: Date;       
    city: string;
    venue: string;
    isGoing: boolean;
    isHost: boolean;
    attendees: IAttendee[];
    comments: IComment[];
}

export interface IComment {
    id: string;
    createdAt: Date;
    body: string;
    username: string;
    displayName: string;
    image: string;
}

// Partial and ? means optional
export interface IVisitFormValues extends Partial<IVisit> {
    time?: Date;
  }

// Initialise our form properties
export class VisitFormValues implements IVisitFormValues {
    id?: string = undefined;
    title: string = '';
    // category: string = '';
    description: string = '';
    date?: Date = undefined;
    time?: Date = undefined;
    city: string = '';
    venue: string = '';

    constructor(init?: IVisitFormValues) {
        if (init && init.date) {
        init.time = init.date;
        }
        Object.assign(this, init);
    }
}

export interface IAttendee {
    username: string;
    displayName: string;
    image: string;
    isHost: boolean;
    following?: boolean;
  }