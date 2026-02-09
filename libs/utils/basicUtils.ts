import parsePhoneNumber from 'libphonenumber-js/mobile'

export function getRandomString(length: number, withSpecialChar: boolean, isUpperCaseOnly: boolean): string 
{
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charset = "@#$&*0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$&*0123456789abcdefghijklmnopqrstuvwxyz";

    let charactersLength = withSpecialChar ? charset.length : characters.length;

    for (let i = 0; i < length; i++) {
        if (withSpecialChar) {
            result += charset.charAt(Math.floor(Math.random() * charactersLength));
        }
        else {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    }
    if (isUpperCaseOnly) {
        return result.toUpperCase();
    }
    return result;
}

export function getRandomNumber(length: number) {
    let result = '';
    let numbers = '0123456789';
    let numbersLength = numbers.length;
    for (let i = 0; i < length; i++) {
        result += numbers.charAt(Math.floor(Math.random() * numbersLength));
    }

    return result;
}

export function isNumber(str: string) {
    return /^\d+$/.test(str);
  }

export const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.toLowerCase());
};

export function isValidEmail(email:string) {
    return /\S+@\S+\.\S+/.test(email);
  }

// Utility function to provide replaceAll functionality for older TypeScript targets
function replaceAllPolyfill(str: string, search: string | RegExp, replacement: string): string {
    if (typeof search === 'string') {
        return str.split(search).join(replacement);
    }
    return str.replace(search, replacement);
}

export function removeSpecialCharacter(str: string) {
    const rgx = /[^a-zA-Z\d-._]+|\.(?![a-zA-Z\d]+\b)/g;
    return replaceAllPolyfill(str, rgx, '');
}

export function paginate(page: number, pageSize: number ) 
{
    const currentPage = (page && page > 0) ? page : 1;
    pageSize = (pageSize && pageSize > 0) ? pageSize : 20;
    const offset = (pageSize * currentPage) - pageSize;
    const limit = pageSize;
  
    return {
      offset,
      limit,
      currentPage
    };
  };


export function validPhoneNo(phoneNo: string) {
    if (!phoneNo) {
        return false;
    }
    let parseNo = parsePhoneNumber(phoneNo);

    return (parseNo?.isPossible())

}


export function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getOTP()
{
    return `${Math.floor(100000 + Math.random() * 900000)}`; 
}

export function isValidVIN(vin:string)
{
   return /^[A-HJ-NPR-Z\d]{17}$/i.test(vin)
}