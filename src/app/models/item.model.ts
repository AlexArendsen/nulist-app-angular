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
        Object.assign(this, {descendants: 0, completedDescendants: 0}, ...init);
    }

    saving = false;
    children: ItemVM[] = [];
    get percent(): number { return this.checked ? 1 : (this.completedDescendants / (!!this.descendants ? this.descendants : 1)); }
    descendants: number = -1;
    completedDescendants: number = -1;

}