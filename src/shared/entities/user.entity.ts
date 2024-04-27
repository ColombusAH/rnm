import { Entity, Fields, Relations } from "remult";
import { Tenant } from "./tenant.entity";

@Entity('users', {

})
export class User {
  @Fields.autoIncrement()
  id = 0;

  @Fields.number({required: true})
  tenantId = 0;

  @Fields.string()
  username = '';

  @Fields.string()
    email = '';

  @Fields.string({includeInApi: false})
  password = '';

 @Fields.json({ 
    defaultValue: () => [],
    validate: RolesArrayValidation,
  })
  roles: string[] = [];

  @Relations.toOne<User,Tenant>(() => Tenant, {field: 'tenantId', defaultIncluded: true})
  tenant?: Tenant;
}

// Helper function to validate roles
function RolesArrayValidation(roles: string[]) {
    const UserRole = ['admin', 'user', 'guest'];
    roles = roles ?? [];
    if (!Array.isArray(roles) || !roles.every(role => Object.values(UserRole).includes(role))) {
      throw new Error("Roles array contains invalid role.");
    }
  }
