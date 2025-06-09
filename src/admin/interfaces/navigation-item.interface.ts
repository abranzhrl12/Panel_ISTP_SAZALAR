// src/admin/navigation/interfaces/navigation-item.interface.ts
// Asegúrate de que esta interfaz coincida exactamente con la estructura de tu entidad NavigationItem
// tal como la expone GraphQL.

export interface AdminNavigationItem {
  id: string; // @Field(() => ID) en GraphQL
  label: string; // @Field()
  route: string; // @Field() - Ojo: en tu CreateNavigationItemInput lo llamas 'url', pero en la entidad es 'route'
  icon?: string | null; // @Field({ nullable: true })
  order: number; // @Field()
  isActive: boolean; // @Field()
  requiredPermission?: string | null; // @Field({ nullable: true }) - Aquí es un string, no un objeto
  parentId?: string | null; // @Field(() => ID, { nullable: true })
  children?: AdminNavigationItem[] | null; // @Field(() => [NavigationItem], { nullable: true })
}