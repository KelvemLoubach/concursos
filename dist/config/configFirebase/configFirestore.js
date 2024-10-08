"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authFirebase = exports.firestoredataBase = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const serviceAccount = require('../../../recurso.json');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
    databaseURL: process.env.DATA_BASE_URL
});
const firestoredataBase = firebase_admin_1.default.firestore();
exports.firestoredataBase = firestoredataBase;
const authFirebase = firebase_admin_1.default.auth();
exports.authFirebase = authFirebase;
