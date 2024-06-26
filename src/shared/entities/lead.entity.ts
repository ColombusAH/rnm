import { Entity, Fields, Relations, remult } from "remult";
import { Tenant } from "./tenant.entity";
import { tenantIdConverter } from "../converters";
import { Client } from "./client.entity";
import { LeadSource, LeadStatus } from "../enums/lead-source.enums";

@Entity('leads', {
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
export class Lead {
    @Fields.autoIncrement()
    id = 0;

    @Fields.number({ valueConverter: tenantIdConverter })
    tenantId = 0;

    @Relations.toOne(() => Tenant, 'tenantId')
    tenant!: Tenant;

    @Fields.number()
    clientId = 0;

    @Relations.toOne(() => Client, 'clientId')
    client!: Client;

    @Fields.string()
    name = '';

    @Fields.string()
    jobType = '';

    @Fields.enum(() => LeadSource, {required: true})
    source = '';

    @Fields.string()
    location = '';

    @Fields.enum(() => LeadStatus)
    status = LeadStatus.New;

    // @Fields.number()
    // workflowId = 0;

    @Fields.date()
    fromDate?: Date;

    @Fields.date()
    toDate?: Date;

    @Fields.boolean()
    isAllDay = false;

    @Fields.string()
    notes: string = '';
}