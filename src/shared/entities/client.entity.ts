import { Entity, Fields, Relations, remult, ValueConverter } from "remult";
import { User } from "./user.entity";
import { Tenant } from "./tenant.entity";
import { tenantIdConverter } from "../converters";

@Entity('clients', {
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
    // allowApiRead: () => {
    //     console.log('remult.user', remult.user);
    //     return remult.authenticated();},
    allowApiUpdate: () => remult.isAllowed('admin'),
    allowApiInsert: () => remult.isAllowed('admin'),
    // allowApiDelete: () => remult.isAllowed('admin'),
})
export class Client {
    @Fields.autoIncrement()
    id = 0;

    @Fields.number({ allowApiUpdate: true,
        valueConverter: tenantIdConverter,
    })
    tenantId = 0;

    @Fields.string()
    firstName = '';

    @Fields.string()
    lastName = '';

    @Fields.string()
    phone = '';

    @Fields.string()
    address = '';

    @Fields.string()
    email = '';

    @Fields.string({defaultValue: () => 'personal'})
    type = '';

    @Fields.string()
    postCode = '';

    @Fields.string()
    notes = '';

    @Fields.number({ allowNull: true })
    userId?: number;

    @Relations.toOne(() => Tenant, 'tenantId')
    tenant!: Tenant;

    @Relations.toOne(() => User, 'userId')
    user!: User;
}