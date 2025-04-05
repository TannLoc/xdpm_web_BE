export enum OrderState {
    WAITING_CONFIRM = 'WAITING_CONFIRM',
    CONFIRMED = 'CONFIRMED',
    DELIVERING = 'DELIVERING',
    CANCELED = 'CANCELED',
    RECEIVED = 'RECEIVED',
    RETURNED = 'RETURNED'
}
 
export enum OrderPaymentType{
CASH="CASH",
VNPAY="VNPAY",
}

export enum PaymentState{
    PROCESSING="PROCESSING",
    CANCEL = "CANCEL",
    SUCCESS ="SUCCESS",
    FAIL ="FAIL"
}