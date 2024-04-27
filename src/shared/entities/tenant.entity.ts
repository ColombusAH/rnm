import { Entity, Fields, Relations } from 'remult';

@Entity('tenants', {
    allowApiDelete: false,   
})
export class Tenant {
  @Fields.autoIncrement()
  id = 0;
  @Fields.string({allowNull: false})
  name = '';
  @Fields.string({ allowNull: true })
  email = '';
}