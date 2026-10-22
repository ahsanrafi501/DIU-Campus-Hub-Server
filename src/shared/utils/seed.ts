import bcrypt from "bcryptjs";
import config from "../../app/config";
import { prisma } from "../../app/lib/prisma";
import { UserRole } from "../../generated/prisma/enums";




export const seedTesterAdmin = async () => {
    try {
        const isAdminExist = await prisma.user.findFirst({
            where: {
                role: UserRole.SUPER_ADMIN
            }
        });

        if (isAdminExist) {
            console.log("Super Admin Already Exists!");
            return;
        }

        const name = config.testerAdmin.name
        const email = config.testerAdmin.email
        const password = config.testerAdmin.password

        if (!name || !email || !password) {
            throw new Error("Admin Name , Email, Password Missing In Env File!!!")
        }

        const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt.saltRounds))

        const Admin = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: UserRole.SUPER_ADMIN,
                isActive: true
            }
        })

        console.log("Super Admin Created : ", Admin);



    } catch (error) {

        console.log("Error Seeding Super Admin : ", error);

        await prisma.user.delete({
            where: {
                email: config.testerAdmin.email
            }
        })


    }
}

//create tester super admin 

export const seedTesterSuperAdmin = async () => {
    try {
        const isTesterAdminExist = await prisma.user.findUnique({
            where: {
                email: config.testerSuperAdmin.email
            }
        });

        if (isTesterAdminExist) {
            console.log("Tester Admin Already Exists!");
            return;
        }

        const name = config.testerSuperAdmin.name
        const email = config.testerSuperAdmin.email
        const password = config.testerSuperAdmin.password

        if (!name || !email || !password) {
            throw new Error("Tester Admin Name , Email, Password Missing In Env File!!!")
        }

        const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt.saltRounds))

        const testerAdmin = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: UserRole.ADMIN,
                isActive: true
            }
        })

        console.log("Tester Admin Created : ", testerAdmin);



    } catch (error) {

        console.log("Error Seeding Tester Admin : ", error);

        await prisma.user.delete({
            where: {
                email: config.testerSuperAdmin.email
            }
        })


    }
}


// create tester organizer

export const seedTesterOrganizer = async () => {
    try {
        const isTesterOrganizerExist = await prisma.user.findUnique({
            where: {
                email: config.testerOrganizer.email
            }
        });

        if (isTesterOrganizerExist) {
            console.log("Tester Organizer Already Exists!");
            return;
        }

        const name = config.testerOrganizer.name
        const email = config.testerOrganizer.email
        const password = config.testerOrganizer.password

        if (!name || !email || !password) {
            throw new Error("Tester Organizer Name , Email, Password Missing In Env File!!!")
        }

        const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt.saltRounds))

        const testerOrganizer = await prisma.user.create({
             data: {
                name,
                email,
                password: hashedPassword,
                role: UserRole.ORGANIZER,
                isActive: true
            }
        })

        console.log("Tester Organizer Created : ", testerOrganizer);



    } catch (error) {

        console.log("Error Seeding Tester Organizer : ", error);

        await prisma.user.delete({
            where: {
                email: config.testerOrganizer.email
            }
        })


    }
}