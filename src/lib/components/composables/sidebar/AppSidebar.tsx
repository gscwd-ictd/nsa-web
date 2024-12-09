import { Home, PlusSquare, LocateIcon } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../../ui/Sidebar';

// menu items
const items = [
  { title: 'Home', url: `${process.env.NEXT_PUBLIC_SERVICE_APPLICATION_FE}/service-application`, icon: Home },
  {
    title: 'New',
    url: `${process.env.NEXT_PUBLIC_SERVICE_APPLICATION_FE}/service-application/new`,
    icon: PlusSquare,
  },
  {
    title: 'Track',
    url: `${process.env.NEXT_PUBLIC_SERVICE_APPLICATION_FE}/service-application/track`,
    icon: LocateIcon,
  },
];

export function AppSideBar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <span className="text-lg text-gray-600">Service Application</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className="text-gray-800" />
                      <span className="text-base font-medium text-gray-500">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
