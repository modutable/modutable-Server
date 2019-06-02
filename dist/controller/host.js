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
const Hosts_1 = require("../entity/Hosts");
module.exports = {
    getHosts: (req, res) => __awaiter(this, void 0, void 0, function* () {
        console.log("host----->", req.user);
        const { address, date, guests } = req.body;
        const hosts = yield typeorm_1.getRepository(Hosts_1.Hosts)
            .createQueryBuilder("Hosts")
            .leftJoinAndSelect("Hosts.user", "users")
            .leftJoinAndSelect("Hosts.review", "reviews")
            .where("Hosts.address like :searchCity", { searchCity: `%${address}%` })
            .andWhere("Hosts.openDate <= :searchDate", { searchDate: date })
            .andWhere("Hosts.closeDate >= :searchDate", { searchdate: date })
            .andWhere("Hosts.guestMin <= :searchGuests", { searchGuests: guests })
            .andWhere("Hosts.guestMax >= :searchGuests", { searchGuests: guests })
            .getMany();
        let resultHosts = hosts.map(host => {
            return {
                id: host.id,
                userName: host.user.firstName,
                profile: host.user.profile,
                address: host.address,
                title: host.title,
                mealsType: host.mealsType,
                reviewRating: host.rating,
                reviewCount: host.review.length
            };
        });
        res.json(resultHosts);
    }),
    getOneHost: (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { id } = req.body;
        const result = yield typeorm_1.getRepository(Hosts_1.Hosts)
            .createQueryBuilder("Hosts")
            .leftJoinAndSelect("Hosts.user", "users")
            .leftJoinAndSelect("Hosts.review", "reviews")
            .leftJoinAndSelect("Hosts.images", "images")
            .where("Hosts.id = :id", { id: id })
            .getOne();
        res.json(result);
    })
};
