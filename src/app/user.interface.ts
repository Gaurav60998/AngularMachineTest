export interface User {
    [x: string]: any;
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phoneNo: string;
    age:number;
    state:string;
    country:string;
    profileImage:string;
    tags:string
    addressType:string;
    address1:string;
    address2:string;
    companyAddress1:string
    companyAddress2:string
    // Add more properties as needed
  }
