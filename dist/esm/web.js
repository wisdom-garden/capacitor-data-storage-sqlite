var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { WebPlugin } from '@capacitor/core';
import { StorageDatabaseHelper } from './web-utils/StorageDatabaseHelper';
import { Data } from './web-utils/Data';
var CapacitorDataStorageSqliteWeb = /** @class */ (function (_super) {
    __extends(CapacitorDataStorageSqliteWeb, _super);
    function CapacitorDataStorageSqliteWeb() {
        return _super.call(this, {
            name: 'CapacitorDataStorageSqlite',
            platforms: ['web']
        }) || this;
    }
    CapacitorDataStorageSqliteWeb.prototype.echo = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log('ECHO', options);
                return [2 /*return*/, options];
            });
        });
    };
    CapacitorDataStorageSqliteWeb.prototype.openStore = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var ret, dbName, tableName;
            return __generator(this, function (_a) {
                ret = false;
                dbName = options.database ? options.database + "IDB" : "storageIDB";
                tableName = options.table ? options.table : "storage_store";
                this.mDb = new StorageDatabaseHelper(dbName, tableName);
                if (this.mDb)
                    ret = true;
                return [2 /*return*/, Promise.resolve({ result: ret })];
            });
        });
    };
    CapacitorDataStorageSqliteWeb.prototype.setTable = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var tableName, ret, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tableName = options.table;
                        if (tableName == null) {
                            return [2 /*return*/, Promise.reject("Must provide a table name")];
                        }
                        ret = false;
                        message = "";
                        if (!this.mDb) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.mDb.setTable(tableName)];
                    case 1:
                        ret = _a.sent();
                        if (ret) {
                            return [2 /*return*/, Promise.resolve({ result: ret, message: message })];
                        }
                        else {
                            return [2 /*return*/, Promise.resolve({ result: ret, message: "failed in adding table" })];
                        }
                        return [3 /*break*/, 3];
                    case 2: return [2 /*return*/, Promise.resolve({ result: ret, message: "Must open a store first" })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CapacitorDataStorageSqliteWeb.prototype.set = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var ret, key, value, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        key = options.key;
                        if (key == null || typeof key != "string") {
                            return [2 /*return*/, Promise.reject("Must provide key as string")];
                        }
                        value = options.value;
                        if (value == null || typeof value != "string") {
                            return [2 /*return*/, Promise.reject("Must provide value as string")];
                        }
                        data = new Data();
                        data.name = key;
                        data.value = value;
                        return [4 /*yield*/, this.mDb.set(data)];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, Promise.resolve({ result: ret })];
                }
            });
        });
    };
    CapacitorDataStorageSqliteWeb.prototype.get = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var ret, key, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        key = options.key;
                        if (key == null || typeof key != "string") {
                            return [2 /*return*/, Promise.reject("Must provide key as string")];
                        }
                        return [4 /*yield*/, this.mDb.get(key)];
                    case 1:
                        data = _a.sent();
                        ret = data != null ? data.value : null;
                        return [2 /*return*/, Promise.resolve({ value: ret })];
                }
            });
        });
    };
    CapacitorDataStorageSqliteWeb.prototype.remove = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var ret, key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        key = options.key;
                        if (key == null || typeof key != "string") {
                            return [2 /*return*/, Promise.reject("Must provide key as string")];
                        }
                        return [4 /*yield*/, this.mDb.remove(key)];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, Promise.resolve({ result: ret })];
                }
            });
        });
    };
    CapacitorDataStorageSqliteWeb.prototype.clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mDb.clear()];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, Promise.resolve({ result: ret })];
                }
            });
        });
    };
    CapacitorDataStorageSqliteWeb.prototype.iskey = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var ret, key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        key = options.key;
                        if (key == null || typeof key != "string") {
                            return [2 /*return*/, Promise.reject("Must provide key as string")];
                        }
                        return [4 /*yield*/, this.mDb.iskey(key)];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, Promise.resolve({ result: ret })];
                }
            });
        });
    };
    CapacitorDataStorageSqliteWeb.prototype.keys = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mDb.keys()];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, Promise.resolve({ keys: ret })];
                }
            });
        });
    };
    CapacitorDataStorageSqliteWeb.prototype.values = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mDb.values()];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, Promise.resolve({ values: ret })];
                }
            });
        });
    };
    CapacitorDataStorageSqliteWeb.prototype.keysvalues = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ret, results, i, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ret = [];
                        return [4 /*yield*/, this.mDb.keysvalues()];
                    case 1:
                        results = _a.sent();
                        for (i = 0; i < results.length; i++) {
                            res = { "key": results[i].name, "value": results[i].value };
                            ret.push(res);
                        }
                        return [2 /*return*/, Promise.resolve({ keysvalues: ret })];
                }
            });
        });
    };
    CapacitorDataStorageSqliteWeb.prototype.deleteStore = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log('deleteStore', options);
                return [2 /*return*/, Promise.reject("Not implemented")];
            });
        });
    };
    return CapacitorDataStorageSqliteWeb;
}(WebPlugin));
export { CapacitorDataStorageSqliteWeb };
var CapacitorDataStorageSqlite = new CapacitorDataStorageSqliteWeb();
export { CapacitorDataStorageSqlite };
import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(CapacitorDataStorageSqlite);
//# sourceMappingURL=web.js.map