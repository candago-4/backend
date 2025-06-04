expor default class Device {
    id: string;
    name: string;
    user_id: string;

    constructor(id: string, name: string, user_id: string) {
        this.id = id;
        this.name = name;
        this.user_id = user_id;
    }
    setName(new_name: string) {
        this.name = new_name;
    }
    setUserId(new_user_id: string) {
        this.user_id = new_user_id;
    }
    getDevice() {
        return {
            id: this.id,
            name: this.name,
            user_id: this.user_id
        };
    }
}