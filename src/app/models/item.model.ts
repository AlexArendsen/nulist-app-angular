export class Item {
    _id: string;
    title: string;
    description: string;
    parent_id: string;
    checked: boolean;
    user_id: string;
}

export class ItemVM extends Item {

    constructor(...init: Partial<Item>[]) {
        super();
        Object.assign(this, {percent: 0}, ...init);
    }

    saving = false;
    children: ItemVM[] = [];
    percent: number = -1;

}