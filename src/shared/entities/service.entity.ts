import { Entity, Fields, Relations, remult } from "remult";
import { tenantIdConverter } from "../converters";
import { Tenant } from "./tenant.entity";

@Entity('services', {
    apiPrefilter: () => {
        console.log('remult.user', remult.user);
        if (remult.isAllowed('admin')) {
            console.log('remult.user is admin');
            return {
                tenantId: (remult.user as any)!.tenantId
            };
        }
        console.log('remult.user is not admin');
        return {
            tenantId: -1,
            id: -1
        };
    },
    allowApiRead: () => remult.isAllowed('admin'),
    allowApiUpdate: () => remult.isAllowed('admin'),
    allowApiInsert: () => remult.isAllowed('admin'),
})
export class Service {
    @Fields.autoIncrement()
    id = 0;

    @Fields.number({ valueConverter: tenantIdConverter })
    tenantId = 0;

    @Relations.toOne(() => Tenant, 'tenantId')
    tenant!: Tenant;

    @Fields.string()
    name = '';

    @Fields.string()
    description = '';

    @Fields.number()
    price = 0;

    @Fields.number()
    duration = 0;
}