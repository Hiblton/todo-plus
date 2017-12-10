export class Task {
    id?: number;
    name: string; // required
    is_done?: boolean;
    priority?: number;
    date?: Date;
    showControls?: boolean;
    selected?: boolean;
}
