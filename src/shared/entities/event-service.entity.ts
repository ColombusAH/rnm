import { Entity, Fields, Relations } from "remult";
import { Event } from "./event.entity";
import { Tenant } from "./tenant.entity";
import { tenantIdConverter } from "../converters/tenant-id.converter";
import { Service } from "./service.entity";
import { EventServiceStatus } from "../enums/event-service.enums";

@Entity('event-service')
export class EventService {
    @Fields.autoIncrement()
    id = 0;

    @Fields.number({ valueConverter: tenantIdConverter })
    tenantId = 0;

    @Relations.toOne(() => Tenant, 'tenantId')
    tenant!: Tenant;

    @Fields.number()
    eventId = 0;

    @Relations.toOne(() => Event, 'eventId')
    event!: Event;

    @Fields.number()
    serviceId = 0;

    @Relations.toOne(() => Service, 'serviceId')
    service!: Service;

    @Fields.enum(() => EventServiceStatus)
    status = EventServiceStatus.Pending;

    @Fields.string()
    notes = '';
}