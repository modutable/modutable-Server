import "reflect-metadata";
import { createConnection, Connection } from "typeorm";

export const ORMConnect = () => {
  createConnection().then(async connection => {
    try {
      console.log("TypeORM Start");
    } catch (e) {
      throw new Error(e);
    }
  });
};
