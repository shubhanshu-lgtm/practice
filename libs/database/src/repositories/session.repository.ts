
import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { Session } from "../entities";


@Injectable()
export class SessionRepository {
    constructor(
        @InjectRepository(Session)
        private readonly sessionRepository: Repository<Session>,
    ) {}

    async createOrUpdateSession(
        userId: string,
        email: string,
        token: string,
        user:any,
        expiresAt: Date,
        ): Promise<Session> {
        try {
            // Try to find an existing session by userId (primary key for session management)
            let session = await this.sessionRepository.findOne({
            where: { userId },
            });

            if (session) {
            // Update existing session
            session.token = token;
            session.googleCallbackData = user;
            session.expiresAt = expiresAt;
            } else {
            // Create a new session
            session = this.sessionRepository.create({
                userId,
                userEmail: email,
                token,
                googleCallbackData:user,
                expiresAt,
            });
            
            }

            // Using save will insert or update accordingly
            return await this.sessionRepository.save(session);
        } catch (error) {
            console.error("Error in Session: ", error);
            throw error;
        }
    }

    async findSessionByUserId(userId: string): Promise<Session | null> {
        try {
            const session = await this.sessionRepository.findOne({
                where: { userId },
            });

            return session;
        } catch (error) {
            console.error("Error in findSessionByUserId: ", error);
            throw error;
        }
    }

    async deleteSession(userId: string): Promise<void> {
        try {
            await this.sessionRepository.delete({ userId });
        } catch (error) {
            console.error("Error in deleteSession: ", error);
            throw error;
        }
    }

    async deleteAllSessions(userId: string): Promise<void> {
        try {
            await this.sessionRepository.delete({ userId });
        } catch (error) {
            console.error("Error in deleteAllSessions: ", error);
            throw error;
        }
    }

}