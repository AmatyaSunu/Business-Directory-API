import Businesses from '../models/businesses';
let flag;
export const emailFormatting = async (email) => {
    console.log("Helper email formatting...."+ email);

    if(/[a-z]/.test(email)){
        return email;
    } else {
        return email.toLowerCase();
    }
};
//
// export const businessAlreadyExist = async (name) => {
//     const result = await Businesses.findOne({businessName: name)};
//     return result;
// };