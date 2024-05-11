import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import prisma from "./prismaclient";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export default adapter;