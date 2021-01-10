import { IVisit, IAttendee } from "../../models/visit_interface";
import { IUser } from "../../models/user";

export const combineDateAndTime = (date: Date, time: Date) => {
    // const timeString = time.getHours() + ':' + time.getMinutes() + ':00';

    // const year = date.getFullYear();
    // const month = date.getMonth() + 1;
    // const day = date.getDate();
    // const dateString = `${year}-${month}-${day}`;
    const dateString = date.toISOString().split('T')[0];
    const timeString = time.toISOString().split('T')[1];

    return new Date(dateString + ' ' + timeString);
}

export const setVisitProps = (visit: IVisit, user: IUser) => {
    visit.date = new Date(visit.date);
    visit.isGoing = visit.attendees.some(
      v => v.username === user.username
    )
    visit.isHost = visit.attendees.some(
      v => v.username === user.username && v.isHost
    )
    return visit;
}

export const createAttendee = (user: IUser): IAttendee => {
    return {
        displayName: user.displayName,
        isHost: false,
        username: user.username,
        image: user.image!
    }
}