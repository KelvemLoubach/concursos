export interface dataAppmaxx {

    firstname:string,
    lastname:string,
    email:string,
    telephone:string,
    total:number,
    sku:string,
    name:string,
    qty:number
    curtomer_id:number,
    documente_number:string,
    expiration_data:string

}


export interface PaymentData {
    data: {
      pix_qrcode: string;
      pix_creation_date: string;
      pix_expiration_date: string;
      pix_emv: string;
    };
  }

