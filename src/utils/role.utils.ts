import { navLinks, NavLinkType } from "@/schemas/nav-links.d";
import { Session } from "next-auth";

export function checkUserRoleInNavLink(
    url: string,
    user: Session["user"]
): boolean | null
{
    const checkPermission = (link: NavLinkType): boolean =>
    {
        // ตรวจสอบสิทธิ์
        if (link.permission && !link.permission.includes(user.role))
        {
            return false;
        }
        return true;
    };

    // ฟังก์ชันค้นหาในลิงก์หลักและ subLinks
    const findLink = (links: NavLinkType[]): boolean | null =>
    {
        for (const link of links)
        {
            // ตรวจสอบ URL ในลิงก์หลัก
            if (link.href === url)
            {
                // เช็ค permission ก่อนคืนค่า
                return checkPermission(link) ? true : false;
            }

            // ตรวจสอบ URL ใน subLinks (ถ้ามี)
            if (link.subLinks)
            {
                const foundInSubLinks = findLink(link.subLinks);
                if (foundInSubLinks !== null) // พบใน subLinks
                {
                    return foundInSubLinks;
                }
            }
        }
        // หากไม่พบลิงก์
        return null;
    };

    return findLink(navLinks);
}
