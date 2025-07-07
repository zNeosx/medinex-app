"use client";
import * as React from "react";

import Logo from "@/components/common/logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  CalendarCheck,
  LayoutDashboard,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type MenuItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};

const data: {
  navLinks: MenuItem[];
} = {
  navLinks: [
    {
      title: "Tableau de bord",
      url: "/practitioner/tableau-de-bord",
      icon: LayoutDashboard,
    },
    {
      title: "Rendez-vous",
      url: "/practitioner/rendez-vous",
      icon: Calendar,
    },
    {
      title: "Patients",
      url: "/practitioner/patients",
      icon: Users,
    },
    {
      title: "Planifier",
      url: "/practitioner/planifier",
      icon: CalendarCheck,
    },
    {
      title: "Paramètres",
      url: "/practitioner/paramètres",
      icon: Settings,
    },
  ],
};

export function PractitionerSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const pathname = usePathname();
  const query = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const data = await authClient.getSession();

      if (!data) {
        throw new Error("Une erreur est survenue");
      }

      console.log("data session", data);
      return data.data;
    },
  });

  const { setOpenMobile } = useSidebar();
  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b p-6">
        <Logo logoSize={20} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="p-4">
          <SidebarGroupContent>
            <SidebarMenu className="gap-3">
              {data.navLinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="px-3 py-2"
                    isActive={item.url === pathname}
                  >
                    <Link
                      href={item.url}
                      onClick={() => {
                        setOpenMobile(false);
                      }}
                      className="gap-3"
                    >
                      <item.icon size={16} />
                      <span className="text-sm font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-full">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">
                      Dr. {query.data?.user.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      {query.data?.user.speciality?.name}
                    </p>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem
                  onClick={async () => {
                    const { error } = await authClient.signOut();
                    if (error) {
                      toast.error(error.message);
                    }
                    router.push("/auth/connexion");
                  }}
                >
                  <span>Déconnexion</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
