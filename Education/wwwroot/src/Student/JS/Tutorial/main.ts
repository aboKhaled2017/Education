import { categoryHandler } from './categoryHandler';
import './videoTutorials';
let mainOperations = {
    start() {
        categoryHandler.startHandle();
    }
}.start();