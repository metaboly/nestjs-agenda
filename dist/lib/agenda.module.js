"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var AgendaModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgendaModule = exports.AgendaService = void 0;
const common_1 = require("@nestjs/common");
const agenda_constants_1 = require("./agenda.constants");
const agenda_1 = require("agenda");
function createAgendaProvider(options) {
    return [{ provide: agenda_constants_1.AGENDA_MODULE_OPTIONS, useValue: options || {} }];
}
class AgendaService extends agenda_1.Agenda {
}
exports.AgendaService = AgendaService;
let AgendaModule = AgendaModule_1 = class AgendaModule {
    static register(options) {
        return {
            module: AgendaModule_1,
            providers: createAgendaProvider(options),
        };
    }
    static registerAsync(options) {
        return {
            module: AgendaModule_1,
            imports: options.imports || [],
            providers: this.createAsyncProviders(options),
        };
    }
    static createAsyncProviders(options) {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: options.useClass,
                useClass: options.useClass,
            },
        ];
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: agenda_constants_1.AGENDA_MODULE_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        return {
            provide: agenda_constants_1.AGENDA_MODULE_OPTIONS,
            useFactory: (optionsFactory) => __awaiter(this, void 0, void 0, function* () { return yield optionsFactory.createAgendaOptions(); }),
            inject: [options.useExisting || options.useClass],
        };
    }
};
AgendaModule = AgendaModule_1 = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: AgendaService,
                useFactory: (options) => __awaiter(void 0, void 0, void 0, function* () {
                    const agenda = new agenda_1.Agenda(options);
                    yield agenda.start();
                    return agenda;
                }),
                inject: [agenda_constants_1.AGENDA_MODULE_OPTIONS],
            },
        ],
        exports: [AgendaService],
    })
], AgendaModule);
exports.AgendaModule = AgendaModule;
//# sourceMappingURL=agenda.module.js.map