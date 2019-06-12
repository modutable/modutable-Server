import "reflect-metadata";
import { createConnection } from "typeorm";

export const ORMConnect = () => {
  createConnection().then(async () => {
    // connection not used?
    try {
      console.log("TypeORM Start");
    } catch (e) {
      throw new Error(e);
    }
  });
};
