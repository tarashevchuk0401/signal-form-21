import { DeliveryDay, DeliveryType } from 'src/app/features/delivery/delivery';

export interface DeliveryDetailsFormInterface {
    deliveryType: DeliveryType;
    address: {
        street: string;
        city: string;
        zip: string;
    };
    deliveryDay: DeliveryDay;
    timeSlot: string;
}
