/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

;// CONCATENATED MODULE: external "@nestjs/common"
const common_namespaceObject = require("@nestjs/common");
;// CONCATENATED MODULE: external "@nestjs/core"
const core_namespaceObject = require("@nestjs/core");
;// CONCATENATED MODULE: external "tslib"
const external_tslib_namespaceObject = require("tslib");
;// CONCATENATED MODULE: ./src/app/app.service.ts


let AppService = class AppService {
    getData() {
        return { message: 'Hello API' };
    }
};
AppService = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Injectable)()
], AppService);


;// CONCATENATED MODULE: ./src/app/app.controller.ts
var _a;



let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getData() {
        return this.appService.getData();
    }
};
(0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Get)(),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", []),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", void 0)
], AppController.prototype, "getData", null);
AppController = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Controller)(),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (_a = typeof AppService !== "undefined" && AppService) === "function" ? _a : Object])
], AppController);


;// CONCATENATED MODULE: external "@faker-js/faker"
const faker_namespaceObject = require("@faker-js/faker");
;// CONCATENATED MODULE: ./src/app/records/records.service.ts



let RecordsService = class RecordsService {
    constructor() {
        this.mockDatabase = [];
    }
    getRecordByUID(UID) {
        // Mock database fetch
        return this.mockDatabase.find(record => record.UID === UID);
    }
    getAllRecords() {
        // Mock database fetch
        return this.mockDatabase;
    }
    calculateTotalIncome(UID) {
        const record = this.getRecordByUID(UID);
        if (record) {
            return record.salary.reduce((acc, companySalary) => acc + companySalary.annualSalary, 0);
        }
        return 0;
    }
    generateCompany() {
        return {
            companyName: faker_namespaceObject.faker.company.name(),
            annualSalary: faker_namespaceObject.faker.number.int({ min: 30000, max: 500000 }),
        };
    }
    generatePhone() {
        const rawPhoneNumber = '###-###-####'.replace(/#/g, () => faker_namespaceObject.faker.number.int({ max: 9 }).toString());
        const formattedPhoneNumber = rawPhoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        const areaCode = rawPhoneNumber.slice(0, 3);
        const hasExtension = faker_namespaceObject.faker.datatype.boolean();
        const extension = hasExtension ? faker_namespaceObject.faker.number.int({ min: 1000, max: 9999 }).toString() : null;
        const phone = {
            number: formattedPhoneNumber,
            areaCode,
            hasExtension,
            extension
        };
        return phone;
    }
    generateAddress() {
        const address = {
            street: faker_namespaceObject.faker.location.streetAddress(),
            city: faker_namespaceObject.faker.location.city(),
            state: faker_namespaceObject.faker.location.state(),
            zipcode: faker_namespaceObject.faker.location.zipCode()
        };
        return address;
    }
    generateRecord() {
        const generateRecord = {
            UID: faker_namespaceObject.faker.number.int({ min: 100000000, max: 999999999 }).toString(),
            avatar: faker_namespaceObject.faker.image.avatar(),
            flicker: faker_namespaceObject.faker.image.urlLoremFlickr(),
            firstName: faker_namespaceObject.faker.person.firstName(),
            lastName: faker_namespaceObject.faker.person.lastName(),
            address: this.generateAddress(),
            phone: this.generatePhone(),
            salary: Array.from({ length: faker_namespaceObject.faker.number.int({ min: 1, max: 5 }) }, () => this.generateCompany()),
            totalHouseholdIncome: faker_namespaceObject.faker.number.int({ min: 50000, max: 50000000 }),
        };
        return generateRecord;
    }
    generateMultipleRecords(count) {
        this.mockDatabase = Array.from({ length: count }, () => this.generateRecord());
        console.log(this.mockDatabase.length);
        return this.mockDatabase;
    }
};
RecordsService = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Injectable)()
], RecordsService);


;// CONCATENATED MODULE: ./src/app/records/entities/record.entity.ts
class Record {
}

;// CONCATENATED MODULE: ./src/app/records/records.controller.ts
var records_controller_a, _b;




let RecordsController = class RecordsController {
    constructor(recordService) {
        this.recordService = recordService;
    }
    getAllRecords() {
        return this.recordService.getAllRecords();
    }
    getTotalIncome(UID) {
        return this.recordService.calculateTotalIncome(UID);
    }
    generateMultipleRecords(count) {
        // Convert count to a number and provide a default if necessary
        const recordCount = Number(count) || 10; // Default to 10 if count is not provided
        this.recordGenerationTime = undefined;
        const startTime = performance.now();
        // Generate the records
        const records = this.recordService.generateMultipleRecords(recordCount);
        // End the timer
        const endTime = performance.now();
        // Calculate the elapsed time
        this.recordGenerationTime = endTime - startTime;
        // Log the number of records generated and the elapsed time
        console.log(recordCount + ' records generated in: ' + this.recordGenerationTime + ' ms');
        return records;
    }
    getCreationTime() {
        console.log('record generation time ' + this.recordGenerationTime);
        return this.recordGenerationTime;
    }
    getRecord(UID) {
        return this.recordService.getRecordByUID(UID);
    }
};
(0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Get)(),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", []),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", Array)
], RecordsController.prototype, "getAllRecords", null);
(0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Get)('total-income/:UID'),
    (0,external_tslib_namespaceObject.__param)(0, (0,common_namespaceObject.Param)('UID')),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [String]),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", Number)
], RecordsController.prototype, "getTotalIncome", null);
(0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Get)('generate'),
    (0,external_tslib_namespaceObject.__param)(0, (0,common_namespaceObject.Query)('count')),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [Number]),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", Array)
], RecordsController.prototype, "generateMultipleRecords", null);
(0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Get)('time'),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", []),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", Number)
], RecordsController.prototype, "getCreationTime", null);
(0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Get)(':UID'),
    (0,external_tslib_namespaceObject.__param)(0, (0,common_namespaceObject.Param)('UID')),
    (0,external_tslib_namespaceObject.__metadata)("design:type", Function),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [String]),
    (0,external_tslib_namespaceObject.__metadata)("design:returntype", typeof (_b = typeof Record !== "undefined" && Record) === "function" ? _b : Object)
], RecordsController.prototype, "getRecord", null);
RecordsController = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Controller)('records'),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (records_controller_a = typeof RecordsService !== "undefined" && RecordsService) === "function" ? records_controller_a : Object])
], RecordsController);


;// CONCATENATED MODULE: ./src/app/records/records.module.ts




let RecordsModule = class RecordsModule {
};
RecordsModule = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Module)({
        controllers: [RecordsController],
        providers: [RecordsService],
    })
], RecordsModule);


;// CONCATENATED MODULE: ./src/app/app.module.ts





let AppModule = class AppModule {
};
AppModule = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Module)({
        imports: [RecordsModule],
        controllers: [AppController],
        providers: [AppService],
    })
], AppModule);


;// CONCATENATED MODULE: ./src/main.ts



async function bootstrap() {
    // Set the location of the tnsnames.ora file
    // oracledb.initOracleClient({ libDir: './tnsnames.oca' });
    const app = await core_namespaceObject.NestFactory.create(AppModule);
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    app.enableCors();
    const port = process.env.PORT || 3000;
    // Configure Oracle Database connection
    // oracledb.createPool({
    //   user: 'your_username',
    //   password: 'your_password',
    //   connectString: 'ACME' // Use the alias from tnsnames.ora
    // });
    await app.listen(port);
    common_namespaceObject.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();

/******/ })()
;