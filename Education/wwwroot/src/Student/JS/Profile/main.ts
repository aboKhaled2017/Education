import {
    EditAccountHandlingObject,
    EditPasswordHandlingObject,
    EditMembershipHandlingObject
} from './editAccount';
import { pageIdentifier } from '../../../global/PageIdentifier';
$(function () {
    if (pageIdentifier.pagetype != "profile") return;
    EditAccountHandlingObject.start();
    EditPasswordHandlingObject.start();
    EditMembershipHandlingObject.start();
});


