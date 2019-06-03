"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Hosts_1 = require("./Hosts");
let Reviews = class Reviews extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Reviews.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Reviews.prototype, "contents", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Reviews.prototype, "score", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Reviews.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Reviews.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Hosts_1.Hosts, hosts => hosts.review),
    __metadata("design:type", Hosts_1.Hosts)
], Reviews.prototype, "host", void 0);
Reviews = __decorate([
    typeorm_1.Entity()
], Reviews);
exports.Reviews = Reviews;
