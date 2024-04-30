import { Entity, Fields, Relations, remult } from "remult";
import { tenantIdConverter } from "../converters/tenant-id.converter";
import { Tenant } from "./tenant.entity";;
import { Lead } from "./lead.entity";
import { Client } from "./client.entity";
import { EventStatus } from "../enums/events.enums";
import { EventService } from "./event-service.entity";

@Entity('events', {
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
    allowApiRead: () => remult.isAllowed(['admin', 'user']),
    allowApiUpdate: () => remult.isAllowed('admin'),
    allowApiInsert: () => remult.isAllowed('admin'),
})
export class Event {
    @Fields.autoIncrement()
    id = 0;

    @Fields.string()
    name = '';

    @Fields.string()
    description = '';

    @Fields.number({ valueConverter: tenantIdConverter })
    tenantId = 0;

    @Relations.toOne(() => Tenant, 'tenantId')
    tenant!: Tenant;

    @Fields.number({required: true})
    clientId = 0;

    @Relations.toOne(() => Client, 'clientId')
    client!: Client;

    @Fields.number({})
    leadId = 0;

    @Relations.toOne(() => Lead, 'leadId')
    lead!: Lead;

    @Relations.toMany(() => EventService)
    services!: EventService[];

    @Fields.enum(() => EventStatus)
    status = EventStatus.Pending;

    @Fields.string()
    type = '';

    @Fields.date()
    fromDate = new Date();

    @Fields.date()
    toDate = new Date();

    @Fields.string()
    notes = '';

    @Fields.string()
    location = '';

}