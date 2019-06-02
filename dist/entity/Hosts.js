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
const Users_1 = require("./Users");
const Images_1 = require("./Images");
const Reviews_1 = require("./Reviews");
let Hosts = class Hosts extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Hosts.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Hosts.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Hosts.prototype, "address", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Hosts.prototype, "openDate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Hosts.prototype, "CloseDate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Hosts.prototype, "guestMin", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Hosts.prototype, "guestMax", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Hosts.prototype, "guests", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Hosts.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Hosts.prototype, "description", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Hosts.prototype, "deadline", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Hosts.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Hosts.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Hosts.prototype, "rating", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Hosts.prototype, "mealsType", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Users_1.Users, user => user.hosts),
    __metadata("design:type", Users_1.Users)
], Hosts.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToMany(type => Users_1.Users, user => user.Mhosts),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Hosts.prototype, "Musers", void 0);
__decorate([
    typeorm_1.OneToMany(type => Images_1.Images, images => images.host),
    __metadata("design:type", Array)
], Hosts.prototype, "images", void 0);
__decorate([
    typeorm_1.OneToMany(type => Reviews_1.Reviews, review => review.host),
    __metadata("design:type", Array)
], Hosts.prototype, "review", void 0);
Hosts = __decorate([
    typeorm_1.Entity()
], Hosts);
exports.Hosts = Hosts;
