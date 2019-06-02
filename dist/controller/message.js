"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Messages_1 = require("../entity/Messages");
module.exports = {
    getMessages: (req, res) => __awaiter(this, void 0, void 0, function* () {
        const message = yield typeorm_1.getRepository(Messages_1.Messages)
            .createQueryBuilder("Messages")
            .getMany();
        res.send(message);
    })
};
